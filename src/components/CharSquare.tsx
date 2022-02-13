import * as React from "react";
import styled from "@emotion/styled";
import { Box, BoxProps } from "@chakra-ui/react";
import { CharGuessResult, CharGuessStatus } from "./WordleGame";

// .charGuess {

// }

// .guess-correct {
//   background-color: green;
// }

// .guess-wrong_position {
//   background-color: goldenrod;
// }

// .guess-not_in_word {
//   background-color: gray;
// }

// const getColorByStatus = (status?: CharGuessStatus) => {
//   switch (status) {
//     case "correct":
//       return "";
//     case "wrong_position":
//       return "goldenrod";
//     case "not_in_word":
//       return "gray";
//     default:
//       return "white";
//   }
// };

const getColorsByStatus = (
  status?: CharGuessStatus
): { bgColor: string; fontColor: string } => {
  switch (status) {
    case "correct":
      return {
        bgColor: "#6aaa64", // green
        fontColor: "#fff",
      };
    case "wrong_position":
      return {
        bgColor: "#c9b458", // yellow
        fontColor: "#fff",
      };
    case "not_in_word":
      return {
        bgColor: "gray", // dark gray
        fontColor: "#fff",
      };
    default:
      return {
        bgColor: "#fff", // light gray
        fontColor: "#000",
      };
  }
};

// width: 100%;
// display: inline-flex;
// justify-content: center;
// align-items: center;
// font-size: 2rem;
// line-height: 2rem;
// font-weight: bold;
// vertical-align: middle;
// text-transform: uppercase;

const BoardBox = styled(Box)<BoxProps | { status: CharGuessStatus }>(
  ({ status }) => {
    const { bgColor, fontColor } = getColorsByStatus(status);
    return `
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      width: 3.5rem;
      height: 3.5rem;
      font-weight: bolder;
      font-size: 2rem;
      border: 2px solid darkgray;
      box-sizing: border-box;

      background-color: ${bgColor};
      color: ${fontColor};
  `;
  }
);
// width: 2rem;
// height: 2rem;
interface CharSquareProps {
  guessResult: Partial<CharGuessResult>;
}

export const CharSquare: React.FC<CharSquareProps> = ({ guessResult }) => {
  return <BoardBox status={guessResult.status}>{guessResult.char}</BoardBox>;
};
