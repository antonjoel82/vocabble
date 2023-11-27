import { GameStateSelector } from "src/types/GameStateSelector";

export const selectCurrentGuess: GameStateSelector<string> = ({
  board,
  currentGuessIndex,
}) => {
  // Once the user has exceeded the guess limit, there is no current guess
  if (currentGuessIndex >= board.length) {
    return "";
  }

  const guessRow = board[currentGuessIndex];
  return guessRow
    .map(({ char }) => char)
    .join("")
    .trim();
};
