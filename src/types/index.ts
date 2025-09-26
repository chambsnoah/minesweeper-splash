export type CellState = {
  x: number;
  y: number;
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};
export type Board = CellState[][];
export type GameStatus = 'playing' | 'won' | 'lost' | 'ready';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type DifficultySettings = {
  width: number;
  height: number;
  mines: number;
};