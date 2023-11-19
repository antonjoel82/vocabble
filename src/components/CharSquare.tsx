import * as React from "react";
import styled from "@emotion/styled";
import { Box, BoxProps } from "@chakra-ui/react";
import { CharGuessStatus } from "./WordleGame";
import { WordleGuessResult } from "src/types";

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

const BoardBox = styled(Box)<BoxProps & { status: CharGuessStatus }>(
  ({ status, width }) => {
    const { bgColor, fontColor } = getColorsByStatus(status);
    return `
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      width: ${width ?? "3.3rem"};
      height: 3.3rem;
      font-weight: bolder;
      font-size: 2rem;
      border: 2px solid darkgray;
      box-sizing: border-box;

      background-color: ${bgColor};
      color: ${fontColor};
  `;
  }
);
export interface CharSquareProps extends BoxProps {
  guessResult: Partial<WordleGuessResult>;
  className?: string;
}

export const CharSquare: React.FC<CharSquareProps> = ({
  guessResult,
  ...boxProps
}) => {
  return (
    <BoardBox status={guessResult.status} {...boxProps}>
      {guessResult.char}
    </BoardBox>
  );
};
