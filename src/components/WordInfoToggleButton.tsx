import { Button, ButtonProps, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { WordInfo } from "src/types";
import { CharSquare } from "./CharSquare";

const WrapperButton = styled(Button)<ButtonProps>(
  (_props) => `
  display: flex;
  flex-direction: column;
  background: none;
  padding: 0;
  
  :active, :hover, :focus-visible, :focus {
    background: none;
    outline: none;
    box-shadow: none;
  }
`
);

export interface WordInfoToggleButtonProps extends ButtonProps {
  wordInfo: WordInfo;
  isWin: boolean;
  toggleLabel: string;
}

export const WordInfoToggleButton: FC<WordInfoToggleButtonProps> = ({
  wordInfo,
  isWin,
  toggleLabel,
  ...buttonProps
}) => {
  return (
    <WrapperButton {...buttonProps}>
      <CharSquare
        guessResult={{
          char: wordInfo.word,
          status: isWin ? "CORRECT" : "NOT_IN_WORD",
        }}
        textTransform="uppercase"
        width="fit-content"
        px={2}
      />
      <Text
        fontSize="xs"
        textAlign="center"
        fontWeight="light"
        fontStyle="italic"
        paddingTop={1}
      >
        {toggleLabel}
      </Text>
    </WrapperButton>
  );
};
