import fpe from "node-fpe";

const ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz";

// domain is all alphanumerics
const domain = ALPHABET_LOWER.concat(ALPHABET_LOWER.toLocaleUpperCase())
  .concat("1234567890")
  .split("");

const cipher = fpe({
  secret: process.env.TARGET_WORD_FPE_SECRET,
  domain,
});

/** Can only be called from server */
export const encryptWord = (word: string) => cipher.encrypt(word);
export const decryptWord = (word: string) => cipher.decrypt(word);
