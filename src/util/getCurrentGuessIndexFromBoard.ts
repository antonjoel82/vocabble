import { BoardResults } from "src/components/Board";

export const getCurrentGuessIndexFromBoard = (board: BoardResults): number => {
  const guessIndex = board.findIndex((row) => row.some(({ char }) => !char));

  return guessIndex === -1 ? board.length : guessIndex;
};
