import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';
import { RotateCcw, Home, Trophy, Star, Sparkles, Award } from 'lucide-react';

interface ResultModalProps {
  score: number;
  maxScore?: number;
  correctFirstTryCount: number;
  totalQuestions: number;
  onRestart: () => void;
  onHome: () => void;
  onOpenMagicRain?: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  score,
  maxScore = 150,
  correctFirstTryCount,
  totalQuestions,
  onRestart,
  onHome,
  onOpenMagicRain,
}) => {
  // Determine title and message based on the exact user rubric:
  // Nếu đạt 120–150 điểm: 🏆 SIÊU SAO TOÁN HỌC! “Con đã chinh phục bảng cộng trong phạm vi 10!”
  // Nếu đạt 80–110 điểm: 🌟 RẤT TỐT! “Con hãy luyện tập thêm để trở thành Siêu sao Toán học nhé!”
  // Nếu đạt dưới 80 điểm: 💪 CỐ GẮNG THÊM NHÉ! “Con hãy luyện tập lại bảng cộng và thử sức lần nữa!”
  let rankIcon = '🏆';
  let rankTitle = 'SIÊU SAO TOÁN HỌC!';
  let rankMessage = 'Con đã chinh phục bảng cộng trong phạm vi 10!';
  let badgeColor = 'from-amber-400 to-yellow-500 text-amber-950';

  if (score >= 120) {
    rankIcon = '🏆';
    rankTitle = 'SIÊU SAO TOÁN HỌC!';
    rankMessage = 'Con đã chinh phục bảng cộng trong phạm vi 10!';
    badgeColor = 'from-amber-400 to-yellow-500 text-amber-950 ring-amber-300';
  } else if (score >= 80) {
    rankIcon = '🌟';
    rankTitle = 'RẤT TỐT!';
    rankMessage = 'Con hãy luyện tập thêm để trở thành Siêu sao Toán học nhé!';
    badgeColor = 'from-sky-400 to-blue-500 text-white ring-blue-300';
  } else {
    rankIcon = '💪';
    rankTitle = 'CỐ GẮNG THÊM NHÉ!';
    rankMessage = 'Con hãy luyện tập lại bảng cộng và thử sức lần nữa!';
    badgeColor = 'from-emerald-400 to-teal-500 text-white ring-teal-300';
  }

  useEffect(() => {
    sounds.playFanfare();

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);

      return () => clearTimeout(timer);
    } catch {
      // Confetti fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-300 relative overflow-hidden transform transition-all scale-100">
        {/* Decorative rays */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Celebration header */}
        <div className="inline-flex items-center justify-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full font-black text-sm sm:text-base mb-2">
          <span>🎉</span> HOAN HÔ! <span>🎉</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight mt-1">
          EM ĐÃ HOÀN THÀNH
          <span className="block text-sky-600 font-extrabold text-lg sm:text-xl mt-1">
            “ĐƯỜNG ĐUA CHINH PHỤC BẢNG CỘNG 10”
          </span>
        </h2>

        {/* Big Score Card */}
        <div className="my-5 p-4 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-inner">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 font-black text-base sm:text-lg mb-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>Tổng điểm của con:</span>
          </div>

          <div className="text-4xl sm:text-5xl font-black text-amber-600 tracking-tight my-1">
            {score} <span className="text-2xl sm:text-3xl text-slate-400 font-bold">/ {maxScore}</span>
          </div>

          <div className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
            (Đúng ngay lần đầu: {correctFirstTryCount} / {totalQuestions} câu)
          </div>
        </div>

        {/* Rank & Message Box */}
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${badgeColor} shadow-md mb-6 ring-4`}>
          <div className="text-3xl sm:text-4xl mb-1">{rankIcon}</div>
          <div className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            {rankTitle}
          </div>
          <p className="text-sm sm:text-base font-bold mt-1 px-2 opacity-95">
            “{rankMessage}”
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => {
              sounds.playPop();
              onRestart();
            }}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>🔄 CHƠI LẠI</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onHome();
            }}
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-black py-3.5 px-4 rounded-2xl shadow-lg shadow-sky-500/30 transition-transform active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span>🏠 VỀ TRANG CHỦ</span>
          </button>
        </div>

        {onOpenMagicRain && (
          <button
            onClick={() => {
              sounds.playMagicSparkle();
              onOpenMagicRain();
            }}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black py-3 px-4 rounded-2xl shadow-md transition-transform active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Chơi tiếp: Cơn Mưa Phép Thuật (Bắn Tốc Độ) 🚀</span>
          </button>
        )}
      </div>
    </div>
  );
};
