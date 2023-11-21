import { WordleGuessResult } from "src/types";
import { evaluateGuess } from "./evaluateGuess";

describe("evaluateGuess", () => {
  it("should get return all correct for an exact guess", () => {
    const guess = "guest";
    const targetWord = guess;

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>(
      guess.split("").map((char) => ({ char, status: "CORRECT" }))
    );
  });

  it("should get return all not_in_word for all incorrect guess chars", () => {
    const guess = "guest";
    const targetWord = "brink";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>(
      guess.split("").map((char) => ({ char, status: "NOT_IN_WORD" }))
    );
  });

  it("should get return all wrong_position for all scrambled chars", () => {
    const guess = "dates";
    const targetWord = "stead";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>(
      guess.split("").map((char) => ({ char, status: "WRONG_POSITION" }))
    );
  });

  it("should only return one 'wrong_position' char when there are 2 chars in the wrong position for a single char", () => {
    const guess = "adder";
    const targetWord = "stead";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "WRONG_POSITION" },
      { char: "d", status: "WRONG_POSITION" },
      { char: "d", status: "NOT_IN_WORD" },
      { char: "e", status: "WRONG_POSITION" },
      { char: "r", status: "NOT_IN_WORD" },
    ]);
  });

  it("should only return match many-to-many wrong_position chars", () => {
    const guess = "adder";
    const targetWord = "dread";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "WRONG_POSITION" },
      { char: "d", status: "WRONG_POSITION" },
      { char: "d", status: "WRONG_POSITION" },
      { char: "e", status: "WRONG_POSITION" },
      { char: "r", status: "WRONG_POSITION" },
    ]);
  });

  it("should only return match many-to-many wrong_position chars", () => {
    const guess = "stead";
    const targetWord = "adder";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "s", status: "NOT_IN_WORD" },
      { char: "t", status: "NOT_IN_WORD" },
      { char: "e", status: "WRONG_POSITION" },
      { char: "a", status: "WRONG_POSITION" },
      { char: "d", status: "WRONG_POSITION" },
    ]);
  });

  it("should match two chars, one in correct position one in wrong_position", () => {
    const guess = "adder";
    const targetWord = "dadas";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "WRONG_POSITION" },
      { char: "d", status: "WRONG_POSITION" },
      { char: "d", status: "CORRECT" },
      { char: "e", status: "NOT_IN_WORD" },
      { char: "r", status: "NOT_IN_WORD" },
    ]);
  });

  it("should ignore one char in the wrong position (before) there's also an exact match", () => {
    const guess = "adder";
    const targetWord = "lader";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "WRONG_POSITION" },
      { char: "d", status: "NOT_IN_WORD" },
      { char: "d", status: "CORRECT" },
      { char: "e", status: "CORRECT" },
      { char: "r", status: "CORRECT" },
    ]);
  });

  it("should ignore one char in the wrong position (after) there's also an exact match", () => {
    const guess = "jaded";
    const targetWord = "lader";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "j", status: "NOT_IN_WORD" },
      { char: "a", status: "CORRECT" },
      { char: "d", status: "CORRECT" },
      { char: "e", status: "CORRECT" },
      { char: "d", status: "NOT_IN_WORD" },
    ]);
  });
});
