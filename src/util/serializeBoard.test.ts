import { BoardResults } from "src/components/Board";
import { serializeBoard } from "./serializeBoard";

const FULL_BOARD: BoardResults = Array(6).fill([
  { char: "j", status: "not_in_word" },
  { char: "a", status: "correct" },
  { char: "d", status: "correct" },
  { char: "e", status: "correct" },
  { char: "d", status: "not_in_word" },
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
        { char: "h", status: "not_in_word" },
        { char: "e", status: "correct" },
        { char: "l", status: "correct" },
        {},
        {},
      ],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ]);
    expect(serializeBoard(board)).toEqual("jaded\njaded\njaded\nhel");
  });
});
