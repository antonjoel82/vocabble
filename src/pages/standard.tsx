import { GetServerSideProps, NextPage } from "next";
import { WordlePageProps } from "./index";
import { WordleGame } from "../components/WordleGame";
import { getRandomWordOfLength } from "src/api";
import { DEFAULT_GUESS_LIMIT, DEFAULT_WORD_LENGTH } from "src/config";
import { createBoardUid } from "src/util/server";

const Page: NextPage<WordlePageProps> = (pageProps) => {
  return <WordleGame {...pageProps} />;
};

export const getServerSideProps: GetServerSideProps<
  WordlePageProps
> = async () => {
  const guessLimit = DEFAULT_GUESS_LIMIT;
  const targetWord =
    getRandomWordOfLength(DEFAULT_WORD_LENGTH).toLocaleLowerCase();
  const boardUid = createBoardUid(targetWord, DEFAULT_GUESS_LIMIT);

  return {
    props: {
      guessLimit,
      targetWord,
      boardUid,
    },
  };
};

export default Page;
