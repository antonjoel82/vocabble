import { BoardResults } from "src/components/Board";
import { evaluateGuess } from "./evaluateGuess";

interface LineDeserializationParams {
  wordLength: number;
  line: string;
}

interface BoardDeserializationParams {
  targetWord: string;
  serializedBoard: string;
  guessLimit: number;
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
  guessLimit,
  targetWord,
}: BoardDeserializationParams): BoardResults => {
  const wordLength = targetWord.length;
  const maybePartialBoard = serializedBoard
    .split("\n")
    .map((line) =>
      line.length === wordLength
        ? evaluateGuess(line, targetWord)
        : deserializeLine({ line, wordLength })
    );

  // Can return board as is if it has guessLimit rows
  if (maybePartialBoard.length === guessLimit) {
    return maybePartialBoard;
  }

  // fill the remaining board with empty rows
  return maybePartialBoard.concat(
    Array(guessLimit - maybePartialBoard.length).fill(
      createEmptyRow(wordLength)
    )
  );
};
