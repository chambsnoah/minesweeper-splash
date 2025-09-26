import React from 'react';
import { useGameStore } from '@/hooks/useGameStore';
import { GameCell } from './GameCell';
import { motion, AnimatePresence } from 'framer-motion';
export const GameBoard: React.FC = () => {
  const board = useGameStore((state) => state.board);
  const settings = useGameStore((state) => state.settings);
  if (!board || board.length === 0) {
    return <div>Loading board...</div>;
  }
  const gridStyle = {
    gridTemplateColumns: `repeat(${settings.width}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${settings.height}, minmax(0, 1fr))`,
  };
  return (
    <div
      className="bg-board-bg p-2 sm:p-3 rounded-xl shadow-lg border-2 border-blue-300"
      onContextMenu={(e) => e.preventDefault()}
    >
      <motion.div
        layout
        className="grid gap-1"
        style={gridStyle}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <AnimatePresence>
          {board.flat().map((cell) => (
            <div key={`${cell.x}-${cell.y}`} className="aspect-square">
              <GameCell cell={cell} />
            </div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};