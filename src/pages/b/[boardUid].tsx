import { GetServerSideProps, NextPage } from "next";
import { getWordInfo } from "src/api";
import { parseBoardUid } from "src/util/server";
import { GameView, GameViewProps } from "../../components/GameView";

export type WordlePageProps = GameViewProps;

const Page: NextPage<WordlePageProps> = (wordleGameProps) => {
  return <GameView {...wordleGameProps} />;
};

export const getServerSideProps: GetServerSideProps<WordlePageProps> = async ({
  query,
}) => {
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
