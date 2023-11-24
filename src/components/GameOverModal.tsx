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
  Collapse,
  Box,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { WordInfo } from "src/types";
import { LOSS_LABELS, WIN_LABELS } from "../config";
import { getRandomStringFromList } from "../util";
import { GameOverActionBar, GameOverActionBarProps } from "./GameOverActionBar";
import { WordInfoToggleButton } from "./WordInfoToggleButton";
export interface GameOverModalProps
  extends Pick<ModalProps, "onClose" | "isOpen">,
    GameOverActionBarProps {
  hasWon: boolean;
  targetWordInfo: WordInfo;
}

export const GameOverModal: React.FC<GameOverModalProps> = React.memo(
  ({
    hasWon: isWin,
    onClose,
    isOpen,
    handlePrimaryClick,
    handleSecondaryClick,
    targetWordInfo,
  }) => {
    const [shouldShowDefinition, setShouldShowDefinition] =
      React.useState(false);
    const handleToggle = () => setShouldShowDefinition((show) => !show);

    const gameOverMessage = useMemo(
      () => getRandomStringFromList(isWin ? WIN_LABELS : LOSS_LABELS),
      [isWin]
    );

    return (
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        onEsc={onClose}
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent m={4} pt={4}>
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
            <Text textAlign="center" fontStyle="italic">
              {gameOverMessage}
            </Text>
            <Text textAlign="center">The word was</Text>
            <WordInfoToggleButton
              isWin={isWin}
              wordInfo={targetWordInfo}
              toggleLabel={`Click to ${
                shouldShowDefinition ? "hide" : "show"
              } definition(s)`}
              onClick={handleToggle}
              mb={2}
            />
            <Collapse in={shouldShowDefinition}>
              <Box
                border={"2px"}
                borderStyle="solid"
                p={2}
                px={3}
                borderColor="gray"
                overflowY="scroll"
                maxHeight="40vh"
              >
                <Text wordBreak="break-word">{targetWordInfo.definition}</Text>
              </Box>
            </Collapse>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <GameOverActionBar
              handlePrimaryClick={handlePrimaryClick}
              handleSecondaryClick={handleSecondaryClick}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);
