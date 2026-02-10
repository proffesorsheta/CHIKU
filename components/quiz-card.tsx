"use client";

import { cn } from "@/lib/utils";

interface QuizCardProps {
  question: string;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
}

export function QuizCard({
  question,
  options,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelect,
}: QuizCardProps) {
  const answered = selectedAnswer !== null;

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="bg-card rounded-3xl shadow-lg border border-border p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  i < questionNumber ? "bg-primary" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>

        <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 text-balance">
          {question}
        </h2>

        <div className="flex flex-col gap-3">
          {options.map((option, index) => {
            const isSelected = index === selectedAnswer;

            return (
              <button
                key={index}
                type="button"
                disabled={answered}
                onClick={() => onSelect(index)}
                className={cn(
                  "w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30"
                    : answered
                      ? "border-border bg-muted/30 opacity-50"
                      : "border-border bg-muted/50 hover:bg-muted hover:border-primary/40 cursor-pointer active:scale-[0.98]"
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
