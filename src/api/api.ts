import { FULL_DICTIONARY } from './full-dictionary';

export const getDictionaryForWordLength = (
  wordLength: number = 5
): Record<string, any> => {
  if (wordLength < 1 || wordLength > 28) {
    throw new Error(`Word length of ${wordLength} is invalid`);
  }

  return FULL_DICTIONARY[wordLength].reduce(
    (dict, word) => ({
      ...dict,
      [word]: 1,
    }),
    {}
  );
};

export const getRandomWordFromWordList = (wordList: string[]): string => {
  if (!wordList?.[0]) {
    throw new Error('Word list is empty');
  }

  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

export const getRandomWordFromDictionary = (
  dictionary: Record<string, any>
): string => {
  if (!dictionary || !Object.keys(dictionary)) {
    throw new Error('Word list is empty');
  }

  const words = Object.keys(dictionary);
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const getRandomWordOfLength = (wordLength: number = 5): string => {
  if (wordLength < 1 || wordLength > 28) {
    throw new Error(`Word length of ${wordLength} is invalid`);
  }

  const dictionary = FULL_DICTIONARY[wordLength];

  const randomIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[randomIndex];
};
