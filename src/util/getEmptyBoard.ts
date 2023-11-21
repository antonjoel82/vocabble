export const getEmptyBoard = (guessLimit: number, wordLength: number) => {
  const board = Array(guessLimit).fill(Array(wordLength).fill({}));
  return board;
};
