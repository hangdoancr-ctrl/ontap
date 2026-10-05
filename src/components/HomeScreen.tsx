import React from 'react';
import { sounds } from '../utils/sound';
import { Play, Sparkles, BookOpen, Trophy, CheckCircle, ShieldCheck, Heart, Star } from 'lucide-react';

interface HomeScreenProps {
  onStartQuiz: () => void;
  onStartMagicRain: () => void;
  onOpenTable: () => void;
  character: 'car' | 'rocket' | 'bee';
  onChangeCharacter: (c: 'car' | 'rocket' | 'bee') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartQuiz,
  onStartMagicRain,
  onOpenTable,
  character,
  onChangeCharacter,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 rounded-3xl p-6 sm:p-10 text-white text-center shadow-2xl relative overflow-hidden border-4 border-white/60">
        {/* Floating clouds & stars */}
        <div className="absolute top-2 left-6 text-4xl opacity-50 animate-bounce">☁️</div>
        <div className="absolute top-6 right-10 text-4xl opacity-50 animate-pulse">✨</div>
        <div className="absolute bottom-4 left-12 text-3xl opacity-40">🎈</div>
        <div className="absolute bottom-3 right-16 text-3xl opacity-40">⭐</div>

        {/* Small badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold text-amber-200 mb-3 shadow-inner">
          <span>🎒</span> DÀNH CHO HỌC SINH LỚP 1 • MÔN TOÁN
        </div>

        {/* Big Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase filter drop-shadow-md">
          ĐƯỜNG ĐUA CHINH PHỤC
          <span className="block text-amber-300 mt-1 font-extrabold text-2xl sm:text-4xl">
            BẢNG CỘNG TRONG PHẠM VI 10
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-sky-100 text-sm sm:text-base font-semibold mt-3">
          Cùng xe đua thần tốc vượt qua 15 câu hỏi kỳ thú và bắn vỡ cơn mưa phép thuật rực rỡ sắc màu!
        </p>

        {/* Racer Chooser */}
        <div className="my-5 inline-flex flex-col items-center bg-white/15 backdrop-blur-sm p-3 rounded-2xl border border-white/25">
          <span className="text-xs font-bold text-amber-200 mb-1.5">
            Chọn bạn đồng hành của con:
          </span>
          <div className="flex gap-3">
            {[
              { id: 'car', label: 'Xe Đua', emoji: '🏎️' },
              { id: 'rocket', label: 'Phi Thuyền', emoji: '🚀' },
              { id: 'bee', label: 'Bạn Ong', emoji: '🐝' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playPop();
                  onChangeCharacter(item.id as 'car' | 'rocket' | 'bee');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  character === item.id
                    ? 'bg-amber-400 text-amber-950 shadow-md scale-105 ring-2 ring-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2">
          <button
            onClick={() => {
              sounds.playPop();
              onStartQuiz();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-black text-base sm:text-lg px-8 py-4 rounded-3xl shadow-xl shadow-amber-500/40 transition-transform active:scale-95 cursor-pointer ring-4 ring-amber-200"
          >
            <Play className="w-6 h-6 fill-amber-950" />
            <span>VÀO ĐƯỜNG ĐUA QUIZ (15 CÂU)</span>
          </button>

          <button
            onClick={() => {
              sounds.playMagicSparkle();
              onStartMagicRain();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/90 hover:bg-white text-purple-900 font-black text-base sm:text-lg px-7 py-4 rounded-3xl shadow-xl transition-transform active:scale-95 cursor-pointer ring-2 ring-purple-300"
          >
            <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
            <span>MƯA PHÉP THUẬT (BẮN TỐC ĐỘ)</span>
          </button>
        </div>
      </div>

      {/* Rules & Game Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rule 1 */}
        <div className="bg-white p-5 rounded-3xl border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
              🎯
            </div>
            <h3 className="font-black text-slate-800 text-base">3 Phương án A, B, C</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Mỗi câu hỏi có 3 lựa chọn với 1 đáp án chính xác duy nhất. Các đáp án được trộn ngẫu nhiên sinh động.
          </p>
          <div className="mt-3 pt-2 border-t border-emerald-100 text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Kết quả trong phạm vi 10</span>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="bg-white p-5 rounded-3xl border-2 border-sky-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl">
              🍎
            </div>
            <h3 className="font-black text-slate-800 text-base">Hình ảnh trực quan</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Hình ảnh minh họa quả táo, bông hoa, chú ong, ngôi sao... Con có thể chạm vào để đếm từng món đồ dễ dàng!
          </p>
          <div className="mt-3 pt-2 border-t border-sky-100 text-xs font-bold text-sky-700 flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Có nút nghe đọc câu hỏi</span>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
              🏆
            </div>
            <h3 className="font-black text-slate-800 text-base">Đúng khen, Sai cho thử lại</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Trả lời đúng xe tăng tốc rực rỡ! Nếu lỡ chọn sai, con sẽ nhận được gợi ý ấm áp và được thử lại ngay lập tức!
          </p>
          <div className="mt-3 pt-2 border-t border-amber-100 text-xs font-bold text-amber-700 flex items-center gap-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
            <span>Thang điểm tối đa: 150 điểm</span>
          </div>
        </div>
      </div>

      {/* Quick Access to Addition Reference */}
      <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-sm">
            📖
          </div>
          <div>
            <h4 className="font-black text-slate-800 text-sm sm:text-base">
              Ôn tập trước khi thi: BẢNG CỘNG TRONG PHẠM VI 10
            </h4>
            <p className="text-xs text-amber-800 font-medium">
              Xem các cặp số tạo thành 10 (1+9, 2+8, 3+7, 4+6, 5+5...)
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playPop();
            onOpenTable();
          }}
          className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4" />
          <span>Mở bảng cộng</span>
        </button>
      </div>
    </div>
  );
};
