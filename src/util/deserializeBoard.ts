import { BoardResults } from "src/components/Board";

interface BaseDeserializationParams {
  wordLength: number;
}

interface LineDeserializationParams extends BaseDeserializationParams {
  line: string;
}

interface BoardDeserializationParams extends BaseDeserializationParams {
  serializedBoard: string;
  numGuesses: number;
}

const deserializeLine = ({
  line,
  wordLength,
}: LineDeserializationParams): BoardResults[0] => {
  const maybePartialRow = line.split("").map((char) => ({ char }));

  // fill the remaining row with empty spaces
  return maybePartialRow.concat(
    Array(wordLength - maybePartialRow.length).fill({})
  );
};

const createEmptyRow = (wordLength: number): BoardResults[0] =>
  Array(wordLength).fill({});

export const deserializeBoard = ({
  serializedBoard,
  numGuesses,
  wordLength,
}: BoardDeserializationParams): BoardResults => {
  const maybePartialBoard = serializedBoard
    .split("\n")
    .map((line) => deserializeLine({ line, wordLength }));

  // Can return board as is if it has numGuesses rows
  if (maybePartialBoard.length === numGuesses) {
    return maybePartialBoard;
  }

  // fill the remaining board with empty rows
  return maybePartialBoard.concat(
    Array(numGuesses - maybePartialBoard.length).fill(
      createEmptyRow(wordLength)
    )
  );
};
