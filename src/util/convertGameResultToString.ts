import { encryptWord } from "./wordEncryption";
import { BoardResults } from "../components/Board";
import { APP_NAME } from "../layout/MainLayout";
import { generateShareableBoard } from "./generateShareableBoard";

export const convertGameResultToString = (
  board: BoardResults,
  targetWord: string
) => {
  const guessLimit = board.length;

  const winningGuessIndex = board.findIndex(
    (row) => row.join("") === targetWord
  );

  return `${APP_NAME} ${encryptWord(targetWord)} ${
    winningGuessIndex >= 0 ? winningGuessIndex + 1 : "X"
  }/${guessLimit}\n\n${generateShareableBoard(board)}`;
};
