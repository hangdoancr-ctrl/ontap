import { QuizQuestion, ShuffledQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '1 + 2 = ?',
    options: ['3', '4', '2'],
    correctOptionIndex: 0, // A: 3
    correctAnswerText: '3',
    level: 'Nhận biết',
    visualData: {
      type: 'apple',
      leftCount: 1,
      rightCount: 2,
      leftEmoji: '🍎',
      rightEmoji: '🍎',
      description: '1 quả táo + 2 quả táo',
      totalTarget: 3,
    },
    correctFeedback: 'Chính xác! 🌟 1 + 2 = 3',
    wrongFeedback: 'Thử lại nhé! Con hãy đếm tất cả các quả táo. 🍎',
  },
  {
    id: 2,
    question: '2 + 3 = ?',
    options: ['6', '5', '4'],
    correctOptionIndex: 1, // B: 5
    correctAnswerText: '5',
    level: 'Nhận biết',
    visualData: {
      type: 'flower',
      leftCount: 2,
      rightCount: 3,
      leftEmoji: '🌸',
      rightEmoji: '🌸',
      description: '2 bông hoa + 3 bông hoa',
      totalTarget: 5,
    },
    correctFeedback: 'Giỏi lắm! 🌟 2 + 3 = 5',
    wrongFeedback: 'Con thử đếm 2 bông hoa rồi thêm 3 bông hoa nhé! 🌸',
  },
  {
    id: 3,
    question: '4 + 3 = ?',
    options: ['6', '8', '7'],
    correctOptionIndex: 2, // C: 7
    correctAnswerText: '7',
    level: 'Nhận biết',
    visualData: {
      type: 'bee',
      leftCount: 4,
      rightCount: 3,
      leftEmoji: '🐝',
      rightEmoji: '🐝',
      description: '4 con ong + 3 con ong',
      totalTarget: 7,
    },
    correctFeedback: 'Hoan hô! 🐝 4 + 3 = 7',
    wrongFeedback: 'Con hãy đếm lần lượt 4 rồi thêm 3 nhé!',
  },
  {
    id: 4,
    question: '5 + 2 = ?',
    options: ['7', '6', '8'],
    correctOptionIndex: 0, // A: 7
    correctAnswerText: '7',
    level: 'Nhận biết',
    visualData: {
      type: 'star',
      leftCount: 5,
      rightCount: 2,
      leftEmoji: '⭐',
      rightEmoji: '⭐',
      description: '5 ngôi sao + 2 ngôi sao',
      totalTarget: 7,
    },
    correctFeedback: 'Rất tốt! ⭐ 5 + 2 = 7',
    wrongFeedback: 'Thử lại nào! Con hãy đếm thêm 2 sau số 5.',
  },
  {
    id: 5,
    question: '6 + 1 = ?',
    options: ['8', '7', '6'],
    correctOptionIndex: 1, // B: 7
    correctAnswerText: '7',
    level: 'Nhận biết',
    visualData: {
      type: 'balloon',
      leftCount: 6,
      rightCount: 1,
      leftEmoji: '🎈',
      rightEmoji: '🎈',
      description: '6 quả bóng + 1 quả bóng',
      totalTarget: 7,
    },
    correctFeedback: 'Đúng rồi! 🎈 6 + 1 = 7',
    wrongFeedback: 'Con hãy thêm 1 vào số 6 nhé!',
  },
  {
    id: 6,
    question: 'Phép tính nào có kết quả bằng 8?',
    options: ['3 + 4', '5 + 2', '5 + 3'],
    correctOptionIndex: 2, // C: 5 + 3
    correctAnswerText: '5 + 3',
    level: 'Thông hiểu',
    visualData: {
      type: 'calculation_flowers',
      showCalculations: ['3 + 4 = 7', '5 + 2 = 7', '5 + 3 = 8'],
      description: 'Hiển thị ba phép tính trên các bông hoa',
      totalTarget: 8,
    },
    correctFeedback: 'Xuất sắc! 🌟 5 + 3 = 8',
    wrongFeedback: 'Con hãy tính từng phép cộng rồi tìm số 8 nhé!',
  },
  {
    id: 7,
    question: 'Số nào còn thiếu?\n3 + ? = 7',
    options: ['4', '3', '5'],
    correctOptionIndex: 0, // A: 4
    correctAnswerText: '4',
    level: 'Thông hiểu',
    visualData: {
      type: 'butterfly',
      leftCount: 3,
      rightCount: 4,
      targetMissing: 4,
      totalTarget: 7,
      leftEmoji: '🦋',
      description: '3 con bướm + các ô trống để tạo thành 7',
    },
    correctFeedback: 'Chính xác! 🦋 3 + 4 = 7',
    wrongFeedback: 'Con hãy nghĩ: 3 thêm mấy thì được 7?',
  },
  {
    id: 8,
    question: 'Phép tính nào đúng?',
    options: ['4 + 4 = 7', '4 + 4 = 8', '4 + 4 = 9'],
    correctOptionIndex: 1, // B: 4 + 4 = 8
    correctAnswerText: '4 + 4 = 8',
    level: 'Thông hiểu',
    visualData: {
      type: 'apple',
      leftCount: 4,
      rightCount: 4,
      leftEmoji: '🍎',
      rightEmoji: '🍎',
      description: '4 quả táo + 4 quả táo',
      totalTarget: 8,
    },
    correctFeedback: 'Rất giỏi! 🍎 4 + 4 = 8',
    wrongFeedback: 'Con hãy đếm 4 quả táo rồi thêm 4 quả nữa.',
  },
  {
    id: 9,
    question: '5 + 4 = ?',
    options: ['8', '10', '9'],
    correctOptionIndex: 2, // C: 9
    correctAnswerText: '9',
    level: 'Thông hiểu',
    visualData: {
      type: 'star',
      leftCount: 5,
      rightCount: 4,
      leftEmoji: '⭐',
      rightEmoji: '⭐',
      description: '5 ngôi sao + 4 ngôi sao',
      totalTarget: 9,
    },
    correctFeedback: 'Tuyệt vời! ⭐ 5 + 4 = 9',
    wrongFeedback: 'Con hãy đếm từ 5 thêm 4 số nữa nhé!',
  },
  {
    id: 10,
    question: 'Phép tính nào có kết quả bằng 10?',
    options: ['6 + 4', '6 + 3', '5 + 4'],
    correctOptionIndex: 0, // A: 6 + 4
    correctAnswerText: '6 + 4',
    level: 'Thông hiểu',
    visualData: {
      type: 'flower',
      leftCount: 6,
      rightCount: 4,
      leftEmoji: '🌸',
      rightEmoji: '🌸',
      description: '6 bông hoa + 4 bông hoa',
      totalTarget: 10,
    },
    correctFeedback: 'Hoan hô! 🌸 6 + 4 = 10',
    wrongFeedback: 'Con hãy thử tính từng phép cộng nhé!',
  },
  {
    id: 11,
    question: 'Có 3 con ong đang đậu trên một bông hoa. Có thêm 4 con ong bay đến. Có tất cả bao nhiêu con ong?',
    options: ['6', '8', '7'],
    correctOptionIndex: 2, // C: 7
    correctAnswerText: '7',
    level: 'Vận dụng đơn giản',
    visualData: {
      type: 'bee',
      leftCount: 3,
      rightCount: 4,
      leftEmoji: '🐝',
      rightEmoji: '🐝',
      description: '3 con ong + 4 con ong trên bông hoa',
      totalTarget: 7,
    },
    correctFeedback: 'Giỏi quá! 🐝🐝🐝 3 + 4 = 7',
    wrongFeedback: 'Con hãy đếm 3 con ong rồi thêm 4 con ong nữa nhé!',
  },
  {
    id: 12,
    question: 'Trên cây có 5 quả táo. Mẹ đặt thêm 3 quả táo. Có tất cả bao nhiêu quả táo?',
    options: ['7', '8', '9'],
    correctOptionIndex: 1, // B: 8
    correctAnswerText: '8',
    level: 'Vận dụng đơn giản',
    visualData: {
      type: 'apple',
      leftCount: 5,
      rightCount: 3,
      leftEmoji: '🍎',
      rightEmoji: '🍎',
      description: '5 quả táo + 3 quả táo',
      totalTarget: 8,
    },
    correctFeedback: 'Chính xác! 🍎 5 + 3 = 8',
    wrongFeedback: 'Con hãy đếm 5 quả rồi thêm 3 quả nữa.',
  },
  {
    id: 13,
    question: 'Lan có 6 ngôi sao. Lan được tặng thêm 3 ngôi sao. Lan có tất cả bao nhiêu ngôi sao?',
    options: ['9', '8', '10'],
    correctOptionIndex: 0, // A: 9
    correctAnswerText: '9',
    level: 'Vận dụng đơn giản',
    visualData: {
      type: 'star',
      leftCount: 6,
      rightCount: 3,
      leftEmoji: '⭐',
      rightEmoji: '⭐',
      description: '6 ngôi sao + 3 ngôi sao',
      totalTarget: 9,
    },
    correctFeedback: 'Xuất sắc! ⭐ 6 + 3 = 9',
    wrongFeedback: 'Con hãy lấy 6 rồi đếm thêm 3 nhé!',
  },
  {
    id: 14,
    question: 'Có 7 chú chim trên cành. Có thêm 3 chú chim bay đến. Có tất cả bao nhiêu chú chim?',
    options: ['9', '10', '8'],
    correctOptionIndex: 1, // B: 10
    correctAnswerText: '10',
    level: 'Vận dụng đơn giản',
    visualData: {
      type: 'bird',
      leftCount: 7,
      rightCount: 3,
      leftEmoji: '🐦',
      rightEmoji: '🐦',
      description: '7 chú chim + 3 chú chim',
      totalTarget: 10,
    },
    correctFeedback: 'Hoan hô! 🐦 7 + 3 = 10',
    wrongFeedback: 'Con hãy đếm từ 7 thêm 3 bước nữa nhé!',
  },
  {
    id: 15,
    question: 'Bạn Ong muốn thu thập đủ 10 bông hoa. Bạn đã có 8 bông hoa. Bạn cần thêm mấy bông hoa nữa?',
    options: ['1', '3', '2'],
    correctOptionIndex: 2, // C: 2
    correctAnswerText: '2',
    level: 'Vận dụng đơn giản',
    visualData: {
      type: 'flower',
      leftCount: 8,
      rightCount: 2,
      targetMissing: 2,
      totalTarget: 10,
      leftEmoji: '🌸',
      description: '8 bông hoa và 2 bông hoa còn thiếu để đủ 10',
    },
    correctFeedback: '🎉 Tuyệt vời! 8 + 2 = 10. Bạn Ong đã đủ 10 bông hoa!',
    wrongFeedback: 'Con hãy nghĩ xem 8 thêm mấy thì được 10 nhé!',
  },
];

/**
 * Trộn vị trí đáp án đúng giữa A, B, C theo yêu cầu:
 * "Trộn vị trí đáp án đúng giữa A, B, C."
 */
export function shuffleOptions(q: QuizQuestion): ShuffledQuestion {
  const items = q.options.map((optText, idx) => ({
    text: optText,
    isCorrect: idx === q.correctOptionIndex,
  }));

  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  const labels: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  const shuffledOptions = items.map((item, idx) => ({
    label: labels[idx],
    text: item.text,
    isCorrect: item.isCorrect,
  }));

  return {
    id: q.id,
    question: q.question,
    options: shuffledOptions,
    level: q.level,
    visualData: q.visualData,
    correctFeedback: q.correctFeedback,
    wrongFeedback: q.wrongFeedback,
  };
}
