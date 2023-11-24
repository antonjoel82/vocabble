import { Flex, Button } from "@chakra-ui/react";
import React, { FC } from "react";

export interface GameOverActionBarProps {
  handlePrimaryClick: () => void;
  handleSecondaryClick: () => void;
  hasCopied: boolean;
}

export const GameOverActionBar: FC<GameOverActionBarProps> = ({
  handlePrimaryClick,
  handleSecondaryClick,
  hasCopied,
}) => {
  return (
    <Flex justifyContent="center" gap={3} width="100%">
      <Button
        flexBasis="100%"
        flexGrow={1}
        background="white"
        onClick={handleSecondaryClick}
        py={5}
        fontWeight="bold"
        color="green"
        border="2px solid green"
      >
        Play again
      </Button>
      <Button
        flexBasis="100%"
        flexGrow={1}
        background="green"
        onClick={handlePrimaryClick}
        py={5}
        fontWeight="bold"
        color="white"
        border="2px solid green"
      >
        {hasCopied ? "Copied!" : "Share"}
      </Button>
    </Flex>
  );
};
