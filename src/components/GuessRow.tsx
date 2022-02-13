import * as React from "react";
import { CharSquare } from "./CharSquare";
import { CharGuessResult } from "./WordleGame";
import { Flex } from "@chakra-ui/react";

interface GuessRowProps {
  guessResults: Partial<CharGuessResult>[];
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
