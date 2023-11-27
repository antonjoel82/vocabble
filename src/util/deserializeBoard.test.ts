import { BoardResults } from "src/components/Board";
import { deserializeBoard } from "./deserializeBoard";

const FULL_BOARD: BoardResults = Array(6).fill([
  { char: "j", status: "NOT_IN_WORD" },
  { char: "a", status: "CORRECT" },
  { char: "d", status: "CORRECT" },
  { char: "e", status: "CORRECT" },
  { char: "d", status: "NOT_IN_WORD" },
]);

describe("deserializeBoard", () => {
  it("should deserialize a full board", () => {
    expect(
      deserializeBoard({
        serializedBoard: "jaded\njaded\njaded\njaded\njaded\njaded",
        guessLimit: 6,
        targetWord: "laden",
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
        guessLimit: 6,
        targetWord: "laden",
      })
    ).toEqual(board);
  });
});
