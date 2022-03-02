import { BoardResults } from "src/components/Board";

const serializeBoardRow = (row: BoardResults[0]): string => {
  return row
    .map(({ char }) => char)
    .join("")
    .trim();
};

export const serializeBoard = (board: BoardResults): string => {
  return board
    .map((row) => serializeBoardRow(row))
    .join("\n")
    .trim();
};
