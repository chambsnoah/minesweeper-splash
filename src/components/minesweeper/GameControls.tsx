import React from 'react';
import { useGameStore } from '@/hooks/useGameStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/types';
const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
export const GameControls: React.FC = () => {
  const { difficulty, setDifficulty } = useGameStore(
    useShallow((state) => ({
      difficulty: state.difficulty,
      setDifficulty: state.setDifficulty,
    }))
  );
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 p-2 bg-splash-blue/50 rounded-xl">
      {difficulties.map((d) => (
        <Button
          key={d}
          onClick={() => setDifficulty(d)}
          className={cn(
            'capitalize font-bold text-base sm:text-lg px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800',
            difficulty === d
              ? 'bg-splash-yellow text-blue-900 shadow-lg scale-105 ring-2 ring-white'
              : 'bg-splash-blue text-white hover:bg-blue-600'
          )}
        >
          {d}
        </Button>
      ))}
    </div>
  );
};