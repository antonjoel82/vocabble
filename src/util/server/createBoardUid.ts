import { BOARD_UID_DELIMITER } from "src/config";
import { encryptWord } from ".";

export const createBoardUid = (
  targetWord: string,
  guessLimit: number,
  delim: string = BOARD_UID_DELIMITER
) => `${guessLimit}${delim}${encryptWord(targetWord)}`;
