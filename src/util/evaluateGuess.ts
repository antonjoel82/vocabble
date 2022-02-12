import { CharGuessResult, CharGuessStatus } from "../pages/game";

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
): CharGuessResult[] => {
  const results: CharGuessResult[] = [];

  console.log("Evaluating", { guess, targetWord });

  if (guess.length !== targetWord.length) {
    throw new Error("Invalid word length!");
  }

  const guessLookup = wordToLetterLookup(guess);
  const targetLookup = wordToLetterLookup(targetWord);

  const usedGuesses: Record<string, number> = {};

  console.log("Lookups: guess, target", guessLookup, targetLookup);

  guess.split("").forEach((guessChar, guessCharIndex) => {
    const result: CharGuessResult = { char: guessChar, status: "not_in_word" };

    const matchingIndices = targetLookup[guessChar] ?? [];

    const guessCharCount = guessLookup[guessChar].length;

    // current letter has a match in the same position
    if (matchingIndices.indexOf(guessCharIndex) >= 0) {
      result.status = "correct";
      usedGuesses[guessChar] = (usedGuesses[guessChar] ?? 0) + 1;
    } else if (
      // there's at least one match but ensure we don't signal a phantom extra character
      matchingIndices.length > 0 &&
      (usedGuesses[guessChar] ?? 0) < matchingIndices.length
      // guessCharCount <= matchingIndices.length
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

// robot - Y G X
// corny

// for (let i = 0; i < guess.length; i++) {
//   const guessChar = guess.charAt(i);

//   const guessCharTargetIndex = targetWord.indexOf(guessChar);

//   const matchIndices: number[] = [];
//   [...targetWord].forEach((char, charIndex) => {
//     if (char === guessChar) {
//       matchIndices.push(charIndex);
//     }
//   });

//   const resultStatus: CharGuessStatus =
//     matchIndices.length > 0 && matchIndices.indexOf(i) >= 0
//       ? 'correct'
//       : guessCharTargetIndex >= 0
//       ? 'wrong_position'
//       : 'not_in_word';

//   results.push({ char: guessChar, status: resultStatus });
// }
