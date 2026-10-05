import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, shuffleOptions } from '../data/quizData';
import { ShuffledQuestion } from '../types';
import { RaceTrack } from './RaceTrack';
import { VisualIllustrator } from './VisualIllustrator';
import { ResultModal } from './ResultModal';
import { sounds } from '../utils/sound';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, ArrowRight, RotateCcw, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

interface QuizRaceGameProps {
  onHome: () => void;
  onOpenMagicRain: () => void;
  character: 'car' | 'rocket' | 'bee';
}

export const QuizRaceGame: React.FC<QuizRaceGameProps> = ({
  onHome,
  onOpenMagicRain,
  character,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<ShuffledQuestion>(() =>
    shuffleOptions(QUIZ_QUESTIONS[0])
  );
  const [score, setScore] = useState<number>(0);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState<number>(0);
  const [attemptsOnCurrent, setAttemptsOnCurrent] = useState<number>(0);

  const [selectedLabel, setSelectedLabel] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnsweredCorrect, setIsAnsweredCorrect] = useState<boolean>(false);
  const [wrongOptionLabels, setWrongOptionLabels] = useState<Set<'A' | 'B' | 'C'>>(new Set());
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Setup question when currentIdx changes
  useEffect(() => {
    if (currentIdx < QUIZ_QUESTIONS.length) {
      const shuffled = shuffleOptions(QUIZ_QUESTIONS[currentIdx]);
      setCurrentQuestion(shuffled);
      setSelectedLabel(null);
      setIsAnsweredCorrect(false);
      setWrongOptionLabels(new Set());
      setFeedbackMessage(null);
      setAttemptsOnCurrent(0);

      // Auto-read question if voice enabled
      const qText = `${shuffled.question.replace(/\n/g, ' ')}`;
      speech.speak(`Câu ${currentIdx + 1}: ${qText}`);
    } else {
      setIsFinished(true);
    }
  }, [currentIdx]);

  const handleReadQuestion = () => {
    sounds.playPop();
    const qText = `${currentQuestion.question.replace(/\n/g, ' ')}`;
    const optText = currentQuestion.options
      .map((o) => `Phương án ${o.label}: ${o.text}`)
      .join('. ');
    speech.speak(`Câu ${currentIdx + 1}: ${qText}. ${optText}`);
  };

  const handleSelectOption = (opt: { label: 'A' | 'B' | 'C'; text: string; isCorrect: boolean }) => {
    // If already correctly answered this question, don't re-answer
    if (isAnsweredCorrect) return;

    // If this option was already tried and was wrong, skip
    if (wrongOptionLabels.has(opt.label)) return;

    setSelectedLabel(opt.label);
    const newAttempts = attemptsOnCurrent + 1;
    setAttemptsOnCurrent(newAttempts);

    if (opt.isCorrect) {
      // CORRECT ANSWER!
      setIsAnsweredCorrect(true);
      setFeedbackMessage(currentQuestion.correctFeedback);
      sounds.playCorrect();
      sounds.playZoom();

      // Confetti burst
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Fallback
      }

      // Voice positive feedback
      speech.speak(currentQuestion.correctFeedback);

      // Score calculation: 10 points if 1st try, 6 points on retry
      if (newAttempts === 1) {
        setScore((prev) => prev + 10);
        setFirstTryCorrectCount((prev) => prev + 1);
      } else {
        setScore((prev) => prev + 6);
      }
    } else {
      // WRONG ANSWER - "Khi chọn sai, cho học sinh thử lại."
      sounds.playWrong();
      setWrongOptionLabels((prev) => new Set(prev).add(opt.label));
      setFeedbackMessage(currentQuestion.wrongFeedback);
      speech.speak(currentQuestion.wrongFeedback);
    }
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    speech.stop();
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setFirstTryCorrectCount(0);
    setIsFinished(false);
    setCurrentQuestion(shuffleOptions(QUIZ_QUESTIONS[0]));
    setSelectedLabel(null);
    setIsAnsweredCorrect(false);
    setWrongOptionLabels(new Set());
    setFeedbackMessage(null);
    setAttemptsOnCurrent(0);
  };

  const currentRawQ = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Race Track Header */}
      <RaceTrack
        currentQuestionIndex={currentIdx}
        totalQuestions={QUIZ_QUESTIONS.length}
        score={score}
        character={character}
      />

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-xl border-3 border-sky-200 relative overflow-hidden transition-all">
        {/* Question Header & Level Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-amber-950 font-black text-sm sm:text-base px-3 py-1 rounded-2xl shadow-sm">
              CÂU {currentIdx + 1}
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                currentRawQ.level === 'Nhận biết'
                  ? 'bg-emerald-100 text-emerald-800'
                  : currentRawQ.level === 'Thông hiểu'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              Mức độ: {currentRawQ.level}
            </span>
          </div>

          {/* Text-to-speech button */}
          <button
            onClick={handleReadQuestion}
            className="flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-2xl transition-colors cursor-pointer"
            title="Đọc câu hỏi cho con nghe"
          >
            <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>Nghe đọc câu hỏi</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="my-4 text-center">
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 leading-snug whitespace-pre-line">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Visual Illustration Aid */}
        <div className="my-4">
          <VisualIllustrator
            visualData={currentQuestion.visualData}
            questionId={currentQuestion.id}
          />
        </div>

        {/* 3 Answer Options: A, B, C */}
        <div className="my-4">
          <div className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Chọn 1 trong 3 đáp án đúng dưới đây:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentQuestion.options.map((option) => {
              const isWrong = wrongOptionLabels.has(option.label);
              const isSelected = selectedLabel === option.label;
              const isCorrectAndRevealed = isAnsweredCorrect && option.isCorrect;

              let btnStyle =
                'bg-gradient-to-b from-sky-50 to-white hover:from-sky-100 hover:to-sky-50 border-2 border-sky-300 text-slate-800 shadow-sm hover:shadow-md';
              let badgeStyle = 'bg-sky-500 text-white';

              if (isCorrectAndRevealed) {
                btnStyle =
                  'bg-gradient-to-b from-emerald-100 to-emerald-50 border-3 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200 shadow-lg scale-102';
                badgeStyle = 'bg-emerald-600 text-white';
              } else if (isWrong) {
                btnStyle =
                  'bg-rose-50 border-2 border-rose-300 text-rose-800 opacity-60 line-through cursor-not-allowed';
                badgeStyle = 'bg-rose-400 text-white';
              }

              return (
                <button
                  key={option.label}
                  disabled={isWrong || (isAnsweredCorrect && !option.isCorrect)}
                  onClick={() => handleSelectOption(option)}
                  className={`group relative flex items-center justify-between sm:justify-center p-3.5 sm:p-5 rounded-3xl transition-all duration-200 transform active:scale-95 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl shadow-xs transition-transform group-hover:scale-110 ${badgeStyle}`}
                    >
                      {option.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-black tracking-wide">
                      {option.text}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  {isCorrectAndRevealed && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 ml-2 animate-bounce" />
                  )}
                  {isWrong && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section (Phản hồi khi đúng / khi sai) */}
        {feedbackMessage && (
          <div
            className={`p-4 rounded-3xl border-2 my-4 transition-all duration-300 animate-fade-in ${
              isAnsweredCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                : 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2.5 font-black text-base sm:text-lg">
              {isAnsweredCorrect ? (
                <span className="text-2xl">🌟</span>
              ) : (
                <span className="text-2xl animate-bounce">💡</span>
              )}
              <span>{feedbackMessage}</span>
            </div>

            {!isAnsweredCorrect && (
              <p className="text-xs sm:text-sm font-bold text-amber-700 mt-1.5 pl-8">
                Đừng lo lắng, con hãy chọn lại đáp án khác nhé! Cố lên nào! ✨
              </p>
            )}
          </div>
        )}

        {/* Bottom Actions (Next Question Button) */}
        <div className="flex items-center justify-between pt-2 border-t border-sky-100 mt-4">
          <button
            onClick={() => {
              sounds.playPop();
              onHome();
            }}
            className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-700 underline py-2 cursor-pointer"
          >
            Về menu chính
          </button>

          {isAnsweredCorrect ? (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer animate-pulse"
            >
              <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-xs font-bold text-slate-400">
              Hãy chọn đáp án để tiếp tục chặng đua 🏎️
            </div>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      {isFinished && (
        <ResultModal
          score={score}
          maxScore={150}
          correctFirstTryCount={firstTryCorrectCount}
          totalQuestions={QUIZ_QUESTIONS.length}
          onRestart={handleRestart}
          onHome={onHome}
          onOpenMagicRain={onOpenMagicRain}
        />
      )}
    </div>
  );
};
