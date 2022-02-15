import { BoardResults } from "../components/Board";
import { APP_NAME } from "../layout/MainLayout";
import { generateShareableBoard } from "./generateShareableBoard";

export const convertGameResultToString = (board: BoardResults) => {
  const guessLimit = board.length;

  const winningGuessIndex = board.findIndex((row) =>
    row.every(({ status }) => status === "correct")
  );

  return `${APP_NAME} ${
    winningGuessIndex >= 0 ? winningGuessIndex + 1 : "X"
  }/${guessLimit}\n\n${generateShareableBoard(board)}`;
};
