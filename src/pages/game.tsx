import { WordleGame, WordleGameProps } from "../components/WordleGame";

const DEFAULT_WORDLE_GAME_PROPS: WordleGameProps = {
  guessLimit: 6,
  wordLength: 5,
};

export default () => {
  return <WordleGame {...DEFAULT_WORDLE_GAME_PROPS} />;
};
