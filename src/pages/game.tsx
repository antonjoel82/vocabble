import * as React from "react";
import { render } from "react-dom";
import {
  getDictionaryForWordLength,
  getRandomWordFromDictionary,
  getRandomWordFromWordList,
  getRandomWordOfLength,
} from "../api";
import { GuessRow } from "../components/GuessRow";
import { WordEntry } from "../components/WordEntry";
import { evaluateGuessV2 } from "../util/evaluateGuess";

export type CharGuessStatus = "correct" | "wrong_position" | "not_in_word";

export interface CharGuessResult {
  status: CharGuessStatus;
  char: string;
}

const GUESS_LIMIT = 6;
const WORD_LENGTH = 5;

export default () => {
  const [targetWord, setTargetWord] = React.useState<string>("");
  const [currentGuessCount, setCurrentGuessCount] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<"active" | "fail" | "win">(
    "active"
  );

  const [board, setBoard] = React.useState<CharGuessResult[][]>([]);

  const handleMount = () => {
    const target = getRandomWordOfLength(WORD_LENGTH);
    setTargetWord(target.toLocaleLowerCase());
  };

  React.useEffect(() => {
    handleMount();
  }, []);

  const resetGame = () => {
    handleMount();
    setCurrentGuessCount(0);
    setGameState("active");
    setBoard([]);
  };

  const submitGuess = (guess: string) => {
    const guessResults = evaluateGuessV2(guess, targetWord);

    setCurrentGuessCount((curGuessCount) => curGuessCount + 1);

    console.log("Evaluated result", { guess, targetWord, guessResults });
    setBoard((curBoard) => [...curBoard, guessResults]);

    if (guessResults.every(({ status }) => status === "correct")) {
      setGameState("win");
    }
  };

  React.useEffect(() => {
    if (currentGuessCount >= GUESS_LIMIT && gameState !== "win") {
      setGameState("fail");
    }
  }, [currentGuessCount]);

  return (
    <main>
      <h1>Worrdle</h1>
      <div className="guessContainer">
        {board.map((guessResults, guessIndex) =>
          guessResults ? (
            <GuessRow key={`guess-${guessIndex}`} guessResults={guessResults} />
          ) : (
            <span>No guesses</span>
          )
        )}
      </div>
      {gameState === "active" ? (
        <WordEntry
          submitGuess={submitGuess}
          maxLength={WORD_LENGTH}
          disabled={gameState !== "active"}
        />
      ) : (
        <div>
          <h3>
            {gameState === "win"
              ? "You win!"
              : `For real bro? The word was ${targetWord}`}
          </h3>
          <button onClick={resetGame}>Play again!</button>
        </div>
      )}
    </main>
  );
};
