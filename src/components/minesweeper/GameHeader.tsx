import React from 'react';
import { Smile, Frown, Award, Bomb } from 'lucide-react';
import { useGameStore } from '@/hooks/useGameStore';
import { useShallow } from 'zustand/react/shallow';
import { motion } from 'framer-motion';
const NumberDisplay: React.FC<{ value: number }> = ({ value }) => (
  <div className="bg-gray-800 text-splash-red font-mono text-3xl sm:text-4xl px-3 py-1 rounded-lg shadow-inner">
    {String(value).padStart(3, '0')}
  </div>
);
export const GameHeader: React.FC = () => {
  const { mineCount, flagCount, timer, gameStatus, resetGame } = useGameStore(
    useShallow((state) => ({
      mineCount: state.mineCount,
      flagCount: state.flagCount,
      timer: state.timer,
      gameStatus: state.gameStatus,
      resetGame: state.resetGame,
    }))
  );
  const minesLeft = mineCount - flagCount;
  const getSmiley = () => {
    switch (gameStatus) {
      case 'playing':
      case 'ready':
        return <Smile className="w-10 h-10 text-splash-yellow" />;
      case 'lost':
        return <Frown className="w-10 h-10 text-splash-yellow" />;
      case 'won':
        return <Award className="w-10 h-10 text-splash-yellow" />;
      default:
        return <Smile className="w-10 h-10 text-splash-yellow" />;
    }
  };
  return (
    <div className="w-full bg-splash-blue/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl flex justify-between items-center shadow-lg border-2 border-blue-400">
      <div className="flex items-center gap-2">
        <Bomb className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        <NumberDisplay value={minesLeft} />
      </div>
      <motion.button
        onClick={resetGame}
        className="bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-splash-yellow focus:ring-offset-2 focus:ring-offset-splash-blue"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        {getSmiley()}
      </motion.button>
      <NumberDisplay value={timer} />
    </div>
  );
};