import React, { useEffect } from 'react';
import { GameHeader } from '@/components/minesweeper/GameHeader';
import { GameBoard } from '@/components/minesweeper/GameBoard';
import { GameControls } from '@/components/minesweeper/GameControls';
import { useGameStore } from '@/hooks/useGameStore';
import { Toaster, toast } from '@/components/ui/sonner';
import { motion } from 'framer-motion';
export function HomePage() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const resetGame = useGameStore((state) => state.resetGame);
  useEffect(() => {
    let toastId: string | number | undefined;
    if (gameStatus === 'won') {
      toastId = toast.success('You Win!', {
        description: 'You cleared all the water balloons!',
        duration: 5000,
        action: {
          label: 'Play Again',
          onClick: () => resetGame(),
        },
      });
    } else if (gameStatus === 'lost') {
      toastId = toast.error('Splash!', {
        description: 'You hit a water balloon!',
        duration: 5000,
        action: {
          label: 'Try Again',
          onClick: () => resetGame(),
        },
      });
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [gameStatus, resetGame]);
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-black -z-10" />
      <motion.div
        className="w-full max-w-max mx-auto flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-splash-blue text-balance">
            Minesweeper Splash
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            A playful twist on a classic game.
          </p>
        </header>
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg p-3 sm:p-4 md:p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 space-y-4 sm:space-y-6">
          <GameHeader />
          <GameBoard />
          <GameControls />
        </div>
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Built with ❤️ at Cloudflare</p>
        </footer>
      </motion.div>
      <Toaster richColors closeButton position="bottom-right" />
    </main>
  );
}