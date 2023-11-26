import React from "react";

export type GameStatus = "ACTIVE" | "LOST" | "WON";

export const useGameStatus = () => {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("ACTIVE");

  return {
    gameStatus,
    setGameStatus,
  };
};
