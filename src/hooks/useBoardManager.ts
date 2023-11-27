import { produce } from "immer";
import { useCallback, useState } from "react";
import { validateWordInDictionary } from "src/api";
import { BoardResults } from "src/components/Board";
import { selectCurrentGuess } from "src/selectors";
import { WordInfo } from "src/types";
import { validateChar, evaluateGuess, getEmptyBoard } from "src/util";

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

  return {
    board,
    addCharToBoard,
  };
};
