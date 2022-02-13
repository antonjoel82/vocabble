import * as React from "react";
import { getRandomWordOfLength } from "../api";
import { Board, BoardResults } from "../components/Board";
import { GuessRow } from "../components/GuessRow";
import { WordEntry } from "../components/WordEntry";
import { evaluateGuessV2 } from "../util/evaluateGuess";
import { Box } from "@chakra-ui/react";
import { Container } from "./Container";
import { WordleKeyboard } from "./keyboard/WordleKeyboard";
import { validateChar } from "../util/validateChar";

export type CharGuessStatus = "correct" | "wrong_position" | "not_in_word";

export interface CharGuessResult {
  status: CharGuessStatus;
  char: string;
}

export interface WordleGameProps {
  guessLimit: number;
  wordLength: number;
}

const getEmptyBoard = (guessLimit: number, wordLength: number) => {
  const board = Array(guessLimit).fill(Array(wordLength).fill({}));
  console.log("Board", board);

  return board;
};

export const WordleGame: React.FC<WordleGameProps> = ({
  guessLimit,
  wordLength,
}) => {
  const [targetWord, setTargetWord] = React.useState<string>("");
  const [currentGuessCount, setCurrentGuessCount] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<"active" | "fail" | "win">(
    "active"
  );
  const [activeGuess, setActiveGuess] = React.useState<string[]>([]);

  const [board, setBoard] = React.useState<BoardResults>(
    getEmptyBoard(guessLimit, wordLength)
  );

  const handleMount = () => {
    const target = getRandomWordOfLength(wordLength);
    setTargetWord(target.toLocaleLowerCase());
  };

  React.useEffect(() => {
    handleMount();
  }, []);

  const handleAddChar = (char: string) => {
    if (!validateChar(char)) {
      console.warn("Illegal character typed!");
      return;
    }

    if (activeGuess.length + char.length > wordLength) {
      alert(`You cannot guess more than ${wordLength} characters.`);
      return;
    }

    alert(`adding char: ${char}`);
    setActiveGuess((curGuess) => curGuess.concat(...char.split("")));
  };

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
    if (currentGuessCount >= guessLimit && gameState !== "win") {
      setGameState("fail");
    }
  }, [currentGuessCount]);

  return (
    <Container>
      <Board boardData={board} />
      {gameState !== "active" && (
        <div>
          <h3>
            {gameState === "win"
              ? "You win!"
              : `For real bro? The word was ${targetWord}`}
          </h3>
          <button onClick={resetGame}>Play again!</button>
        </div>
      )}
      <WordleKeyboard
        keyStatusMap={{}}
        canBackspace
        canSubmit
        handleAddChar={handleAddChar}
        handleBackspace={() => alert("backspace")}
        handleSubmit={() => alert("submit")}
      />
    </Container>
  );
};

// (
//   <WordEntry
//     submitGuess={submitGuess}
//     maxLength={wordLength}
//     disabled={gameState !== "active"}
//   />
// ) :
