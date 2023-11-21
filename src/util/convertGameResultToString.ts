import { BoardResults } from "../components/Board";
import { APP_NAME } from "../layout/MainLayout";
import { generateShareableBoard } from "./generateShareableBoard";
import { getBoardUrl } from "./getBoardUrl";

export const convertGameResultToString = (
  board: BoardResults,
  boardUid: string,
  baseUrl: string
) => {
  const guessLimit = board.length;

  const winningGuessIndex = board.findIndex((row) =>
    row.every(({ status }) => status === "CORRECT")
  );

  return `${APP_NAME} ${boardUid} ${
    winningGuessIndex >= 0 ? winningGuessIndex + 1 : "X"
  }/${guessLimit}\n\n${generateShareableBoard(board)}\n\n${getBoardUrl(
    baseUrl,
    boardUid
  )}`;
};
