# Sudoku Requirements

## Core features
- fill a cell:
  - click a cell (to activate)
  - bg highlights sudoku region (sudoku means the combination of row, col and blc)
    - if ac is filled, highlights all other num on the board
  - fill a num
    - [**Persistent**] bg highlights (**errors**) conflicting nums in the sudoku region
    - user filled cell () is colored differently than autofilled cells (**black**)

- complete a board:
  - all cells filled & no errors
    - change completedGame state to be true

### Animation ⛔️
- fill a row | col | blc
  - triggers a one time bc highlight animation
    - Implementation:
      - use state?



### glossary
- ac
  - active cell
  - highest highlight priority
- auto-filled cells
  - cells filled by computer to generate a puzzle
  - color: black
- user-filled cells
  - cells filled by user to solve a puzzel
  - color: deep blue
- 