import { Flex } from "@chakra-ui/react";
import React from "react";
import { FiDelete } from "react-icons/fi";
import { KeyboardBaseProps } from "../../types";

import { CharGuessStatus } from "../WordleGame";
import { KEYBOARD_CHARS } from "./ constants";
import { KeyboardKeyProps } from "./KeyboardKey";
import { KeyboardRow } from "./KeyboardRow";

export interface WordleKeyboardProps extends KeyboardBaseProps {
  keyStatusMap: { [keyChar: string]: CharGuessStatus };
}

export const WordleKeyboard: React.FC<WordleKeyboardProps> = ({
  keyStatusMap,
  handleAddChar,
  handleSubmit,
  handleBackspace,
  canSubmit,
  canBackspace,
}) => {
  const backspaceKeyConfig: KeyboardKeyProps = {
    label: <FiDelete size="1.5rem" />,
    status: "default",
    handleClick: handleBackspace,
    isDisabled: !canBackspace,
  };

  const enterKeyConfig: KeyboardKeyProps = {
    label: "enter",
    status: "default",
    handleClick: handleSubmit,
    isDisabled: !canSubmit,
  };

  return (
    <Flex justifyContent="center" direction="column" rowGap={2}>
      {KEYBOARD_CHARS.map((charRow, rowIndex) => {
        const keyConfigs: KeyboardKeyProps[] = charRow.map((char) => ({
          label: char,
          status: keyStatusMap[char] ?? "default",
          handleClick: () => {
            handleAddChar(char);
          },
          isDisabled: false,
        }));

        // for the bottom row of the keyboard, add control buttons
        if (rowIndex === KEYBOARD_CHARS.length - 1) {
          keyConfigs.unshift(enterKeyConfig); // add on left
          keyConfigs.push(backspaceKeyConfig); // add on right: ;
        }

        return (
          <KeyboardRow
            key={`keyboard-row-${rowIndex}`}
            keyConfigs={keyConfigs}
          />
        );
      })}
    </Flex>
  );
};
