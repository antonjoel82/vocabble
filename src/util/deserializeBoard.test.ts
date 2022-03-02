import { BoardResults } from "src/components/Board";
import { deserializeBoard } from "./deserializeBoard";

const FULL_BOARD: BoardResults = Array(6).fill([
  { char: "j" },
  { char: "a" },
  { char: "d" },
  { char: "e" },
  { char: "d" },
]);

describe("deserializeBoard", () => {
  it("should deserialize a full board", () => {
    expect(
      deserializeBoard({
        serializedBoard: "jaded\njaded\njaded\njaded\njaded\njaded",
        numGuesses: 6,
        wordLength: 5,
      })
    ).toEqual(FULL_BOARD);
  });

  it("should deserialize a partial board", () => {
    const board = FULL_BOARD.slice(0, 3).concat([
      [{ char: "h" }, { char: "e" }, { char: "l" }, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ]);

    expect(
      deserializeBoard({
        serializedBoard: "jaded\njaded\njaded\nhel",
        numGuesses: 6,
        wordLength: 5,
      })
    ).toEqual(board);
  });
});
