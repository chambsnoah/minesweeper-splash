import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Board, Difficulty, GameStatus, DifficultySettings } from '@/types';
import { createBoard, revealCell, checkWinCondition, revealAllMines, DIFFICULTIES } from '@/lib/minesweeperLogic';
type GameState = {
  difficulty: Difficulty;
  settings: DifficultySettings;
  board: Board;
  gameStatus: GameStatus;
  mineCount: number;
  flagCount: number;
  timer: number;
  isFirstClick: boolean;
  timerInterval: number | null;
};
type GameActions = {
  setDifficulty: (difficulty: Difficulty) => void;
  initGame: () => void;
  handleLeftClick: (x: number, y: number) => void;
  handleRightClick: (x: number, y: number) => void;
  resetGame: () => void;
  startGameTimer: () => void;
  stopGameTimer: () => void;
  tick: () => void;
};
const createEmptyBoard = (settings: DifficultySettings): Board => {
  return Array.from({ length: settings.height }, (_, y) =>
    Array.from({ length: settings.width }, (_, x) => ({
      x,
      y,
      hasMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );
};
export const useGameStore = create<GameState & GameActions>()(
  immer((set, get) => ({
    difficulty: 'easy',
    settings: DIFFICULTIES.easy,
    board: createEmptyBoard(DIFFICULTIES.easy),
    gameStatus: 'ready',
    mineCount: DIFFICULTIES.easy.mines,
    flagCount: 0,
    timer: 0,
    isFirstClick: true,
    timerInterval: null,
    setDifficulty: (difficulty) => {
      get().stopGameTimer();
      const newSettings = DIFFICULTIES[difficulty];
      set({
        difficulty: difficulty,
        settings: newSettings,
        mineCount: newSettings.mines,
        board: createEmptyBoard(newSettings),
        gameStatus: 'ready',
        flagCount: 0,
        timer: 0,
        isFirstClick: true,
      });
    },
    initGame: () => {
      get().stopGameTimer();
      set(state => ({
        board: createEmptyBoard(state.settings),
        gameStatus: 'ready',
        flagCount: 0,
        timer: 0,
        isFirstClick: true,
      }));
    },
    handleLeftClick: (x, y) => {
      if (get().gameStatus === 'won' || get().gameStatus === 'lost') return;
      if (get().board[y][x].isFlagged) return;
      if (get().isFirstClick) {
        set((state) => {
          state.board = createBoard(state.settings, x, y);
          state.isFirstClick = false;
          state.gameStatus = 'playing';
          state.startGameTimer();
        });
      }
      const currentBoard = get().board;
      const cell = currentBoard[y][x];
      if (cell.hasMine) {
        set((state) => {
          state.stopGameTimer();
          state.gameStatus = 'lost';
          state.board = revealAllMines(currentBoard);
        });
        return;
      }
      const newBoard = revealCell(currentBoard, x, y);
      if (checkWinCondition(newBoard)) {
        get().stopGameTimer();
        set((state) => {
          state.gameStatus = 'won';
          // Flag all remaining mines on the newly updated board
          state.board = newBoard.map(row => row.map(cell => cell.hasMine ? { ...cell, isFlagged: true } : cell));
          state.flagCount = state.mineCount;
        });
      } else {
        set({ board: newBoard });
      }
    },
    handleRightClick: (x, y) => {
      if (get().gameStatus === 'won' || get().gameStatus === 'lost') return;
      if (get().isFirstClick) return;
      const cell = get().board[y][x];
      if (cell.isRevealed) return;
      set((state) => {
        const targetCell = state.board[y][x];
        if (targetCell.isFlagged) {
          targetCell.isFlagged = false;
          state.flagCount--;
        } else {
          if (state.flagCount < state.mineCount) {
            targetCell.isFlagged = true;
            state.flagCount++;
          }
        }
      });
    },
    resetGame: () => {
      get().initGame();
    },
    startGameTimer: () => {
      get().stopGameTimer();
      const interval = setInterval(() => {
        get().tick();
      }, 1000);
      set({ timerInterval: interval as unknown as number });
    },
    stopGameTimer: () => {
      const { timerInterval } = get();
      if (timerInterval) {
        clearInterval(timerInterval);
        set({ timerInterval: null });
      }
    },
    tick: () => {
      set((state) => {
        state.timer += 1;
      });
    },
  }))
);