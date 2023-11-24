import * as React from "react";

interface WordEntryProps {
  maxLength: number;
  submitGuess: (guess: string) => void;
  disabled?: boolean;
}

export const WordEntry: React.FC<WordEntryProps> = ({
  submitGuess,
  maxLength,
  disabled,
}) => {
  const inputRef = React.useRef(null);

  const handleSubmit = (guess: string) => {
    submitGuess(guess.toLocaleLowerCase());
    inputRef.current.value = "";
  };

  return (
    <input
      type="text"
      ref={inputRef}
      disabled={disabled}
      maxLength={maxLength}
      onSubmit={({ currentTarget }) => handleSubmit(currentTarget.value)}
      onKeyDown={({ key, currentTarget }) => {
        if (key === "Enter") {
          handleSubmit(currentTarget.value);
        }
      }}
    />
  );
};
