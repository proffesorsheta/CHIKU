"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, ArrowRight, RotateCcw, Check, X } from "lucide-react";
import { QuizCard } from "@/components/quiz-card";
import { quizQuestions } from "@/lib/data";
import confetti from "canvas-confetti";

type Phase = "selecting" | "waiting" | "result";

const correctMessages = [
  "You know me so well!",
  "Soulmate energy right there!",
  "Perfectly matched hearts!",
  "See? You just get me!",
  "Our connection is unreal!",
];

const wrongMessages = [
  "Haha nice try, love!",
  "Aww, so close but so funny!",
  "Someone needs more cuddle sessions to learn!",
  "You are adorable, but wrong!",
  "More date nights needed for research!",
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("selecting");
  const [resultCorrect, setResultCorrect] = useState(false);
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

  const fireConfetti = useCallback(() => {
    const colors = ["#e88da8", "#f5c6d0", "#fdd9b5", "#ff6b8a", "#ff85a1"];
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });
  }, []);

  const handleSelect = (index: number) => {
    if (phase !== "selecting") return;
    setSelectedAnswer(index);
    setPhase("waiting");
  };

  const handleMarkCorrect = () => {
    setScore((prev) => prev + 1);
    setResultCorrect(true);
    setPhase("result");
    fireConfetti();
  };

  const handleCuteTry = () => {
    setResultCorrect(false);
    setPhase("result");
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setPhase("selecting");
      setResultCorrect(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setPhase("selecting");
    setResultCorrect(false);
    setFinished(false);
  };

  const getRandomMessage = (correct: boolean) => {
    const list = correct ? correctMessages : wrongMessages;
    return list[currentQuestion % list.length];
  };

  const getResultMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100)
      return "You know me perfectly! We are truly soulmates.";
    if (percentage >= 70)
      return "You know me so well! Our connection is beautiful.";
    if (percentage >= 40)
      return "Not bad! We still have so much to discover together.";
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
          Pick your answer, then let Krupa decide...
        </p>
        <p className="text-sm text-primary font-semibold mt-1">
          Score: {score} / {quizQuestions.length}
        </p>
      </div>

      <QuizCard
        question={quizQuestions[currentQuestion].question}
        options={quizQuestions[currentQuestion].options}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />

      {/* Waiting phase: "Let's see what Krupa says..." */}
      {phase === "waiting" && (
        <div className="mt-6 w-full max-w-lg mx-auto animate-fade-in-up">
          <div className="bg-card rounded-2xl shadow-md border border-border p-6 text-center">
            <p className="font-serif text-xl font-bold text-foreground mb-5">
              {"Let's see what Krupa says..."}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleMarkCorrect}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <Check className="w-4 h-4" />
                Mark Correct
              </button>
              <button
                type="button"
                onClick={handleCuteTry}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <X className="w-4 h-4" />
                Cute Try
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result phase: show message */}
      {phase === "result" && (
        <div className="mt-6 w-full max-w-lg mx-auto animate-fade-in-up">
          <div
            className={cn(
              "rounded-2xl shadow-md border p-6 text-center",
              resultCorrect
                ? "bg-green-50 border-green-200"
                : "bg-accent/20 border-accent/40"
            )}
          >
            <p
              className={cn(
                "font-serif text-xl font-bold mb-2",
                resultCorrect ? "text-green-700" : "text-accent"
              )}
            >
              {resultCorrect ? "Correct!" : "Oops!"}
            </p>
            <p
              className={cn(
                "mb-4 leading-relaxed",
                resultCorrect ? "text-green-600" : "text-foreground"
              )}
            >
              {getRandomMessage(resultCorrect)}
            </p>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {currentQuestion < quizQuestions.length - 1
                ? "Next Question"
                : "See Results"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
