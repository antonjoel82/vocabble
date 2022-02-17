import {
  DEFAULT_GUESS_LIMIT,
  DEFAULT_WORD_LENGTH,
  MIN_GUESS_LIMIT,
  MAX_GUESS_LIMIT,
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
} from "src/config";

export const getValidatedBoardDims = (
  proposedGuessLimit?: string,
  proposedWordLength?: string
) => {
  let guessLimit = DEFAULT_GUESS_LIMIT;
  let wordLength = DEFAULT_WORD_LENGTH;

  const guesses = proposedGuessLimit;
  if (
    guesses &&
    !Number.isNaN(guesses) &&
    Number.isInteger(+guesses) &&
    +guesses >= MIN_GUESS_LIMIT &&
    +guesses <= MAX_GUESS_LIMIT
  ) {
    guessLimit = +guesses;
  }

  const length = proposedWordLength;
  if (
    length &&
    !Number.isNaN(length) &&
    Number.isInteger(+length) &&
    +length >= MIN_WORD_LENGTH &&
    +length <= MAX_WORD_LENGTH
  ) {
    wordLength = +length;
  }

  return {
    wordLength,
    guessLimit,
  };
};
