import { BoardResults } from "src/components/Board";
import { serializeBoard } from "./serializeBoard";

const FULL_BOARD: BoardResults = Array(6).fill([
  { char: "j", status: "NOT_IN_WORD" },
  { char: "a", status: "CORRECT" },
  { char: "d", status: "CORRECT" },
  { char: "e", status: "CORRECT" },
  { char: "d", status: "NOT_IN_WORD" },
]);

describe("serializeBoard", () => {
  it("should serialize a full board", () => {
    expect(serializeBoard(FULL_BOARD)).toEqual(
      "jaded\njaded\njaded\njaded\njaded\njaded"
    );
  });

  it("should serialize a partial board", () => {
    const board = FULL_BOARD.slice(0, 3).concat([
      [
        { char: "h", status: "NOT_IN_WORD" },
        { char: "e", status: "CORRECT" },
        { char: "l", status: "CORRECT" },
        {},
        {},
      ],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ]);
    expect(serializeBoard(board)).toEqual("jaded\njaded\njaded\nhel");
  });
});
