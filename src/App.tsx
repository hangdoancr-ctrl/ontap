import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { QuizRaceGame } from './components/QuizRaceGame';
import { MagicRainGame } from './components/MagicRainGame';
import { AdditionTableModal } from './components/AdditionTableModal';
import { sounds } from './utils/sound';
import { speech } from './utils/speech';

export default function App() {
  const [view, setView] = useState<'home' | 'quiz' | 'magic-rain'>('home');
  const [character, setCharacter] = useState<'car' | 'rocket' | 'bee'>('car');
  const [isTableOpen, setIsTableOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(speech.getEnabled());

  const handleToggleMute = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleToggleSpeech = () => {
    const nextSpeech = speech.toggleSpeech();
    setIsSpeechEnabled(nextSpeech);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentTab={view === 'magic-rain' ? 'magic-rain' : 'quiz'}
        onSelectTab={(tab) => setView(tab)}
        onOpenTable={() => setIsTableOpen(true)}
        character={character}
        onChangeCharacter={setCharacter}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isSpeechEnabled={isSpeechEnabled}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col justify-start">
        {view === 'home' && (
          <HomeScreen
            onStartQuiz={() => setView('quiz')}
            onStartMagicRain={() => setView('magic-rain')}
            onOpenTable={() => setIsTableOpen(true)}
            character={character}
            onChangeCharacter={setCharacter}
          />
        )}

        {view === 'quiz' && (
          <QuizRaceGame
            onHome={() => setView('home')}
            onOpenMagicRain={() => setView('magic-rain')}
            character={character}
          />
        )}

        {view === 'magic-rain' && (
          <MagicRainGame
            onHome={() => setView('home')}
            onOpenQuiz={() => setView('quiz')}
          />
        )}
      </main>

      {/* Addition Reference Table Modal */}
      <AdditionTableModal
        isOpen={isTableOpen}
        onClose={() => setIsTableOpen(false)}
      />

      {/* Footer */}
      <footer className="text-center py-3 text-xs font-bold text-slate-400 border-t border-sky-100 bg-white/50">
        Đường Đua Chinh Phục Bảng Cộng 10 & Cơn Mưa Phép Thuật • Dành riêng cho học sinh lớp 1 🌟
      </footer>
    </div>
  );
}
