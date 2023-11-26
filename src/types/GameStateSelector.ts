import { BoardResults } from "src/components/Board";

export interface GameStateSelectorParam {
  board: BoardResults;
  currentGuessCount: number;
}

export type GameStateSelector<T> = (state: GameStateSelectorParam) => T;
