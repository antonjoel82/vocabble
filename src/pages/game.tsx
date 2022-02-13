import { WordleGame, WordleGameProps } from "../components/WordleGame";

const DEFAULT_WORDLE_GAME_PROPS: WordleGameProps = {
  guessLimit: 6,
  wordLength: 5,
};

export default () => {
  return (
    <main>
      <WordleGame {...DEFAULT_WORDLE_GAME_PROPS} />
    </main>
  );
};
