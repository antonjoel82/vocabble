export type WordleGuessStatus = "correct" | "wrong_position" | "not_in_word";

export interface WordleGuessResult {
  status: WordleGuessStatus;
  char: string;
}
