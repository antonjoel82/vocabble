import { MAX_WORD_LENGTH, MIN_WORD_LENGTH } from "src/config";
import { WordInfo } from "src/types";
// import { FULL_DICTIONARY } from "./full-dictionary";
import DICTIONARY from "./by-len-full.json";

export type DictionaryEntry = { definition?: string };
export type JsonDictionary = Record<string, DictionaryEntry>;
export type JsonDictionaryByLength = Record<string, JsonDictionary>;

export const getDictionaryForWordLength = (
  wordLength: number = 5
): Record<string, any> => {
  if (wordLength < 1 || wordLength > 28) {
    throw new Error(`Word length of ${wordLength} is invalid`);
  }

  return DICTIONARY[wordLength].reduce(
    (dict, word) => ({
      ...dict,
      [word]: 1,
    }),
    {}
  );
};

// export const getRandomWordFromDictionary = (
//   dictionary: Record<string, any>
// ): string => {
//   if (!dictionary || !Object.keys(dictionary)) {
//     throw new Error("Word list is empty");
//   }

//   const words = Object.keys(dictionary);
//   const randomIndex = Math.floor(Math.random() * words.length);
//   return words[randomIndex];
// };

export const getWordInfo = (word: string): WordInfo => {
  const dictionaryEntry: DictionaryEntry = DICTIONARY[word.length][word];

  if (!dictionaryEntry) {
    throw new Error(`The word ${word} doesn't exist.`);
  }

  return {
    word,
    definition: dictionaryEntry.definition,
  };
};

export const validateWord = (word: string): boolean => {
  if (!word || word.length < MIN_WORD_LENGTH || word.length > MAX_WORD_LENGTH) {
    return false;
  }

  return Boolean(DICTIONARY[word.length][word]);
};

export const getRandomWordInfoForLength = (
  wordLength: number = 5
): WordInfo => {
  if (wordLength < MIN_WORD_LENGTH || wordLength > MAX_WORD_LENGTH) {
    throw new Error(`Word length of ${wordLength} is invalid`);
  }

  // only get words with a definition
  const wordInfoList: WordInfo[] = Object.entries(
    DICTIONARY[wordLength] as JsonDictionary
  ).reduce((dict, [word, { definition }]) => {
    if (definition) {
      return dict.concat({ word, definition });
    }
    return dict;
  }, []);

  const randomIndex = Math.floor(Math.random() * wordInfoList.length);
  return wordInfoList[randomIndex];
};
