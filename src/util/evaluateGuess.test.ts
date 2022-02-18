import { WordleGuessResult } from "src/types";
import { evaluateGuess } from "./evaluateGuess";

describe("evaluateGuess", () => {
  it("should get return all correct for an exact guess", () => {
    const guess = "guest";
    const targetWord = guess;

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>(
      guess.split("").map((char) => ({ char, status: "correct" }))
    );
  });

  it("should get return all not_in_word for all incorrect guess chars", () => {
    const guess = "guest";
    const targetWord = "brink";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>(
      guess.split("").map((char) => ({ char, status: "not_in_word" }))
    );
  });

  it("should get return all wrong_position for all scrambled chars", () => {
    const guess = "dates";
    const targetWord = "stead";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>(
      guess.split("").map((char) => ({ char, status: "wrong_position" }))
    );
  });

  it("should only return one 'wrong_position' char when there are 2 chars in the wrong position for a single char", () => {
    const guess = "adder";
    const targetWord = "stead";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "wrong_position" },
      { char: "d", status: "wrong_position" },
      { char: "d", status: "not_in_word" },
      { char: "e", status: "wrong_position" },
      { char: "r", status: "not_in_word" },
    ]);
  });

  it("should only return match many-to-many wrong_position chars", () => {
    const guess = "adder";
    const targetWord = "dread";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "wrong_position" },
      { char: "d", status: "wrong_position" },
      { char: "d", status: "wrong_position" },
      { char: "e", status: "wrong_position" },
      { char: "r", status: "wrong_position" },
    ]);
  });

  it("should only return match many-to-many wrong_position chars", () => {
    const guess = "stead";
    const targetWord = "adder";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "s", status: "not_in_word" },
      { char: "t", status: "not_in_word" },
      { char: "e", status: "wrong_position" },
      { char: "a", status: "wrong_position" },
      { char: "d", status: "wrong_position" },
    ]);
  });

  it("should match two chars, one in correct position one in wrong_position", () => {
    const guess = "adder";
    const targetWord = "dadas";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "wrong_position" },
      { char: "d", status: "wrong_position" },
      { char: "d", status: "correct" },
      { char: "e", status: "not_in_word" },
      { char: "r", status: "not_in_word" },
    ]);
  });

  it("should ignore one char in the wrong position (before) there's also an exact match", () => {
    const guess = "adder";
    const targetWord = "lader";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "a", status: "wrong_position" },
      { char: "d", status: "not_in_word" },
      { char: "d", status: "correct" },
      { char: "e", status: "correct" },
      { char: "r", status: "correct" },
    ]);
  });

  it("should ignore one char in the wrong position (after) there's also an exact match", () => {
    const guess = "jaded";
    const targetWord = "lader";

    const result = evaluateGuess(guess, targetWord);
    expect(result).toEqual<WordleGuessResult[]>([
      { char: "j", status: "not_in_word" },
      { char: "a", status: "correct" },
      { char: "d", status: "correct" },
      { char: "e", status: "correct" },
      { char: "d", status: "not_in_word" },
    ]);
  });
});
