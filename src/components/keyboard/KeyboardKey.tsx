import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { KeyStatus } from "./KeyStatus";

// TODO switch to theme
const getColorsFromStatus = (
  status: KeyStatus
): { bgColor: string; fontColor: string } => {
  switch (status) {
    case "CORRECT":
      return {
        bgColor: "#6aaa64", // green
        fontColor: "#fff",
      };
    case "WRONG_POSITION":
      return {
        bgColor: "#c9b458", // yellow
        fontColor: "#fff",
      };
    case "NOT_IN_WORD":
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
  ({ status }) => {
    const { bgColor, fontColor } = getColorsFromStatus(status);
    return `
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
      font-weight: bold;
      border-radius: 4px;
      padding-inline-start: 0;
      padding-inline-end: 0;

      min-width: 26px;
      padding: 1rem 0.5rem;

      text-transform: uppercase;
      background-color: ${bgColor};
      color: ${fontColor};
      font-weight: bold;
      font-size: 0.8rem;

      :active {
        background-color: ${bgColor};
        outline: none;
        box-shadow: none;
      }

      :hover:not(:disabled) {
        background-color: ${bgColor};
        box-shadow: var(--chakra-shadows-outline);
      }

      :hover:disabled {
        background-color: ${bgColor};
      }
    `;
  }
);

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
