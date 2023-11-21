import React from "react";
import { WordleGuessResult } from "src/types";
import { produce } from "immer";
import { KeyStatusMap } from "./KeyStatusMap";

export const useGameKeyboard = () => {
  const [keyStatusMap, setKeyStatusMap] = React.useState<KeyStatusMap>({});

  const updateKeyboardGuesses = (guessResults: WordleGuessResult[]) => {
    const updatedKeyStatusMap = produce(keyStatusMap, (draft) => {
      for (const { char, status } of guessResults) {
        const previousKeyStatus = draft[char];

        draft[char] =
          previousKeyStatus === "CORRECT" || status === "CORRECT"
            ? "CORRECT"
            : previousKeyStatus === "WRONG_POSITION" ||
              status === "WRONG_POSITION"
            ? "WRONG_POSITION"
            : status;
      }
    });

    setKeyStatusMap(updatedKeyStatusMap);
  };

  const resetKeyboardGuesses = () => {
    setKeyStatusMap({});
  };

  return {
    keyStatusMap,
    updateKeyboardGuesses,
    resetKeyboardGuesses,
  };
};
