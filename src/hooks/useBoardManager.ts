import { produce } from "immer";
import { useEffect, useState } from "react";
import { BoardResults } from "src/components/Board";
import { WordInfo, WordleGuessResult } from "src/types";
import {
  deserializeBoard,
  getCurrentGuessIndexFromBoard,
  getEmptyBoard,
  serializeBoard,
} from "src/util";

interface UseBoardManagerProps {
  guessLimit: number;
  targetWordInfo: WordInfo;
  boardUid: string;
  updateGameStatusForGuessResults: (
    guessResults: WordleGuessResult[],
    hasExceededGuessLimit: boolean
  ) => void;
}

export const useBoardManager = ({
  guessLimit,
  targetWordInfo,
  boardUid,
  updateGameStatusForGuessResults,
}: UseBoardManagerProps) => {
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [board, setBoard] = useState<BoardResults>(
    getEmptyBoard(guessLimit, targetWordInfo.word.length)
  );

  // Load a saved board state from local storage if one exists
  useEffect(() => {
    const serializedBoard = localStorage.getItem(boardUid);

    if (!serializedBoard) {
      return;
    }

    const savedBoardState = deserializeBoard({
      serializedBoard,
      guessLimit,
      targetWord: targetWordInfo.word,
    });
    const derivedGuessIndex = getCurrentGuessIndexFromBoard(savedBoardState);

    setBoard(savedBoardState);
    setCurrentGuessIndex(derivedGuessIndex);
    updateGameStatusForGuessResults(
      savedBoardState[derivedGuessIndex - 1] as WordleGuessResult[],
      derivedGuessIndex >= guessLimit
    );
  }, [boardUid, guessLimit, targetWordInfo.word]);

  const addCharToBoard = (char: string) => {
    const rowBeingUpdated = board[currentGuessIndex];
    const emptyIndex = rowBeingUpdated.findIndex((item) => !item.char);

    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessIndex][emptyIndex].char = char.toLocaleLowerCase();
    });

    setBoard(updatedBoard);
  };

  const removeLastCharFromBoard = () => {
    const updatedBoard = produce(board, (draft) => {
      const rowBeingUpdated = Array.from(draft[currentGuessIndex]);
      const lastCharIndex =
        rowBeingUpdated.length -
        1 -
        rowBeingUpdated.reverse().findIndex(({ char }) => !!char);

      if (lastCharIndex >= targetWordInfo.word.length) {
        return;
      }

      draft[currentGuessIndex][lastCharIndex] = {};
    });

    setBoard(updatedBoard);
  };

  /**
   * @precondition expects guess to be validated
   */
  const updateBoardForGuessResults = (guessResults: WordleGuessResult[]) => {
    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessIndex] = guessResults;
    });
    setBoard(updatedBoard);
    setCurrentGuessIndex((prevIndex) => prevIndex + 1);

    // save progress for this puzzle when the board is updated
    const serializedBoard = serializeBoard(updatedBoard);
    localStorage.setItem(boardUid, serializedBoard);
  };

  const resetBoard = () =>
    setBoard(getEmptyBoard(guessLimit, targetWordInfo.word.length));

  const resetCurrentGuessIndex = () => setCurrentGuessIndex(0);

  return {
    board,
    currentGuessIndex,
    addCharToBoard,
    removeLastCharFromBoard,
    updateBoardForGuessResults,
    resetBoard,
    resetCurrentGuessIndex,
  };
};
