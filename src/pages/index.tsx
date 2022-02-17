import { GetServerSideProps, NextPage } from "next";
import { getRandomWordOfLength } from "src/api";
import { getValidatedBoardDims } from "src/util/getValidatedBoardDims";
import { createBoardUid } from "src/util/server";
import { WordleGame, WordleGameProps } from "../components/WordleGame";

export type WordlePageProps = WordleGameProps;

const Page: NextPage<WordlePageProps> = (wordleGameProps) => {
  return <WordleGame {...wordleGameProps} />;
};

export const getServerSideProps: GetServerSideProps<WordlePageProps> = async ({
  query,
}) => {
  const guesses = Array.isArray(query.guesses)
    ? query.guesses[0]
    : query.guesses;
  const wordLen = Array.isArray(query.length) ? query.length[0] : query.length;

  const { wordLength, guessLimit } = getValidatedBoardDims(guesses, wordLen);
  const targetWord = getRandomWordOfLength(wordLength).toLocaleLowerCase();
  const boardUid = createBoardUid(targetWord, guessLimit);

  return {
    props: {
      guessLimit,
      targetWord,
      boardUid,
    },
  };
};

export default Page;
