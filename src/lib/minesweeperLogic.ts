import { Board, CellState, Difficulty, DifficultySettings } from '@/types';
export const DIFFICULTIES: Record<Difficulty, DifficultySettings> = {
  easy: { width: 9, height: 9, mines: 10 },
  medium: { width: 16, height: 16, mines: 40 },
  hard: { width: 30, height: 16, mines: 99 },
};
const getNeighbors = (x: number, y: number, width: number, height: number): { x: number; y: number }[] => {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = x + i;
      const newY = y + j;
      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        neighbors.push({ x: newX, y: newY });
      }
    }
  }
  return neighbors;
};
export const createBoard = (settings: DifficultySettings, firstClickX: number, firstClickY: number): Board => {
  const { width, height, mines } = settings;
  const board: Board = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      x,
      y,
      hasMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );
  // Place mines, avoiding the first click area
  let minesPlaced = 0;
  const firstClickNeighbors = getNeighbors(firstClickX, firstClickY, width, height);
  const safeZone = [{ x: firstClickX, y: firstClickY }, ...firstClickNeighbors].map(c => `${c.x},${c.y}`);
  while (minesPlaced < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (!board[y][x].hasMine && !safeZone.includes(`${x},${y}`)) {
      board[y][x].hasMine = true;
      minesPlaced++;
    }
  }
  // Calculate adjacent mines
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!board[y][x].hasMine) {
        const neighbors = getNeighbors(x, y, width, height);
        let mineCount = 0;
        for (const neighbor of neighbors) {
          if (board[neighbor.y][neighbor.x].hasMine) {
            mineCount++;
          }
        }
        board[y][x].adjacentMines = mineCount;
      }
    }
  }
  return board;
};
export const revealCell = (board: Board, x: number, y: number): Board => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const { width, height } = { width: newBoard[0].length, height: newBoard.length };
  const cell = newBoard[y][x];
  if (cell.isRevealed || cell.isFlagged) {
    return newBoard;
  }
  cell.isRevealed = true;
  if (cell.adjacentMines === 0 && !cell.hasMine) {
    const stack = [{ x, y }];
    const visited = new Set([`${x},${y}`]);
    while (stack.length > 0) {
      const current = stack.pop()!;
      const neighbors = getNeighbors(current.x, current.y, width, height);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        if (!visited.has(neighborKey)) {
          visited.add(neighborKey);
          const neighborCell = newBoard[neighbor.y][neighbor.x];
          if (!neighborCell.isFlagged && !neighborCell.isRevealed) {
            neighborCell.isRevealed = true;
            if (neighborCell.adjacentMines === 0) {
              stack.push(neighbor);
            }
          }
        }
      }
    }
  }
  return newBoard;
};
export const revealAllMines = (board: Board): Board => {
  return board.map(row =>
    row.map(cell => {
      if (cell.hasMine) {
        return { ...cell, isRevealed: true };
      }
      return cell;
    })
  );
};
export const checkWinCondition = (board: Board): boolean => {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.hasMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
};