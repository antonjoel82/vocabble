import React from "react";
import { WordleGuessResult } from "src/types";

export type GameStatus = "ACTIVE" | "LOST" | "WON";

const DEFAULT_GAME_STATUS: GameStatus = "ACTIVE";

export const useGameStatus = () => {
  const [gameStatus, setGameStatus] =
    React.useState<GameStatus>(DEFAULT_GAME_STATUS);

  const resetGameStatus = () => setGameStatus(DEFAULT_GAME_STATUS);

  const updateGameStatusForGuessResults = (
    guessResults: WordleGuessResult[],
    hasExceededGuessLimit: boolean
  ) => {
    if (guessResults.every(({ status }) => status === "CORRECT")) {
      setGameStatus("WON");
    } else if (hasExceededGuessLimit) {
      setGameStatus("LOST");
    }
  };

  return {
    gameStatus,
    resetGameStatus,
    updateGameStatusForGuessResults,
  };
};
