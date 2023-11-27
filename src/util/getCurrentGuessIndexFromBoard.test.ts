import { BoardResults } from "src/components/Board";
import { getCurrentGuessIndexFromBoard } from "./getCurrentGuessIndexFromBoard";

const FULL_BOARD: BoardResults = Array(6).fill([
  { char: "j", status: "NOT_IN_WORD" },
  { char: "a", status: "CORRECT" },
  { char: "d", status: "CORRECT" },
  { char: "e", status: "CORRECT" },
  { char: "d", status: "NOT_IN_WORD" },
]);

describe("getCurrentGuessIndexFromBoard", () => {
  it("should return board length from a full board", () => {
    expect(getCurrentGuessIndexFromBoard(FULL_BOARD)).toEqual(6);
  });

  it("should return the next empty row for a partial board", () => {
    const board = FULL_BOARD.slice(0, 3).concat([
      [
        { char: "w", status: "CORRECT" },
        { char: "a", status: "CORRECT" },
        { char: "d", status: "CORRECT" },
        { char: "e", status: "CORRECT" },
        { char: "r", status: "NOT_IN_WORD" },
      ],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ]);
    expect(getCurrentGuessIndexFromBoard(board)).toEqual(4);
  });

  it("should return the index of the partially-completed row", () => {
    const board: BoardResults = FULL_BOARD.slice(0, 1).concat([
      [
        { char: "w", status: "CORRECT" },
        { char: "a", status: "CORRECT" },
        { char: "d", status: "CORRECT" },
        {},
        {},
      ],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ]);
    expect(getCurrentGuessIndexFromBoard(board)).toEqual(1);
  });

  it("should return 0 for an empty board", () => {
    const board: BoardResults = [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
    ];
    expect(getCurrentGuessIndexFromBoard(board)).toEqual(0);
  });
});
