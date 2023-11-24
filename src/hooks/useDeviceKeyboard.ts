import { useCallback, useEffect } from "react";
import { KeyboardBaseProps } from "../types";
import { getDeviceKeyType } from "src/util";

export const useDeviceKeyboard = ({
  handleAddChar,
  handleBackspace,
  handleSubmit,
  canBackspace,
  canSubmit,
}: KeyboardBaseProps) => {
  const handleUserKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      const keyType = getDeviceKeyType(key);
      if (!keyType) {
        return;
      }

      switch (keyType) {
        case "letter":
          handleAddChar(key);
          return;
        case "enter":
          if (canSubmit) {
            handleSubmit();
          }
          return;
        case "backspace":
          if (canBackspace) {
            handleBackspace();
          }
          return;
        default:
          return;
      }
    },
    [handleAddChar, handleBackspace, handleSubmit, canBackspace, canSubmit]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
};
