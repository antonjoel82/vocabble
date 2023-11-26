import { GameStateSelector } from "src/types/GameStateSelector";

export const selectCurrentGuess: GameStateSelector<string> = ({
  board,
  currentGuessCount,
}) => {
  // Once the user has exceeded the guess limit, there is no current guess
  if (currentGuessCount >= board.length) {
    return "";
  }

  const guessRow = board[currentGuessCount];
  return guessRow
    .map(({ char }) => char)
    .join("")
    .trim();
};
