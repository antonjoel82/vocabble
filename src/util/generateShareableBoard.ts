import { BoardResults } from "../components/Board";

export const generateShareableBoard = (board: BoardResults) => {
  return board
    .map((guess) => {
      return guess
        .map(({ status }) => {
          switch (status) {
            case "CORRECT":
              return "🟩";
            case "WRONG_POSITION":
              return "🟨";
            case "NOT_IN_WORD":
              return "⬜";
            default:
              return null;
          }
        })
        .filter((res) => !!res)
        .join("");
    })
    .filter((row) => row.length > 0)
    .join("\n");
};
