import { GetServerSideProps, NextPage } from "next";
import { getRandomWordInfoForLength } from "src/api";
import { getValidatedBoardDims } from "src/util/getValidatedBoardDims";
import { createBoardUid } from "src/util/server";
import { GameView, GameViewProps } from "../components/GameView";

export type WordlePageProps = GameViewProps;

const Page: NextPage<WordlePageProps> = (wordleGameProps) => {
  return <GameView {...wordleGameProps} />;
};

export const getServerSideProps: GetServerSideProps<WordlePageProps> = async ({
  query,
}) => {
  const guesses = Array.isArray(query.guesses)
    ? query.guesses[0]
    : query.guesses;
  const wordLen = Array.isArray(query.length) ? query.length[0] : query.length;

  const { wordLength, guessLimit } = getValidatedBoardDims(guesses, wordLen);
  const targetWordInfo = getRandomWordInfoForLength(wordLength);
  const boardUid = createBoardUid(targetWordInfo.word, guessLimit);

  return {
    props: {
      guessLimit,
      targetWordInfo,
      boardUid,
    },
  };
};

export default Page;
