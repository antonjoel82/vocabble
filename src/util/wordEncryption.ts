import FPE from "node-fpe";

// const fpe = require('node-fpe');
const cipher = FPE.fpe({
  secret: process.env.TARGET_WORD_FPE_SECRET,
  // domain is only lower-case letters
  domain: "abcdefghijklmnopqrstuvwxyz".split(""),
});

export const encryptWord = (word: string) => cipher.encrypt(word);
export const decryptWord = (word: string) => cipher.decrypt(word);
