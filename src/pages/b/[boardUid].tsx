import { GetServerSideProps, NextPage } from "next";
import { parseBoardUid } from "src/util/server";
import { WordleGame, WordleGameProps } from "../../components/WordleGame";

export type WordlePageProps = WordleGameProps;

const Page: NextPage<WordlePageProps> = (wordleGameProps) => {
  return <WordleGame {...wordleGameProps} />;
};

export const getServerSideProps: GetServerSideProps<WordlePageProps> = async ({
  req,
  query,
}) => {
  console.log(req.url);

  const boardUid = Array.isArray(query.boardUid)
    ? query.boardUid[0]
    : query.boardUid;

  let targetWord: string;
  let guessLimit: number;

  try {
    const parseResults = parseBoardUid(boardUid);
    targetWord = parseResults.targetWord;
    guessLimit = parseResults.guessLimit;
  } catch (err) {
    return {
      redirect: {
        destination: "/standard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      guessLimit,
      targetWord,
      boardUid,
    },
  };
};

export default Page;
