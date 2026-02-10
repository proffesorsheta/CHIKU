"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, RotateCcw } from "lucide-react";
import { QuizCard } from "@/components/quiz-card";
import { quizQuestions } from "@/lib/data";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) {
      try {
        localStorage.setItem("loveQuizScore", String(score));
      } catch {
        // localStorage not available
      }
    }
  }, [finished, score]);

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  const getResultMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return "You know me perfectly! We are truly soulmates.";
    if (percentage >= 70) return "You know me so well! Our connection is beautiful.";
    if (percentage >= 40) return "Not bad! We still have so much to discover together.";
    return "Looks like we have a lot more to learn about each other!";
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
            <p className="text-4xl font-bold text-primary mb-2">
              {score} / {quizQuestions.length}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {getResultMessage()}
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors bg-transparent"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
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
          Let us see how deep our connection goes...
        </p>
      </div>

      <QuizCard
        question={quizQuestions[currentQuestion].question}
        options={quizQuestions[currentQuestion].options}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
        selectedAnswer={selectedAnswer}
        correctAnswer={quizQuestions[currentQuestion].answer}
        onSelect={handleSelect}
      />

      {selectedAnswer !== null && (
        <button
          type="button"
          onClick={handleNext}
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 animate-fade-in-up"
        >
          {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </section>
  );
}
