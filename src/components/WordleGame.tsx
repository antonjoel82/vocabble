import * as React from "react";
import { getRandomWordOfLength } from "../api";
import { Board, BoardResults } from "../components/Board";
import { evaluateGuessV2 } from "../util/evaluateGuess";
import { Container } from "./Container";
import { WordleKeyboard } from "./keyboard/WordleKeyboard";
import { validateChar } from "../util/validateChar";
import produce from "immer";
import { Flex, Button, Heading, Box } from "@chakra-ui/react";

export type CharGuessStatus = "correct" | "wrong_position" | "not_in_word";

export interface CharGuessResult {
  status: CharGuessStatus;
  char: string;
}

export interface KeyStatusMap {
  [keyChar: string]: CharGuessStatus;
}

export interface WordleGameProps {
  guessLimit: number;
  wordLength: number;
}

const getEmptyBoard = (guessLimit: number, wordLength: number) => {
  const board = Array(guessLimit).fill(Array(wordLength).fill({}));
  // console.log("Board", board);

  return board;
};

export const WordleGame: React.FC<WordleGameProps> = ({
  guessLimit,
  wordLength,
}) => {
  const [targetWord, setTargetWord] = React.useState<string>("");
  const [currentGuessCount, setCurrentGuessCount] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<"active" | "fail" | "win">(
    "active"
  );
  const [board, setBoard] = React.useState<BoardResults>(
    getEmptyBoard(guessLimit, wordLength)
  );

  const [keyStatusMap, setKeyStatusMap] = React.useState<KeyStatusMap>({});

  const handleMount = () => {
    const target = getRandomWordOfLength(wordLength);
    setTargetWord(target.toLocaleLowerCase());
  };

  React.useEffect(() => {
    handleMount();
  }, []);

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

  const handleAddChar = (char: string) => {
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

    if (emptyIndex === -1 || emptyIndex >= wordLength) {
      alert(`You cannot guess more than ${wordLength} characters.`);
      return;
    }

    console.log({ rowBeingUpdated, emptyIndex });

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

    if (lastCharIndex >= wordLength) {
      return;
    }

    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessCount][lastCharIndex] = {};
    });

    setBoard(updatedBoard);
  };

  const resetGame = () => {
    handleMount();
    setCurrentGuessCount(0);
    setGameState("active");
    setBoard(getEmptyBoard(guessLimit, wordLength));
    setKeyStatusMap({});
  };

  const submitGuess = (guess: string) => {
    const guessResults = evaluateGuessV2(guess, targetWord);

    setCurrentGuessCount((curGuessCount) => curGuessCount + 1);

    console.log("Evaluated result", { guess, targetWord, guessResults });

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
    if (guess.length !== wordLength) {
      alert(`You may only guess words of length ${wordLength}`);
      return;
    }

    submitGuess(guess);
  };

  React.useEffect(() => {
    if (currentGuessCount >= guessLimit && gameState !== "win") {
      setGameState("fail");
    }
  }, [currentGuessCount]);

  return (
    <Container overflow="scroll" background="none">
      {/* allow scrolling to bottom */}
      <Box mb={"160px"}>
        <Board boardData={board} />
        {gameState !== "active" && (
          <Flex
            direction="column"
            justifyContent="center"
            textAlign="center"
            my={3}
            px={20}
            rowGap={3}
          >
            <Heading size="md">
              {gameState === "win"
                ? "You win!"
                : `For real bro? The word was ${targetWord.toLocaleUpperCase()}`}
            </Heading>
            <Button
              background="green.200"
              onClick={resetGame}
              py={5}
              fontWeight="bold"
              color="green"
              border="2px solid green"
            >
              Play again!
            </Button>
          </Flex>
        )}
      </Box>
      <WordleKeyboard
        keyStatusMap={keyStatusMap}
        canBackspace={getCurrentGuess().length > 0 || gameState !== "active"}
        canSubmit={
          getCurrentGuess().length === wordLength || gameState !== "active"
        }
        handleAddChar={handleAddChar}
        handleBackspace={handleRemoveLastChar}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};
