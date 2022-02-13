import { WordleGame, WordleGameProps } from "../components/WordleGame";

const DEFAULT_WORDLE_GAME_PROPS: WordleGameProps = {
  guessLimit: 6,
  wordLength: 5,
};

export default () => {
  return <WordleGame {...DEFAULT_WORDLE_GAME_PROPS} />;
};

// const Index = () => (
//   <Container height="100vh">
//     <Hero title="Worrdle" />
//     <Main>
//       <Text>Messing with word games</Text>
//     </Main>
//   </Container>
// );
