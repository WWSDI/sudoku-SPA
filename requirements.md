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

May need to use **react-transition-group**

- fill a row | col | blc
  - triggers a one time bc highlight animation
    - Implementation:
      - use state?

### states

**board**

```typescript
[{
  i: 44, // cell index (range from 0 - 80)
  v: 5, //cell value
  type: 'auto' // 'auto' | 'user'
  error: false // boolean. true if cell value does NOT equal the solution value
}]
```

**hightlight**

```typescript
[
  {
    i: 55, // index
    backgroundColor: "skyblue", // 'red'|'skyblue'|null
    color: "red", //'red'|null
  },
];
```

## Architecture

- frontend
  - react
  - localstorage
- backend: fetching solution and generating puzzles
  - mongoose
  - mongodb
    - store 10,000 solutions
  - local: docker + mongodb
  - remote: Atlas + mongodb
- stripe (eventually)

## Todos

- [ ] add new game feature
  - [x] setup API server
    - [x] GET /puzzles
      - get 10 puzzles&solutions for each difficulty
    - [x] setup mongodb to store 10,000 solutions
  - [ ] save puzzles fetched from API in React, with localstorage 
- [ ] Auth0 / FB / Google
- [ ] PWA

### glossary

- game
  - solution: a completed board generated by my own algo
  - puzzle: a solution with certain cells filled with 0
    - easy: 40 0-value cells
    - medium: 50 0-value cells
    - hard: 60 0-value cells
- ac
  - active cell
  - highest highlight priority
- auto-filled cells
  - cells filled by computer to generate a puzzle
  - color: black
- user-filled cells
  - cells filled by user to solve a puzzel
  - color: deep blue
- hl
  - highlights
  - types & priority:
    1. success: darkgray // ⛔️
    2. ac: skyblue
    3. conflict: pink
    4. same number: darkgray
    5. sudoku: lightgray
  - implementation:
    - ? do I need to use state
      - it seems that to change css you should only

## 🌸 Refactor highlight and input number features

highlight

- [x] breakdown hl sudoku, same num and AC
- [x] use a new state to save sudoku so it can be used in multiple opeartions

input number

- [x] change order of logic to: upon **onClick** of numpad is triggered, immediately change **bd**, then useEffect trigger a change in **ac**
- [ ] add conflict: string[] property to CellType. This property helps to realise the highlightConflict feature
- [ ]

## Mongodb data

solutions collection document structure:
```json

{
  "solution": [
    4, 9, 7, 8, 2, 5, 3, 1, 6, 6, 2, 1, 4, 3, 7, 8, 9, 5, 8, 5, 3, 9, 1, 6, 4,
    7, 2, 2, 8, 5, 3, 6, 9, 7, 4, 1, 1, 6, 9, 5, 7, 4, 2, 3, 8, 3, 7, 4, 1, 8,
    2, 6, 5, 9, 9, 4, 2, 7, 5, 8, 1, 6, 3, 7, 3, 6, 2, 9, 1, 5, 8, 4, 5, 1, 8,
    6, 4, 3, 9, 2, 7
  ]
}
```
### 🐞🐞🐞 Bugs
- [] highlight conflict bug
  - if ac is in conflict, even after changing the num and resolving the conflict, ac is still highlighted
  - VERY HARD, don't know how to fix yet
  - **Possible solution:** extract the logic of useEffect() highlight part, and put that in a new action in reducer; use bdDispatch to perform the changing conflict state part, then use a single hlconflict() to light up all conflict cells  
- [x] win bug
  - user solved a puzzle, yet the solution is different than the stored solution, therefore, the win is not recognised 
    - **Solution**: need to run the validation algo instead to verify if it is correct instead of using the stored solution as it may not be the only solution
