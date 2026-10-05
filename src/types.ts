export type LevelType = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng đơn giản';

export interface VisualData {
  type: 'apple' | 'flower' | 'bee' | 'star' | 'balloon' | 'bird' | 'butterfly' | 'calculation_flowers';
  leftCount?: number;
  rightCount?: number;
  leftEmoji?: string;
  rightEmoji?: string;
  symbol?: string;
  description: string;
  targetMissing?: number;
  totalTarget?: number;
  showCalculations?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[]; // Original raw options
  correctOptionIndex: number; // 0 for A, 1 for B, 2 for C in original list
  correctAnswerText: string;
  level: LevelType;
  visualData: VisualData;
  correctFeedback: string;
  wrongFeedback: string;
}

export interface ShuffledQuestion {
  id: number;
  question: string;
  options: {
    label: 'A' | 'B' | 'C';
    text: string;
    isCorrect: boolean;
  }[];
  level: LevelType;
  visualData: VisualData;
  correctFeedback: string;
  wrongFeedback: string;
}

export interface MagicRainDrop {
  id: string;
  x: number; // percentage 10% - 90%
  y: number; // percentage 0% - 100%
  speed: number;
  num1: number;
  num2: number;
  missing?: 'sum' | 'addend';
  answer: number;
  displayExpression: string;
  color: string;
  emoji: string;
}
