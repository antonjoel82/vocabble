import { BoardResults } from "src/components/Board";

export const getEmptyBoard = (
  guessLimit: number,
  wordLength: number
): BoardResults => {
  const board = Array(guessLimit).fill(Array(wordLength).fill({}));
  return board;
};
