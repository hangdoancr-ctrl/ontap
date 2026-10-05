/**
 * Utility to speak Vietnamese text aloud using Web Speech API (if supported)
 */
class SpeechHelper {
  private isSpeakingEnabled: boolean = true;

  public toggleSpeech(): boolean {
    this.isSpeakingEnabled = !this.isSpeakingEnabled;
    if (!this.isSpeakingEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.isSpeakingEnabled;
  }

  public getEnabled(): boolean {
    return this.isSpeakingEnabled;
  }

  public setEnabled(val: boolean) {
    this.isSpeakingEnabled = val;
    if (!val && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string) {
    if (!this.isSpeakingEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop prior speech

      // Clean emojis and symbols for clearer reading
      const cleanText = text
        .replace(/[🌟🍎🌸🐝⭐🎈🦋🐦🎉🏆💪❓=?+]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95; // Slightly slower for 1st grade comprehension
      utterance.pitch = 1.1; // Cheerful friendly tone

      // Try to find a Vietnamese voice
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.lang.includes('VIE'));
      if (viVoice) {
        utterance.voice = viVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback if speech synthesis is blocked
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speech = new SpeechHelper();
