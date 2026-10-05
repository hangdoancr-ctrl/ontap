import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/sound';

interface AdditionTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdditionTableModal: React.FC<AdditionTableModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pairs10' | 'table'>('pairs10');

  if (!isOpen) return null;

  const pairsMaking10 = [
    { a: 1, b: 9, emoji: '🌸' },
    { a: 2, b: 8, emoji: '🍎' },
    { a: 3, b: 7, emoji: '⭐' },
    { a: 4, b: 6, emoji: '🎈' },
    { a: 5, b: 5, emoji: '🐝' },
    { a: 6, b: 4, emoji: '🎈' },
    { a: 7, b: 3, emoji: '⭐' },
    { a: 8, b: 2, emoji: '🍎' },
    { a: 9, b: 1, emoji: '🌸' },
    { a: 10, b: 0, emoji: '✨' },
  ];

  const fullAdditionGrid = [
    { title: 'Cộng với 1', items: ['1 + 1 = 2', '2 + 1 = 3', '3 + 1 = 4', '4 + 1 = 5', '5 + 1 = 6', '6 + 1 = 7', '7 + 1 = 8', '8 + 1 = 9', '9 + 1 = 10'] },
    { title: 'Cộng với 2', items: ['1 + 2 = 3', '2 + 2 = 4', '3 + 2 = 5', '4 + 2 = 6', '5 + 2 = 7', '6 + 2 = 8', '7 + 2 = 9', '8 + 2 = 10'] },
    { title: 'Cộng với 3', items: ['1 + 3 = 4', '2 + 3 = 5', '3 + 3 = 6', '4 + 3 = 7', '5 + 3 = 8', '6 + 3 = 9', '7 + 3 = 10'] },
    { title: 'Cộng với 4', items: ['1 + 4 = 5', '2 + 4 = 6', '3 + 4 = 7', '4 + 4 = 8', '5 + 4 = 9', '6 + 4 = 10'] },
    { title: 'Cộng với 5', items: ['1 + 5 = 6', '2 + 5 = 7', '3 + 5 = 8', '4 + 5 = 9', '5 + 5 = 10'] },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border-4 border-amber-300 relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-amber-600 rounded-2xl">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800">
                BẢNG CỘNG TRONG PHẠM VI 10
              </h3>
              <p className="text-xs text-slate-500 font-medium">Bí kíp tính nhanh cho học sinh lớp 1</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 my-3">
          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab('pairs10');
            }}
            className={`flex-1 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'pairs10'
                ? 'bg-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ⭐ Cặp số kết bạn ra 10
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab('table');
            }}
            className={`flex-1 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-sky-400 text-sky-950 shadow-md ring-2 ring-sky-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📖 Bảng các phép cộng
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-1 pr-1">
          {activeTab === 'pairs10' ? (
            <div className="space-y-2">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 font-bold flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                Ghi nhớ các cặp số cộng lại bằng 10 để tính siêu nhanh con nhé!
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {pairsMaking10.map((pair, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gradient-to-br from-white to-amber-50/60 rounded-2xl border-2 border-amber-200/80 flex items-center justify-between shadow-sm hover:scale-102 transition-transform"
                  >
                    <div className="text-xl sm:text-2xl">{pair.emoji}</div>
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-black text-slate-800">
                        {pair.a} + {pair.b}
                      </div>
                      <div className="text-xs font-black text-amber-600">= 10</div>
                    </div>
                    <div className="text-sm">🌟</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fullAdditionGrid.map((group, gIdx) => (
                <div key={gIdx} className="bg-sky-50/70 p-3 rounded-2xl border border-sky-200">
                  <div className="text-xs font-black text-sky-800 uppercase mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    {group.title}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-white py-1 px-2 rounded-xl text-xs font-bold text-slate-700 border border-sky-100 text-center shadow-xs"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer close */}
        <div className="pt-3 mt-2 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black px-6 py-2 rounded-2xl text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            Đã hiểu rồi! Tiếp tục chơi nào 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
