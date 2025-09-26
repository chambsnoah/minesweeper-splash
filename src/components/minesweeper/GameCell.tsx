import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Bomb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CellState } from '@/types';
import { useGameStore } from '@/hooks/useGameStore';
interface GameCellProps {
  cell: CellState;
}
const numberColors = [
  'text-blue-500',    // 1
  'text-green-500',   // 2
  'text-red-500',     // 3
  'text-purple-700',  // 4
  'text-orange-600',  // 5
  'text-teal-500',    // 6
  'text-black',       // 7
  'text-gray-500',    // 8
];
export const GameCell: React.FC<GameCellProps> = React.memo(({ cell }) => {
  const handleLeftClick = useGameStore(state => state.handleLeftClick);
  const handleRightClick = useGameStore(state => state.handleRightClick);
  const gameStatus = useGameStore(state => state.gameStatus);
  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameStatus === 'playing' || gameStatus === 'ready') {
      handleRightClick(cell.x, cell.y);
    }
  };
  const onClick = () => {
    if (gameStatus === 'playing' || gameStatus === 'ready') {
      handleLeftClick(cell.x, cell.y);
    }
  };
  const renderContent = () => {
    if (cell.isRevealed) {
      if (cell.hasMine) {
        return <Bomb className="w-full h-full text-splash-blue p-1" />;
      }
      if (cell.adjacentMines > 0) {
        return (
          <span className={cn('font-bold text-2xl', numberColors[cell.adjacentMines - 1])}>
            {cell.adjacentMines}
          </span>
        );
      }
    } else if (cell.isFlagged) {
      return <Flag className="w-full h-full text-splash-red p-1.5" />;
    }
    return null;
  };
  const isInteractable = gameStatus === 'playing' || gameStatus === 'ready';
  return (
    <motion.div
      className={cn(
        'w-full h-full flex items-center justify-center rounded-md sm:rounded-lg select-none font-display',
        cell.isRevealed
          ? 'bg-blue-200/50 dark:bg-slate-700 shadow-inner'
          : 'bg-splash-blue hover:bg-blue-500 cursor-pointer shadow-md',
        isInteractable && !cell.isRevealed && 'transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95'
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        key={`${cell.isRevealed}-${cell.isFlagged}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full flex items-center justify-center"
      >
        {renderContent()}
      </motion.div>
    </motion.div>
  );
});