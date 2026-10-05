import React from 'react';
import { Volume2, VolumeX, BookOpen, Sparkles, Trophy, Mic, MicOff } from 'lucide-react';
import { sounds } from '../utils/sound';
import { speech } from '../utils/speech';

interface NavbarProps {
  currentTab: 'quiz' | 'magic-rain';
  onSelectTab: (tab: 'quiz' | 'magic-rain') => void;
  onOpenTable: () => void;
  character: 'car' | 'rocket' | 'bee';
  onChangeCharacter: (c: 'car' | 'rocket' | 'bee') => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenTable,
  character,
  onChangeCharacter,
  isMuted,
  onToggleMute,
  isSpeechEnabled,
  onToggleSpeech,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-sky-100 sticky top-0 z-40 shadow-xs">
      <div className="max-w-5xl mx-auto px-3 py-2.5 sm:px-4 flex flex-wrap items-center justify-between gap-2">
        {/* Brand */}
        <div
          onClick={() => {
            sounds.playPop();
            onSelectTab('quiz');
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-orange-500/20">
            {character === 'bee' ? '🐝' : character === 'rocket' ? '🚀' : '🏎️'}
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black text-slate-800 leading-tight flex items-center gap-1">
              <span>ĐƯỜNG ĐUA TOÁN 1</span>
              <span className="text-amber-500">⭐</span>
            </h1>
            <p className="text-[10px] sm:text-xs font-bold text-sky-600">
              Bảng cộng trong phạm vi 10
            </p>
          </div>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              sounds.playPop();
              onSelectTab('quiz');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              currentTab === 'quiz'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🏎️ Đường Đua (15 Câu)</span>
          </button>

          <button
            onClick={() => {
              sounds.playMagicSparkle();
              onSelectTab('magic-rain');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              currentTab === 'magic-rain'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mưa Phép Thuật</span>
          </button>
        </div>

        {/* Utilities: Character pick, Guide table, Sound, Speech */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Racer picker */}
          <div className="flex bg-sky-50 rounded-xl p-0.5 border border-sky-200" title="Chọn nhân vật">
            {(['car', 'rocket', 'bee'] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  sounds.playPop();
                  onChangeCharacter(c);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-sm sm:text-base flex items-center justify-center transition-all cursor-pointer ${
                  character === c ? 'bg-white shadow-xs scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {c === 'car' ? '🏎️' : c === 'rocket' ? '🚀' : '🐝'}
              </button>
            ))}
          </div>

          {/* Addition Table Guide */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenTable();
            }}
            className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="Xem bảng cộng trong phạm vi 10"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Bảng cộng 10</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Speech Read Toggle */}
          <button
            onClick={onToggleSpeech}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              !isSpeechEnabled
                ? 'bg-slate-100 border-slate-200 text-slate-400'
                : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}
            title={isSpeechEnabled ? 'Tắt đọc giọng nói' : 'Bật đọc giọng nói'}
          >
            {isSpeechEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
