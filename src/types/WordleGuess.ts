export type WordleGuessStatus = "CORRECT" | "WRONG_POSITION" | "NOT_IN_WORD";

export interface WordleGuessResult {
  status: WordleGuessStatus;
  char: string;
}
