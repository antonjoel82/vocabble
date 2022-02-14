import { WordleGuessResult } from "../types";

interface CharToIndices {
  [char: string]: number[];
}

const wordToLetterLookup = (word: string): CharToIndices => {
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

export const evaluateGuessV2 = (
  guess: string,
  targetWord: string
): WordleGuessResult[] => {
  const results: WordleGuessResult[] = []; //Array(guess.length).fill({});

  // console.log("Evaluating", { guess, targetWord });

  if (guess.length !== targetWord.length) {
    throw new Error("Invalid word length!");
  }

  const guessLookup = wordToLetterLookup(guess);
  const targetLookup = wordToLetterLookup(targetWord);

  const usedGuesses: Record<string, number> = {};

  // console.log("Lookups: guess, target", guessLookup, targetLookup);

  guess.split("").forEach((guessChar, guessCharIndex) => {
    // current letter has a match in the same position
    if (guessChar === targetWord.charAt(guessCharIndex)) {
      // result.status = "correct";
      usedGuesses[guessChar] = (usedGuesses[guessChar] ?? 0) + 1;
    }
  });

  guess.split("").forEach((guessChar, guessCharIndex) => {
    const result: WordleGuessResult = {
      char: guessChar,
      status: "not_in_word",
    };

    const matchingIndices = targetLookup[guessChar] ?? [];

    // current letter has a match in the same position
    if (matchingIndices.indexOf(guessCharIndex) >= 0) {
      result.status = "correct";
      usedGuesses[guessChar] = (usedGuesses[guessChar] ?? 0) + 1;
    } else if (
      // there's at least one match but ensure we don't signal a phantom extra character
      matchingIndices.length > 0 &&
      (usedGuesses[guessChar] ?? 0) < matchingIndices.length
    ) {
      result.status = "wrong_position";
      usedGuesses[guessChar] = (usedGuesses[guessChar] ?? 0) + 1;
    } else {
      result.status = "not_in_word";
    }

    results.push(result);
  });

  return results;
};
