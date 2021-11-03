export default function validateSolution(board: number[][]): boolean {
  //GOAL: test if all rows, columns, 9-cell blocks have the same elements as an array of 1-9
  const NumArr1_9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //TODO: function that test if two array are equal in terms of having the element value, but NOT element order
  let sameEls = (source: number[]) => (testArr: number[]) => {
    if (testArr.length !== source.length) return false;
    return testArr
      .slice()
      .sort()
      .every((el: number, i: number) => el === source[i]);
  };
  let sameNumArr1_9 = sameEls(NumArr1_9);

  //TODO: create columns board
  let board_cols: number[][] = [];
  board.forEach((row, i, arr) => {
    let col: number[] = [];
    row.forEach((_, j) => {
      col.push(arr[j][i]);
    });
    board_cols.push(col);
  });
  //TODO: create grids board
  let board_blocks = [];
  // n is increment on i; m is increment on j
  for (let n = 0; n < 3; n++) {
    for (let m = 0; m < 3; m++) {
      let block = [];
      for (let i = n * 3; i < 3 + n * 3; i++) {
        for (let j = m * 3; j < 3 + m * 3; j++) {
          block.push(board[i][j]);
        }
      }
      board_blocks.push(block);
    }
  }

  //TODO: check all rows, columns, 9-cell blocks are valid separately
  let validateAllRows = board.every((row) => sameNumArr1_9(row));
  let validateAllCols = board_cols.every((row) => sameNumArr1_9(row));
  let validateAllBlocks = board_blocks.every((row) => sameNumArr1_9(row));

  //TODO: based on 3 individual tests, return if the board is valid
  return [validateAllRows, validateAllCols, validateAllBlocks].every(
    (test) => test,
  );
}
