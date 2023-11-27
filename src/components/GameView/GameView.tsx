import * as React from "react";
import { Board } from "../Board";
import { Container } from "../Container";
import { GameKeyboard, useGameKeyboard } from "../keyboard";
import {
  Box,
  UseToastOptions,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  convertGameResultToString,
  evaluateGuess,
  validateChar,
} from "../../util";
import { GameOverModal } from "../GameOverModal";
import { GameOverActionBar } from "../GameOverActionBar";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { BOARD_UID_PATH } from "../../layout/MainLayout";
import { WordInfo } from "../../types";
import { validateWordInDictionary } from "../../api";
import {
  KEYBOARD_HEIGHT_CHAKRA,
  SIDEBAR_WIDTH_CHAKRA,
} from "../../config/style.const";
import { useGameStatus } from "../../hooks/useGameStatus";
import { useDeviceKeyboard } from "src/hooks/useDeviceKeyboard";
import { selectCurrentGuess } from "src/selectors";
import { useBoardManager } from "src/hooks/useBoardManager";

/** Time before clipboard "hasCopied" state resets */
const CLIPBOARD_TIMEOUT_MS = 5000;

const DEFAULT_TOAST_SETTINGS: Partial<UseToastOptions> = {
  duration: 3000,
  isClosable: true,
  position: "top",
};

export interface GameViewProps {
  guessLimit: number;
  targetWordInfo: WordInfo;
  boardUid: string;
}

export const GameView: React.FC<GameViewProps> = ({
  guessLimit,
  targetWordInfo,
  boardUid,
}) => {
  const toast = useToast(DEFAULT_TOAST_SETTINGS);
  const router = useRouter();
  const {
    isOpen: isGameOverModalOpen,
    onClose: closeGameOverModal,
    onOpen: openGameOverModal,
  } = useDisclosure();

  const [currentGuessCount, setCurrentGuessCount] = React.useState<number>(0);

  const { gameStatus, resetGameStatus, updateGameStatusForGuessResults } =
    useGameStatus();
  const { keyStatusMap, updateKeyboardGuesses, resetKeyboardGuesses } =
    useGameKeyboard();
  const {
    board,
    addCharToBoard,
    removeLastCharFromBoard,
    updateBoardForGuessResults,
    resetBoard,
  } = useBoardManager({
    guessLimit,
    currentGuessCount,
    targetWordInfo,
  });

  const {
    onCopy,
    hasCopied,
    setValue: setClipboardValue,
  } = useClipboard(undefined, {
    timeout: CLIPBOARD_TIMEOUT_MS,
  });

  const resetGame = useCallback(() => {
    setCurrentGuessCount(0);
    resetGameStatus();
    resetBoard();
    resetKeyboardGuesses();
  }, [guessLimit, targetWordInfo]);

  React.useEffect(() => {
    resetGame();
  }, [guessLimit, targetWordInfo]);

  const handleAddChar = (char: string) => {
    if (gameStatus !== "ACTIVE") {
      return;
    }

    // ensure only legal characters are added
    if (!validateChar(char)) {
      return;
    }

    if (
      selectCurrentGuess({ board, currentGuessCount }).length ===
      targetWordInfo.word.length
    ) {
      toast({
        title: "Invalid Guess Length",
        description: `You cannot guess more than ${targetWordInfo.word.length} characters.`,
        status: "warning",
      });
      return;
    }

    addCharToBoard(char);
  };

  const handleRemoveLastChar = () => {
    if (gameStatus !== "ACTIVE") {
      return;
    }

    removeLastCharFromBoard();
  };

  const handleSubmit = () => {
    if (gameStatus !== "ACTIVE") {
      return;
    }

    const guess = selectCurrentGuess({ board, currentGuessCount });

    if (guess.length !== targetWordInfo.word.length) {
      toast({
        title: "Invalid Word Length",
        description: `You may only guess ${targetWordInfo.word.length}-letter words.`,
        status: "warning",
      });
      return;
    }

    if (!validateWordInDictionary(guess)) {
      toast({
        title: "Invalid Word",
        description: `Your guess must be defined in the dictionary.`,
        status: "warning",
      });
      return;
    }

    const updatedGuessCount = currentGuessCount + 1;
    setCurrentGuessCount(updatedGuessCount);

    const guessResults = evaluateGuess(guess, targetWordInfo.word);

    updateBoardForGuessResults(guessResults);
    updateKeyboardGuesses(guessResults);
    updateGameStatusForGuessResults(
      guessResults,
      updatedGuessCount >= guessLimit
    );
  };

  React.useEffect(() => {
    if (gameStatus !== "ACTIVE") {
      setClipboardValue(
        convertGameResultToString(
          board,
          boardUid,
          process.env.NEXT_PUBLIC_APP_URL
        )
      );
      openGameOverModal();
    }
  }, [gameStatus]);

  const handleShareClick = useCallback(() => {
    onCopy();
    toast({
      title: "Copied to Clipboard!",
      description: `Copied your results and a shareable puzzle link to your clipboard.`,
      status: "success",
    });
  }, [onCopy]);

  const handleResetClick = useCallback(() => {
    resetGame();
    closeGameOverModal();
    // Force server-side prop refresh
    if (router.asPath.includes(BOARD_UID_PATH)) {
      const queryParams = new URLSearchParams({
        guesses: String(guessLimit),
        length: String(targetWordInfo.word.length),
      });
      router.push(`/?${queryParams.toString()}`);
    } else {
      router.replace(router.asPath);
    }
  }, [
    resetGame,
    closeGameOverModal,
    router.asPath,
    guessLimit,
    targetWordInfo,
  ]);

  return (
    <>
      <Container overflowX="auto" background="none" pt={4} px={4}>
        {/* allow scrolling to bottom */}
        <Box pb={KEYBOARD_HEIGHT_CHAKRA} ml="auto" mr="auto">
          <Board boardData={board} />
          {gameStatus !== "ACTIVE" && (
            <Box mt={4}>
              <GameOverActionBar
                handlePrimaryClick={handleShareClick}
                handleSecondaryClick={handleResetClick}
                hasCopied={hasCopied}
              />
            </Box>
          )}
        </Box>
      </Container>
      <Container
        flexDirection="row"
        justifyContent="center"
        position="fixed"
        bottom="0"
        width="100%"
        py={3}
        // needs offset for open sidebar menu
        pr={{ base: 0, md: SIDEBAR_WIDTH_CHAKRA }}
      >
        <GameKeyboard
          keyStatusMap={keyStatusMap}
          canBackspace={
            gameStatus === "ACTIVE" &&
            selectCurrentGuess({ board, currentGuessCount }).length > 0
          }
          canSubmit={
            gameStatus === "ACTIVE" &&
            selectCurrentGuess({ board, currentGuessCount }).length ===
              targetWordInfo.word.length
          }
          areAllDisabled={gameStatus !== "ACTIVE"}
          handleAddChar={handleAddChar}
          handleBackspace={handleRemoveLastChar}
          handleSubmit={handleSubmit}
        />
      </Container>
      <GameOverModal
        isOpen={isGameOverModalOpen}
        onClose={closeGameOverModal}
        targetWordInfo={targetWordInfo}
        hasWon={gameStatus === "WON"}
        hasCopied={hasCopied}
        handlePrimaryClick={handleShareClick}
        handleSecondaryClick={handleResetClick}
      />
    </>
  );
};
