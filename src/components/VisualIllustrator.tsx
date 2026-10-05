import React, { useState, useEffect } from 'react';
import { VisualData } from '../types';
import { sounds } from '../utils/sound';
import { Sparkles, Hand } from 'lucide-react';

interface VisualIllustratorProps {
  visualData: VisualData;
  questionId: number;
}

export const VisualIllustrator: React.FC<VisualIllustratorProps> = ({ visualData, questionId }) => {
  const [countedIndices, setCountedIndices] = useState<Set<number>>(new Set());

  // Reset counted items on new question
  useEffect(() => {
    setCountedIndices(new Set());
  }, [questionId]);

  const handleItemClick = (index: number) => {
    const next = new Set(countedIndices);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
      sounds.playCount(next.size);
    }
    setCountedIndices(next);
  };

  // Special rendering for Question 6: 3 calculations on flowers
  if (visualData.type === 'calculation_flowers' && visualData.showCalculations) {
    return (
      <div className="bg-amber-50/80 border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-inner">
        <div className="flex items-center justify-between mb-3 text-amber-800 text-sm font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            Vườn hoa phép tính (Mỗi bông hoa là một phép cộng):
          </span>
          <span className="bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold">
            Mục tiêu: Kết quả = 8
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {visualData.showCalculations.map((calc, idx) => {
            const isTarget = calc.includes('= 8');
            const [expr, res] = calc.split('=');
            return (
              <div
                key={idx}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  isTarget
                    ? 'bg-rose-50 border-rose-300 shadow-md'
                    : 'bg-white border-yellow-200 shadow-sm'
                }`}
              >
                <div className="text-4xl sm:text-5xl mb-1 filter drop-shadow">
                  {idx === 0 ? '🌻' : idx === 1 ? '🌷' : '🌺'}
                </div>
                <div className="text-lg font-black text-slate-800 font-mono tracking-wide">
                  {expr.trim()}
                </div>
                <div className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full mt-1">
                  kết quả: {res.trim()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Question 7: 3 butterflies + missing slots to make 7
  if (visualData.type === 'butterfly' && visualData.leftCount && visualData.rightCount) {
    return (
      <div className="bg-emerald-50/90 border-2 border-emerald-200 rounded-3xl p-4 sm:p-5 shadow-inner">
        <div className="flex items-center justify-between mb-3 text-emerald-800 text-xs sm:text-sm font-bold">
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            {visualData.description}
          </span>
          <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
            Cần đủ 7 bạn bướm
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-2">
          {/* 3 existing butterflies */}
          <div className="flex gap-1.5 sm:gap-2 bg-white/80 p-2.5 rounded-2xl border border-emerald-200">
            {Array.from({ length: visualData.leftCount }).map((_, i) => (
              <button
                key={`left-${i}`}
                onClick={() => handleItemClick(i)}
                className={`relative text-3xl sm:text-4xl transition-transform active:scale-90 hover:scale-110 p-1 rounded-xl ${
                  countedIndices.has(i) ? 'bg-emerald-100 ring-2 ring-emerald-400' : ''
                }`}
                title="Bấm để đếm"
              >
                🦋
                {countedIndices.has(i) && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                )}
              </button>
            ))}
          </div>

          <span className="text-2xl sm:text-3xl font-black text-emerald-700">+</span>

          {/* 4 missing slots */}
          <div className="flex gap-1.5 sm:gap-2 bg-white/80 p-2.5 rounded-2xl border-2 border-dashed border-emerald-300">
            {Array.from({ length: visualData.rightCount }).map((_, i) => (
              <div
                key={`missing-${i}`}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-dashed border-emerald-400 rounded-xl flex items-center justify-center bg-emerald-50/50 text-emerald-600 font-extrabold text-sm sm:text-base animate-pulse"
              >
                ?
              </div>
            ))}
          </div>

          <span className="text-2xl sm:text-3xl font-black text-emerald-700">=</span>

          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            7
          </div>
        </div>

        <p className="text-center text-xs text-emerald-700 font-medium mt-1">
          💡 Chạm vào hình để đếm số lượng nhé!
        </p>
      </div>
    );
  }

  // Question 15: Bee needs 10 flowers, currently has 8, needs ? more
  if (questionId === 15 && visualData.leftCount && visualData.rightCount) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-4 sm:p-5 shadow-inner">
        <div className="flex items-center justify-between mb-2 text-amber-900 text-xs sm:text-sm font-bold">
          <span className="flex items-center gap-1.5">
            <span className="text-xl">🐝</span>
            Giỏ hoa của bạn Ong (Cần đủ 10 bông hoa):
          </span>
          <span className="bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold">
            Đã có: 8 | Còn thiếu: ?
          </span>
        </div>

        <div className="bg-white/90 p-3 sm:p-4 rounded-2xl border border-yellow-200 my-2">
          {/* 10 slots showing 8 present flowers and 2 empty targets */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 place-items-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={`have-${i}`}
                onClick={() => handleItemClick(i)}
                className={`relative text-3xl sm:text-4xl p-1 rounded-xl transition-transform hover:scale-110 active:scale-95 ${
                  countedIndices.has(i) ? 'bg-amber-100 ring-2 ring-amber-400' : ''
                }`}
                title="Bấm để đếm"
              >
                🌸
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </button>
            ))}

            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={`need-${i}`}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-dashed border-rose-400 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 font-black text-sm animate-bounce"
                title="Còn thiếu"
              >
                ?
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-amber-800">
          <span>8 bông hoa</span>
          <span>+</span>
          <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-lg border border-rose-300">
            ? bông hoa
          </span>
          <span>=</span>
          <span className="px-2.5 py-0.5 bg-amber-500 text-white rounded-lg shadow-sm">
            10 bông hoa
          </span>
        </div>
      </div>
    );
  }

  // Standard visual illustration with leftCount + rightCount
  const leftCount = visualData.leftCount || 0;
  const rightCount = visualData.rightCount || 0;
  const leftEmoji = visualData.leftEmoji || '⭐';
  const rightEmoji = visualData.rightEmoji || leftEmoji;

  let overallCounter = 0;

  return (
    <div className="bg-sky-50/80 border-2 border-sky-200 rounded-3xl p-3 sm:p-5 shadow-inner">
      <div className="flex items-center justify-between mb-2 text-sky-900 text-xs sm:text-sm font-bold">
        <span className="flex items-center gap-1.5 truncate">
          <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
          <span className="truncate">{visualData.description}</span>
        </span>
        <span className="flex items-center gap-1 text-[11px] sm:text-xs text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full shrink-0">
          <Hand className="w-3 h-3" /> Chạm để đếm
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-2">
        {/* Left Group */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white/90 p-2 sm:p-3 rounded-2xl border border-sky-100 shadow-sm max-w-[46%]">
          {Array.from({ length: leftCount }).map((_, i) => {
            const itemIdx = overallCounter++;
            const isCounted = countedIndices.has(itemIdx);
            return (
              <button
                key={`left-${i}`}
                onClick={() => handleItemClick(itemIdx)}
                className={`relative text-3xl sm:text-4xl p-1 rounded-xl transition-all duration-150 transform hover:scale-125 active:scale-90 ${
                  isCounted ? 'bg-sky-100 ring-2 ring-sky-400 scale-110' : ''
                }`}
                title={`Đếm vật phẩm ${i + 1}`}
              >
                {leftEmoji}
                {isCounted && (
                  <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {itemIdx + 1}
                  </span>
                )}
              </button>
            );
          })}
          <div className="w-full text-center text-xs font-black text-sky-700 mt-0.5">
            {leftCount}
          </div>
        </div>

        {/* Plus Symbol */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-400 text-amber-950 font-black text-xl sm:text-2xl flex items-center justify-center shadow-md animate-pulse">
          +
        </div>

        {/* Right Group */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white/90 p-2 sm:p-3 rounded-2xl border border-sky-100 shadow-sm max-w-[46%]">
          {Array.from({ length: rightCount }).map((_, i) => {
            const itemIdx = overallCounter++;
            const isCounted = countedIndices.has(itemIdx);
            return (
              <button
                key={`right-${i}`}
                onClick={() => handleItemClick(itemIdx)}
                className={`relative text-3xl sm:text-4xl p-1 rounded-xl transition-all duration-150 transform hover:scale-125 active:scale-90 ${
                  isCounted ? 'bg-emerald-100 ring-2 ring-emerald-400 scale-110' : ''
                }`}
                title={`Đếm vật phẩm ${i + 1}`}
              >
                {rightEmoji}
                {isCounted && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {itemIdx + 1}
                  </span>
                )}
              </button>
            );
          })}
          <div className="w-full text-center text-xs font-black text-emerald-700 mt-0.5">
            {rightCount}
          </div>
        </div>

        {/* Equals Sign */}
        <div className="text-2xl sm:text-3xl font-black text-slate-400">=</div>

        {/* Question mark target */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-white font-black text-2xl flex items-center justify-center shadow-lg border-2 border-amber-300">
          ?
        </div>
      </div>

      {countedIndices.size > 0 && (
        <div className="text-center text-xs font-bold text-sky-700 animate-fade-in mt-1">
          Con vừa đếm được: <span className="text-base text-amber-600 font-extrabold">{countedIndices.size}</span> vật phẩm!
        </div>
      )}
    </div>
  );
};
