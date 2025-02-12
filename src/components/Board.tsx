import { WordleGuessResult } from "../types";
import { GuessRow } from "./GuessRow";
import { Flex } from "@chakra-ui/react";

export type BoardResults = Partial<WordleGuessResult>[][];

export interface BoardProps {
  boardData: BoardResults;
}

export const Board: React.FC<BoardProps> = ({ boardData }) => {
  return (
    <Flex direction="column" rowGap={2}>
      {boardData.map((guessResults, guessIndex) => (
        <GuessRow key={`guess-${guessIndex}`} guessResults={guessResults} />
      ))}
    </Flex>
  );
};
