import { GetServerSideProps, NextPage } from "next";
import { getWordInfo } from "src/api";
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

  let word: string;
  let definition: string;
  let guessLimit: number;

  try {
    const parseResults = parseBoardUid(boardUid);
    const wordInfo = getWordInfo(parseResults.targetWord);
    word = wordInfo.word;
    definition = wordInfo.definition;
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
      targetWordInfo: {
        word,
        definition,
      },
      boardUid,
    },
  };
};

export default Page;
