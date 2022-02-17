import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  ModalProps,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { LOSS_LABELS, WIN_LABELS } from "../config";
import { getRandomStringFromList } from "../util";
import { CharSquare } from "./CharSquare";
import { GameOverActionBar, GameOverActionBarProps } from "./GameOverActionBar";

export interface GameOverModalProps
  extends Pick<ModalProps, "onClose" | "isOpen">,
    GameOverActionBarProps {
  isWin: boolean;
  targetWord: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = React.memo(
  ({
    isWin,
    onClose,
    isOpen,
    handlePrimaryClick,
    handleSecondaryClick,
    targetWord,
  }) => {
    const gameOverMessage = useMemo(
      () => getRandomStringFromList(isWin ? WIN_LABELS : LOSS_LABELS),
      [isWin]
    );

    return (
      <>
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          onEsc={onClose}
        >
          <ModalOverlay />
          <ModalContent m={4} pt={4} maxWidth="max-content">
            <ModalHeader display="flex" justifyContent="center" pb={1}>
              <Heading>{isWin ? "You Win!" : "You Lose!"}</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              alignItems="center"
              flexDirection="column"
              rowGap={3}
            >
              <Text textAlign="center">The word was</Text>
              <CharSquare
                guessResult={{
                  char: targetWord,
                  status: isWin ? "correct" : "not_in_word",
                }}
                textTransform="uppercase"
                width="fit-content"
                px={2}
              />
              <Text textAlign="center" fontStyle="italic">
                {gameOverMessage}
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <GameOverActionBar
                handlePrimaryClick={handlePrimaryClick}
                handleSecondaryClick={handleSecondaryClick}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);
