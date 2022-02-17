import * as React from "react";
import { CharSquare } from "./CharSquare";
import { Flex } from "@chakra-ui/react";
import { WordleGuessResult } from "src/types/WordleGuess";

interface GuessRowProps {
  guessResults: Partial<WordleGuessResult>[];
}

export const GuessRow: React.FC<GuessRowProps> = ({ guessResults }) => {
  return (
    <Flex gap={2}>
      {guessResults.map((guessResult, charIndex) => (
        <CharSquare
          key={`${guessResult.char}-${guessResult.status}-${charIndex}`}
          guessResult={guessResult}
        />
      ))}
    </Flex>
  );
};
