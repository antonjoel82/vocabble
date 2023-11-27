import { produce } from "immer";
import { useState } from "react";
import { BoardResults } from "src/components/Board";
import { WordInfo, WordleGuessResult } from "src/types";
import { getEmptyBoard } from "src/util";

interface UseBoardManagerProps {
  currentGuessCount: number;
  guessLimit: number;
  targetWordInfo: WordInfo;
}

export const useBoardManager = ({
  currentGuessCount,
  guessLimit,
  targetWordInfo,
}: UseBoardManagerProps) => {
  const [board, setBoard] = useState<BoardResults>(
    getEmptyBoard(guessLimit, targetWordInfo.word.length)
  );

  const addCharToBoard = (char: string) => {
    const rowBeingUpdated = board[currentGuessCount];
    const emptyIndex = rowBeingUpdated.findIndex((item) => !item.char);

    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessCount][emptyIndex].char = char.toLocaleLowerCase();
    });

    setBoard(updatedBoard);
  };

  const removeLastCharFromBoard = () => {
    const updatedBoard = produce(board, (draft) => {
      const rowBeingUpdated = Array.from(draft[currentGuessCount]);
      const lastCharIndex =
        rowBeingUpdated.length -
        1 -
        rowBeingUpdated.reverse().findIndex(({ char }) => !!char);

      if (lastCharIndex >= targetWordInfo.word.length) {
        return;
      }

      draft[currentGuessCount][lastCharIndex] = {};
    });

    setBoard(updatedBoard);
  };

  /**
   * @precondition expects guess to be validated
   */
  const updateBoardForGuessResults = (guessResults: WordleGuessResult[]) => {
    const updatedBoard = produce(board, (draft) => {
      draft[currentGuessCount] = guessResults;
    });
    setBoard(updatedBoard);
  };

  const resetBoard = () =>
    setBoard(getEmptyBoard(guessLimit, targetWordInfo.word.length));

  return {
    board,
    addCharToBoard,
    removeLastCharFromBoard,
    updateBoardForGuessResults,
    resetBoard,
  };
};
