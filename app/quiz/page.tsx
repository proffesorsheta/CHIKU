"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, RotateCcw } from "lucide-react";
import { QuizCard } from "@/components/quiz-card";
import { quizQuestions } from "@/lib/data";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (saved) return;
    setSelectedAnswer(index);
  };

  const handleSave = () => {
    if (selectedAnswer === null) return;
    const updated = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(updated);
    setSaved(true);
    try {
      localStorage.setItem("loveQuizAnswers", JSON.stringify(updated));
    } catch {
      // localStorage not available
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setSaved(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setSaved(false);
    setFinished(false);
    try {
      localStorage.removeItem("loveQuizAnswers");
    } catch {
      // localStorage not available
    }
  };

  if (finished) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary fill-primary animate-heartbeat" />
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Quiz Complete!
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              All your answers have been saved. Now sit tight and wait for the
              surprise...
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors bg-transparent"
              >
                <RotateCcw className="w-4 h-4" />
                Take Again
              </button>
              <Link
                href="/memories"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Our Memories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          How Well Do You Know Me?
        </h1>
        <p className="text-muted-foreground">
          Pick your answer for each question
        </p>
      </div>

      <QuizCard
        question={quizQuestions[currentQuestion].question}
        options={quizQuestions[currentQuestion].options}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
        selectedAnswer={selectedAnswer}
        locked={saved}
        onSelect={handleSelect}
      />

      {/* Save confirmation + next */}
      <div className="mt-6 w-full max-w-lg mx-auto">
        {!saved ? (
          <button
            type="button"
            onClick={handleSave}
            disabled={selectedAnswer === null}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Save Answer
            <Heart className="w-4 h-4 fill-primary-foreground" />
          </button>
        ) : (
          <div className="animate-fade-in-up text-center">
            <div className="bg-primary/10 rounded-2xl p-4 mb-4 border border-primary/20">
              <p className="text-primary font-semibold text-lg">
                {"Answer saved \u2764\uFE0F"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {currentQuestion < quizQuestions.length - 1
                ? "Next"
                : "Finish Quiz"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
