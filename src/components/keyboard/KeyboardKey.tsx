import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { KeyStatus } from "./KeyStatus";

// TODO switch to theme
const getColorsFromStatus = (
  status: KeyStatus
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
        bgColor: "#787c7e", // dark gray
        fontColor: "#fff",
      };
    case "default":
    default:
      return {
        bgColor: "#d8d8d8", // light gray
        fontColor: "#000",
      };
  }
};

// TODO use theme, and change font size for desktop
const KeyboardButton = styled(Button)<ButtonProps & { status: KeyStatus }>(
  ({ theme, status }) => {
    const { bgColor, fontColor } = getColorsFromStatus(status);
    return `
      display: grid;
      place-items: center;
      min-width: 10px !important;
      font-family: monospace;
      font-weight: bold;
      border-radius: 4px;

      text-transform: uppercase;
      background-color: ${bgColor};
      color: ${fontColor};
      font-size: 0.8rem;
    `;
  }
);
// padding-left: 0.5rem;
// padding-right: 0.5rem;

export interface KeyboardKeyProps {
  label: string | JSX.Element;
  status: KeyStatus;
  handleClick: () => void;
  isDisabled: boolean;
}

export const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  label,
  status,
  handleClick,
  isDisabled,
}) => {
  return (
    <KeyboardButton status={status} onClick={handleClick} disabled={isDisabled}>
      {label}
    </KeyboardButton>
  );
};
