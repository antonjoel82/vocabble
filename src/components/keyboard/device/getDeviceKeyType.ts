// allow only letter keys
const LETTER_KEY_REGEX = /^[a-z]$/i;

type KeyType = "letter" | "enter" | "backspace";

export const getDeviceKeyType = (key: string): KeyType | undefined =>
  LETTER_KEY_REGEX.test(key)
    ? "letter"
    : key.toLocaleLowerCase() === "enter"
    ? "enter"
    : key.toLocaleLowerCase() === "backspace"
    ? "backspace"
    : undefined;
