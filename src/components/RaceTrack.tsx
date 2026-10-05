import React from 'react';
import { Flag, Trophy } from 'lucide-react';

interface RaceTrackProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  character?: 'car' | 'rocket' | 'bee';
}

export const RaceTrack: React.FC<RaceTrackProps> = ({
  currentQuestionIndex,
  totalQuestions,
  score,
  character = 'car',
}) => {
  const charEmoji = character === 'rocket' ? '🚀' : character === 'bee' ? '🐝' : '🏎️';
  const progressPercent = Math.min(100, Math.round((currentQuestionIndex / totalQuestions) * 100));

  return (
    <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 rounded-3xl p-3 sm:p-4 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background clouds / stars */}
      <div className="absolute top-1 left-4 text-white/20 text-xl pointer-events-none select-none">☁️</div>
      <div className="absolute bottom-1 right-12 text-white/20 text-lg pointer-events-none select-none">✨</div>
      <div className="absolute top-2 right-1/3 text-white/20 text-sm pointer-events-none select-none">☁️</div>

      {/* Top status bar */}
      <div className="flex items-center justify-between mb-2 z-10 relative">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-sm">
            <span className="text-base sm:text-lg">🏁</span>
            <span>Chặng {Math.min(currentQuestionIndex + 1, totalQuestions)} / {totalQuestions}</span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-amber-200 hidden sm:inline-block">
            Đường đua bảng cộng 10
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full text-xs sm:text-sm shadow-md flex items-center gap-1.5 animate-pulse">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score} điểm</span>
          </div>
        </div>
      </div>

      {/* The Track */}
      <div className="relative mt-3 mb-1">
        {/* Asphalt road */}
        <div className="h-9 sm:h-11 bg-slate-800/90 rounded-2xl relative flex items-center px-3 border-2 border-white/30 shadow-inner overflow-hidden">
          {/* Dashed center lane line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-yellow-300/60 pointer-events-none" />

          {/* 15 checkpoint markers */}
          <div className="absolute inset-x-4 flex justify-between items-center pointer-events-none">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const isPassed = idx < currentQuestionIndex;
              const isCurrent = idx === currentQuestionIndex;
              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-black transition-all ${
                    isPassed
                      ? 'bg-emerald-400 text-emerald-950 scale-100 ring-1 ring-white'
                      : isCurrent
                      ? 'bg-amber-400 text-amber-950 ring-2 ring-white scale-125 shadow-lg'
                      : 'bg-slate-600 text-slate-300'
                  }`}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>

          {/* Moving racer vehicle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out transform -translate-x-1/2 z-20"
            style={{
              left: `${Math.max(4, Math.min(94, (currentQuestionIndex / totalQuestions) * 100))}%`,
            }}
          >
            <div className="relative text-2xl sm:text-3xl filter drop-shadow-md animate-bounce">
              {charEmoji}
              {/* Speed burst trail */}
              <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 text-xs opacity-75 animate-ping">
                💨
              </span>
            </div>
          </div>

          {/* Finish line flag at the end */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-yellow-300 filter drop-shadow">
            <Flag className="w-5 h-5 text-amber-300 animate-wiggle" />
          </div>
        </div>
      </div>

      {/* Progress percentage bar */}
      <div className="flex items-center justify-between text-[11px] font-bold text-white/90 px-1 mt-1">
        <span>Khởi hành 🚦</span>
        <span>Tiến độ: {progressPercent}%</span>
        <span>Đích đến 🏆</span>
      </div>
    </div>
  );
};
