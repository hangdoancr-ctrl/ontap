import React, { useState, useEffect, useRef } from 'react';
import { MagicRainDrop } from '../types';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Zap,
  RotateCcw,
  Home,
  Trophy,
  Volume2,
  Heart,
  Flame,
  Award,
} from 'lucide-react';

interface MagicRainGameProps {
  onHome: () => void;
  onOpenQuiz: () => void;
}

export const MagicRainGame: React.FC<MagicRainGameProps> = ({ onHome, onOpenQuiz }) => {
  const [drops, setDrops] = useState<MagicRainDrop[]>([]);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [speedLevel, setSpeedLevel] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to generate a friendly Grade 1 addition within 10
  const generateDrop = (): MagicRainDrop => {
    // Generate num1 + num2 <= 10
    const sum = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const num1 = Math.floor(Math.random() * (sum + 1));
    const num2 = sum - num1;

    // Randomize style: either standard "num1 + num2 = ?" or fill-in "num1 + ? = sum"
    const isMissingAddend = Math.random() > 0.65;
    let answer = sum;
    let displayExpression = `${num1} + ${num2} = ?`;

    if (isMissingAddend && num2 > 0) {
      answer = num2;
      displayExpression = `${num1} + ? = ${sum}`;
    }

    const emojis = ['💧', '⭐', '🌈', '🌸', '🎈', '✨'];
    const colors = [
      'from-sky-400 to-blue-500',
      'from-purple-400 to-indigo-500',
      'from-pink-400 to-rose-500',
      'from-amber-400 to-orange-500',
      'from-emerald-400 to-teal-500',
    ];

    const speedMultiplier = speedLevel === 'slow' ? 0.35 : speedLevel === 'medium' ? 0.55 : 0.85;

    return {
      id: Math.random().toString(36).substring(2, 9),
      x: 10 + Math.random() * 75, // 10% to 85%
      y: -5,
      speed: (0.35 + Math.random() * 0.25) * speedMultiplier,
      num1,
      num2,
      answer,
      displayExpression,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };
  };

  // Spawn drops periodically
  useEffect(() => {
    if (!gameActive) return;

    const intervalTime = speedLevel === 'slow' ? 3200 : speedLevel === 'medium' ? 2400 : 1600;

    spawnTimerRef.current = setInterval(() => {
      setDrops((prev) => {
        if (prev.length >= 4) return prev; // Keep screen manageable for Grade 1
        return [...prev, generateDrop()];
      });
    }, intervalTime);

    // Initial drop
    setDrops([generateDrop()]);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [gameActive, speedLevel]);

  // Animation loop to move drops downward
  useEffect(() => {
    if (!gameActive) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 16;
      lastTime = time;

      setDrops((prev) => {
        const next: MagicRainDrop[] = [];
        prev.forEach((d) => {
          const newY = d.y + d.speed * delta;
          if (newY < 92) {
            next.push({ ...d, y: newY });
          } else {
            // Drop touched bottom flower garden
            setCombo(0);
          }
        });
        return next;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameActive]);

  // Handle number shot (from number keypad or direct drop click)
  const handleShoot = (numberVal: number) => {
    sounds.playPop();

    // Find if any drop has this answer
    // Prioritize the drop closest to the bottom (greatest y)
    const matchingDrop = [...drops]
      .filter((d) => d.answer === numberVal)
      .sort((a, b) => b.y - a.y)[0];

    if (matchingDrop) {
      // HIT!
      sounds.playMagicSparkle();
      sounds.playCorrect();

      // Confetti burst
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: {
            x: matchingDrop.x / 100,
            y: Math.max(0.2, matchingDrop.y / 100),
          },
        });
      } catch {
        // Fallback
      }

      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const addedPoints = 10 + (newCombo > 1 ? newCombo * 2 : 0);
      setScore((prev) => prev + addedPoints);
      setPoppedCount((prev) => prev + 1);

      setLastFeedback(`Bắn trúng! ${matchingDrop.displayExpression} -> Đúng là ${numberVal}! 🌟`);

      // Remove popped drop
      setDrops((prev) => prev.filter((d) => d.id !== matchingDrop.id));
    } else {
      // Missed shot
      sounds.playWrong();
      setCombo(0);
      setLastFeedback(`Số ${numberVal} chưa khớp với giọt mưa nào, con quan sát kỹ nhé! 💡`);
    }
  };

  const handleRestart = () => {
    setDrops([generateDrop()]);
    setScore(0);
    setCombo(0);
    setPoppedCount(0);
    setGameActive(true);
    setLastFeedback(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {/* Top Banner & Control */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-sky-500 rounded-3xl p-3 sm:p-4 text-white shadow-xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-white/20 backdrop-blur-md rounded-2xl text-xl sm:text-2xl animate-spin">
            🪄
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-wide flex items-center gap-1.5">
              <span>CƠN MƯA PHÉP THUẬT - BẮN TỐC ĐỘ</span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </h2>
            <p className="text-[11px] sm:text-xs text-purple-100 font-medium">
              Bắn rơi các giọt mưa phép thuật bằng đáp án đúng!
            </p>
          </div>
        </div>

        {/* Speed Level Selector */}
        <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-2xl text-xs font-bold">
          <span className="text-[10px] sm:text-xs px-1 text-yellow-200">Tốc độ:</span>
          {(['slow', 'medium', 'fast'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                sounds.playPop();
                setSpeedLevel(lvl);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                speedLevel === lvl
                  ? 'bg-amber-400 text-amber-950 font-black shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {lvl === 'slow' ? '🐢 Chậm' : lvl === 'medium' ? '🐰 Vừa' : '⚡ Nhanh'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        <div className="bg-white p-2.5 rounded-2xl border-2 border-amber-200 shadow-sm flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />
          <div>
            <div className="text-[10px] font-bold text-slate-400">ĐIỂM SỐ</div>
            <div className="text-lg sm:text-2xl font-black text-amber-600">{score}</div>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border-2 border-rose-200 shadow-sm flex items-center justify-center gap-2">
          <Flame className="w-5 h-5 text-rose-500 fill-rose-400 animate-bounce" />
          <div>
            <div className="text-[10px] font-bold text-slate-400">CHUỖI COMBO</div>
            <div className="text-lg sm:text-2xl font-black text-rose-600">x{combo}</div>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border-2 border-sky-200 shadow-sm flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-500 fill-sky-400" />
          <div>
            <div className="text-[10px] font-bold text-slate-400">ĐÃ THU THẬP</div>
            <div className="text-lg sm:text-2xl font-black text-sky-600">{poppedCount} giọt</div>
          </div>
        </div>
      </div>

      {/* Main Sky Arena */}
      <div
        ref={containerRef}
        className="relative h-72 sm:h-96 w-full rounded-3xl bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-100 overflow-hidden border-4 border-sky-300 shadow-2xl select-none"
      >
        {/* Sky Clouds */}
        <div className="absolute top-2 left-6 text-3xl sm:text-4xl opacity-80 animate-pulse">☁️</div>
        <div className="absolute top-4 right-10 text-3xl sm:text-4xl opacity-80 animate-pulse">☁️</div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl opacity-60">☁️</div>

        {/* Falling Magic Raindrops */}
        {drops.map((drop) => (
          <div
            key={drop.id}
            onClick={() => handleShoot(drop.answer)}
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
            }}
            className="absolute -translate-x-1/2 cursor-pointer transition-transform transform hover:scale-110 active:scale-95 group z-20"
          >
            {/* Raindrop bubble card */}
            <div
              className={`p-2 sm:p-3 rounded-3xl bg-gradient-to-br ${drop.color} text-white shadow-xl border-2 border-white ring-2 ring-white/50 flex flex-col items-center justify-center min-w-[76px] sm:min-w-[95px]`}
            >
              <div className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform">
                {drop.emoji}
              </div>
              <div className="text-sm sm:text-base font-black tracking-tight text-center font-mono drop-shadow">
                {drop.displayExpression}
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-full mt-0.5">
                Chạm để bắn!
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Flower Garden (Lawn) */}
        <div className="absolute bottom-0 inset-x-0 h-10 sm:h-12 bg-gradient-to-t from-emerald-600 to-emerald-500 flex items-center justify-around px-2 text-xl sm:text-2xl border-t-2 border-emerald-400 z-10">
          <span>🌷</span>
          <span>🌻</span>
          <span>🌸</span>
          <span>🌺</span>
          <span>🌼</span>
          <span>🌸</span>
          <span>🌷</span>
          <span>🌻</span>
        </div>
      </div>

      {/* Feedback Banner */}
      {lastFeedback && (
        <div className="bg-amber-100 border-2 border-amber-300 text-amber-950 px-4 py-2 rounded-2xl text-center text-xs sm:text-sm font-bold shadow-xs animate-fade-in">
          {lastFeedback}
        </div>
      )}

      {/* Number Cannon Keypad: 0 to 10 */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-lg border-2 border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-purple-900 flex items-center gap-1">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
            PHÁO BẮN PHÉP THUẬT (Bấm số để bắn giọt mưa mang kết quả đó):
          </span>
          <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
            Phạm vi số 0 đến 10
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2">
          {Array.from({ length: 11 }).map((_, num) => (
            <button
              key={num}
              onClick={() => handleShoot(num)}
              className="py-2.5 sm:py-3.5 rounded-2xl font-black text-lg sm:text-xl text-white bg-gradient-to-b from-sky-400 to-indigo-600 hover:from-sky-500 hover:to-indigo-700 shadow-md shadow-sky-500/25 active:scale-90 transition-all cursor-pointer flex flex-col items-center justify-center border-b-3 border-indigo-800"
            >
              <span>{num}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Nav Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <button
          onClick={() => {
            sounds.playPop();
            onHome();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 bg-white px-3 py-2 rounded-2xl border border-slate-200 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playPop();
              handleRestart();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100 px-3 py-2 rounded-2xl border border-emerald-300 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi lại</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onOpenQuiz();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 rounded-2xl shadow-md cursor-pointer"
          >
            <span>🏎️ Đường Đua 15 Câu Hỏi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
