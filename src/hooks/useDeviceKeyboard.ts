import { useCallback, useEffect } from "react";
import { KeyboardBaseProps } from "../types";

// allow only letter keys
const LETTER_KEY_REGEX = /^[a-z]$/i;

type KeyType = "letter" | "enter" | "backspace";

const getKeyType = (key: string): KeyType | undefined =>
  LETTER_KEY_REGEX.test(key)
    ? "letter"
    : key.toLocaleLowerCase() === "enter"
    ? "enter"
    : key.toLocaleLowerCase() === "backspace"
    ? "backspace"
    : undefined;

export const useDeviceKeyboard = ({
  handleAddChar,
  handleBackspace,
  handleSubmit,
  canBackspace,
  canSubmit,
}: KeyboardBaseProps) => {
  const handleUserKeyPress = useCallback(({ key }: KeyboardEvent) => {
    const keyType = getKeyType(key);
    if (!keyType) {
      return;
    }

    switch (keyType) {
      case "letter":
        console.log(`Handling a letter key press!`);
        handleAddChar(key);
        return;
      case "enter":
        console.log(`Handling a enter key press!`);
        if (canSubmit) {
          handleSubmit();
        }
        return;
      case "backspace":
        console.log(`Handling a backspace key press!`);
        if (canBackspace) {
          handleBackspace();
        }
        return;
      default:
        return;
    }
  }, []);

  useEffect(() => {
    console.log("Keyboard MOUNTING");
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
};
