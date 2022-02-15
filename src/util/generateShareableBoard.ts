import { BoardResults } from "../components/Board";

export const generateShareableBoard = (board: BoardResults) => {
  return board
    .map((guess) => {
      return guess
        .map(({ status }) => {
          switch (status) {
            case "correct":
              return "🟩";
            case "wrong_position":
              return "🟨";
            case "not_in_word":
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
