import { useState } from 'react';
import { QuestionPayload } from '../types';

export default function QuestionCard({ question, onAnswer }: { question: QuestionPayload; onAnswer: (i: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  function submit(i: number) {
    if (selected !== null) return;
    setSelected(i);
    onAnswer(i);
  }

  return (
    <div className="question-card">
      <h4>QUESTION {question.round}</h4>
      <p>{question.text}</p>
      <p className="hint">Take your time and solve the problem. There is no timer.</p>
      <div className="options">
        {question.options.map((opt, i) => (
          <button key={i} disabled={selected !== null} className={selected === i ? 'selected' : ''} onClick={() => submit(i)}>
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
    </div>
  );
}