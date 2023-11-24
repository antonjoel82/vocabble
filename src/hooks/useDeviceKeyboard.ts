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
          console.log(`Handling a letter key press!`);
          handleAddChar(key);
          return;
        case "enter":
          console.log(`Handling a enter key press!`);
          if (canSubmit) {
            handleSubmit();
          }
          return;
        case "backspace":
          console.log(`Handling a backspace key press!`);
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
    console.log("Keyboard MOUNTING");
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
};
