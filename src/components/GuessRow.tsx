import * as React from 'react';
import { CharGuessResult } from '../index';
import { CharSquare } from './CharSquare';

interface GuessRowProps {
  guessResults: CharGuessResult[];
}

export const GuessRow: React.FC<GuessRowProps> = ({ guessResults }) => {
  return (
    <div className="guessRow">
      {guessResults.map((guessResult, charIndex) => (
        <CharSquare
          key={`${guessResult.char}-${guessResult.status}-${charIndex}`}
          guessResult={guessResult}
        />
      ))}
    </div>
  );
};
