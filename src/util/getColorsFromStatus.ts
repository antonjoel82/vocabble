import { KeyStatus } from "src/components/keyboard/KeyStatus";

// TODO switch to theme
export const getColorsFromStatus = (
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
