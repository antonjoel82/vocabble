import React, { FC } from "react";
import {
  NumberInput,
  NumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export interface NumberStepperProps extends NumberInputProps {
  handleChange: (val: number) => void;
}

export const NumberStepper: FC<NumberStepperProps> = ({
  handleChange,
  ...inputProps
}) => {
  return (
    <NumberInput
      clampValueOnBlur
      {...inputProps}
      onChange={(_, val) => handleChange(val)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
