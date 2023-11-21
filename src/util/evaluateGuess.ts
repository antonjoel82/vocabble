import { WordleGuessResult } from "../types";
import { removeMatchOrTail } from "./removeMatchOrTail";

interface CharToIndices {
  [char: string]: number[];
}

const wordToCharIndicesMap = (word: string): CharToIndices => {
  return word.split("").reduce((dict, char, index) => {
    if (!dict[char]) {
      dict[char] = [];
    }

    return {
      ...dict,
      [char]: [...dict[char], index],
    };
  }, {} as CharToIndices);
};

export const evaluateGuess = (
  guess: string,
  targetWord: string
): WordleGuessResult[] => {
  if (guess.length !== targetWord.length) {
    throw new Error("Invalid word length!");
  }

  // map each character from the target word to a list of the indices at which it appears
  const targetLookup = wordToCharIndicesMap(targetWord);

  const results: WordleGuessResult[] = guess
    .split("")
    .map((guessChar, guessCharIndex) => {
      // for now, if it's not an exact match, mark it as not_in_word to be evaluated later
      if (guessChar !== targetWord.charAt(guessCharIndex)) {
        return {
          char: guessChar,
          status: "NOT_IN_WORD",
        };
      }

      // current letter has a match in the same position
      // Remove from look up so we don't over match
      targetLookup[guessChar] = removeMatchOrTail(
        targetLookup[guessChar],
        guessCharIndex
      );

      return {
        char: guessChar,
        status: "CORRECT",
      };
    });

  return results.map((existingResult, guessCharIndex) => {
    const matchingIndices = targetLookup[existingResult.char] ?? [];

    // if the status is already marked as correct or there are no remaining matches,
    // just use the existing result
    if (existingResult.status === "CORRECT" || matchingIndices.length === 0) {
      return existingResult;
    }

    // Remove from look up so we don't over match
    targetLookup[existingResult.char] = removeMatchOrTail(
      targetLookup[existingResult.char],
      guessCharIndex
    );

    // at this point we know this character has other locations in the word, but it's not
    // in the correct spot; thus, it's wrong_position
    return {
      ...existingResult,
      status: "WRONG_POSITION",
    };
  });
};
