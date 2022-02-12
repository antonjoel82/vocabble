import * as React from 'react';
import { CharGuessResult } from '../index';

interface CharSquareProps {
  guessResult: CharGuessResult;
}

export const CharSquare: React.FC<CharSquareProps> = ({ guessResult }) => {
  return (
    <span className={`charGuess guess-${guessResult.status}`}>
      {guessResult.char}
    </span>
  );
};
