import * as React from "react";
import { Board, BoardResults } from "../components/Board";
import { evaluateGuess } from "../util/evaluateGuess";
import { Container } from "./Container";
import { WordleKeyboard } from "./keyboard/WordleKeyboard";
import { validateChar } from "../util/validateChar";
import produce from "immer";
import { Box, useClipboard, useDisclosure } from "@chakra-ui/react";
import { convertGameResultToString } from "../util";
import { GameOverModal } from "./GameOverModal";
import { GameOverActionBar } from "./GameOverActionBar";
import { useCallback } from "react";
import { APP_BASE_URL } from "src/config";
import { useRouter } from "next/router";
import { BOARD_UID_PATH } from "src/layout/MainLayout";

export type CharGuessStatus = "correct" | "wrong_position" | "not_in_word";
export type GameState = "active" | "fail" | "win";
export interface KeyStatusMap {
  [keyChar: string]: CharGuessStatus;
}

export interface WordleGameProps {
  guessLimit: number;
  targetWord: string;
  boardUid: string;
}

const getEmptyBoard = (guessLimit: number, wordLength: number) => {
  const board = Array(guessLimit).fill(Array(wordLength).fill({}));
  // console.log("Board", board);

  return board;
};

export const WordleGame: React.FC<WordleGameProps> = ({
  guessLimit,
  targetWord,
  boardUid,
}) => {
  // const [targetWord, setTargetWord] = React.useState<string>("");
  const [currentGuessCount, setCurrentGuessCount] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<GameState>("active");
  const [board, setBoard] = React.useState<BoardResults>(
    getEmptyBoard(guessLimit, targetWord.length)
  );
  const [keyStatusMap, setKeyStatusMap] = React.useState<KeyStatusMap>({});

  const router = useRouter();

  const {
    isOpen: isGameOverModalOpen,
    onClose: closeGameOverModal,
    onOpen: openGameOverModal,
  } = useDisclosure();

  const boardString = React.useMemo(
    () =>
      convertGameResultToString(
        board,
        boardUid,
        APP_BASE_URL // TODO, determine how to handle the URL
      ),
    [board, boardUid]
  );

  const { onCopy } = useClipboard(boardString);

  const resetGame = useCallback(() => {
    // console.log("resetGame");

    setCurrentGuessCount(0);
    setGameState("active");
    setBoard(getEmptyBoard(guessLimit, targetWord.length));
    setKeyStatusMap({});
  }, [guessLimit, targetWord]);

  React.useEffect(() => {
    resetGame();
  }, [guessLimit, targetWord]);

  const getCurrentGuess = () => {
    if (currentGuessCount >= guessLimit) {
      return "";
    }
    const guessRow = board[currentGuessCount];
    return guessRow
      .map(({ char }) => char)
      .join("")
      .trim();
  };

  // React.useEffect(() => {
  //   console.log("Board changed", board);
  // }, [board]);

  const handleAddChar = (char: string) => {
    // console.log("handleAddChar", char, board);
    if (currentGuessCount >= guessLimit) {
      console.warn("You've already exceeded the allowed number of guesses");
      return;
    }

    if (!validateChar(char)) {
      console.warn("Illegal character typed!");
      return;
    }

    const rowBeingUpdated = board[currentGuessCount];
    const emptyIndex = rowBeingUpdated.findIndex(({ char }) => !char);

    if (emptyIndex === -1 || emptyIndex >= targetWord.length) {
      alert(`You cannot guess more than ${targetWord.length} characters.`);
      return;
    }

    // console.log({ rowBeingUpdated, emptyIndex });

    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessCount][emptyIndex].char = char;
    });

    setBoard(updatedBoard);
  };

  const handleRemoveLastChar = () => {
    const rowBeingUpdated = [...board[currentGuessCount]];
    const lastCharIndex =
      rowBeingUpdated.length -
      1 -
      rowBeingUpdated.reverse().findIndex(({ char }) => !!char);

    if (lastCharIndex >= targetWord.length) {
      return;
    }

    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessCount][lastCharIndex] = {};
    });

    setBoard(updatedBoard);
  };

  const submitGuess = (guess: string) => {
    const guessResults = evaluateGuess(guess, targetWord);

    setCurrentGuessCount((curGuessCount) => curGuessCount + 1);

    // console.logs("Evaluated result", { guess, targetWord, guessResults });

    // Update the board state
    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessCount] = guessResults;
    });
    setBoard(updatedBoard);

    // Update keyboard status map
    const updatedKeyStatusMap = produce(keyStatusMap, (draft) => {
      for (const { char, status } of guessResults) {
        const previousKeyStatus = draft[char];

        draft[char] =
          previousKeyStatus === "correct" || status === "correct"
            ? "correct"
            : previousKeyStatus === "wrong_position" ||
              status === "wrong_position"
            ? "wrong_position"
            : status;
      }
    });
    setKeyStatusMap(updatedKeyStatusMap);

    if (guessResults.every(({ status }) => status === "correct")) {
      setGameState("win");
    }
  };

  const handleSubmit = () => {
    const guess = getCurrentGuess();

    // console.log("handleSubmit", { guess });
    if (guess.length !== targetWord.length) {
      alert(`You may only guess words of length ${targetWord.length}`);
      return;
    }

    submitGuess(guess);
  };

  React.useEffect(() => {
    if (currentGuessCount >= guessLimit && gameState !== "win") {
      setGameState("fail");
    }
  }, [currentGuessCount]);

  React.useEffect(() => {
    if (gameState !== "active") {
      openGameOverModal();
    }
  }, [gameState]);

  // useDeviceKeyboard({
  //   handleAddChar,
  //   handleBackspace: handleRemoveLastChar,
  //   handleSubmit,
  //   canBackspace: getCurrentGuess().length > 0 || gameState !== "active",
  //   canSubmit:
  //     getCurrentGuess().length === targetWord.length || gameState !== "active",
  // });

  const handleShareClick = useCallback(() => {
    onCopy();
  }, [onCopy]);

  const handleResetClick = useCallback(() => {
    resetGame();
    closeGameOverModal();
    // Force server-side prop refresh

    if (router.asPath.includes(BOARD_UID_PATH)) {
      const queryParams = new URLSearchParams({
        guesses: String(guessLimit),
        length: String(targetWord.length),
      });
      router.push(`/?${queryParams.toString()}`);
    } else {
      router.replace(router.asPath);
    }
  }, [resetGame, closeGameOverModal, router.asPath, guessLimit, targetWord]);

  return (
    <>
      <Container overflow="scroll" background="none" pt={4} px={4}>
        {/* allow scrolling to bottom */}
        <Box pb={`160px`}>
          <Board boardData={board} />
          {gameState !== "active" && (
            <Box mt={4}>
              <GameOverActionBar
                handlePrimaryClick={handleShareClick}
                handleSecondaryClick={handleResetClick}
              />
            </Box>
          )}
        </Box>
        <WordleKeyboard
          keyStatusMap={keyStatusMap}
          canBackspace={getCurrentGuess().length > 0 || gameState !== "active"}
          canSubmit={
            getCurrentGuess().length === targetWord.length ||
            gameState !== "active"
          }
          handleAddChar={handleAddChar}
          handleBackspace={handleRemoveLastChar}
          handleSubmit={handleSubmit}
        />
      </Container>
      <GameOverModal
        isOpen={isGameOverModalOpen}
        onClose={closeGameOverModal}
        targetWord={targetWord}
        isWin={gameState === "win"}
        handlePrimaryClick={handleShareClick}
        handleSecondaryClick={handleResetClick}
      />
    </>
  );
};
