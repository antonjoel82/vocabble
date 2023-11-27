import { BoardResults } from "src/components/Board";

export interface GameStateSelectorParam {
  board: BoardResults;
  currentGuessIndex: number;
}

export type GameStateSelector<T> = (state: GameStateSelectorParam) => T;
