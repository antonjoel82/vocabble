import { BOARD_UID_DELIMITER } from "src/config";
import { decryptWord } from ".";
import { getValidatedBoardDims } from "../getValidatedBoardDims";

export interface BoardConfigParams {
  targetWord: string;
  guessLimit: number;
}

export const parseBoardUid = (
  boardUid: string,
  delim: string = BOARD_UID_DELIMITER
): BoardConfigParams => {
  const [guessLimitStr, encryptedTarget] = boardUid.split(delim);

  const { guessLimit, wordLength } = getValidatedBoardDims(
    guessLimitStr,
    String(encryptedTarget.length ?? "")
  );
  if (guessLimit !== +guessLimitStr) {
    const errorMessage = `guessLimit (${guessLimitStr}) is invalid`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  if (wordLength !== encryptedTarget?.length) {
    const errorMessage = `encryptedTarget (${encryptedTarget}) is invalid`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return {
    guessLimit: +guessLimitStr,
    targetWord: decryptWord(encryptedTarget),
  };
};
