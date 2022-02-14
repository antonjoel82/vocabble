import { useRouter } from "next/router";
import { WordleGame, WordleGameProps } from "../components/WordleGame";
import {
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
  MIN_GUESS_LIMIT,
  MAX_GUESS_LIMIT,
} from "../config/wordle";

const DEFAULT_WORDLE_GAME_PROPS: WordleGameProps = {
  guessLimit: 6,
  wordLength: 5,
};

export default () => {
  const { query } = useRouter();

  const wordleProps: WordleGameProps = DEFAULT_WORDLE_GAME_PROPS;

  const guesses = query.guesses;
  if (
    guesses &&
    !Number.isNaN(guesses) &&
    Number.isInteger(+guesses) &&
    +guesses >= MIN_GUESS_LIMIT &&
    +guesses <= MAX_GUESS_LIMIT
  ) {
    wordleProps.guessLimit = +guesses;
  }

  const length = query.length;
  if (
    length &&
    !Number.isNaN(length) &&
    Number.isInteger(+length) &&
    +length >= MIN_WORD_LENGTH &&
    +length <= MAX_WORD_LENGTH
  ) {
    wordleProps.wordLength = +length;
  }

  return <WordleGame {...wordleProps} />;
};
