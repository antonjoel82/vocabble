import React from "react";

export type GameState = "ACTIVE" | "LOST" | "WON";

export const useGameState = () => {
  const [gameState, setGameState] = React.useState<GameState>("ACTIVE");

  return {
    gameState,
    setGameState,
  };
};
