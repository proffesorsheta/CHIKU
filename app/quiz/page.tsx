"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, RotateCcw, HeartCrack, Frown } from "lucide-react";
import { QuizCard } from "@/components/quiz-card";
import { quizQuestions } from "@/lib/data";

const funnyFailMessages = [
  "Hmm... not loving me enough? (just kidding... or am I?)",
  "You missed a few! Clearly we need more date nights...",
  "Almost there! Maybe you need to stare at me more closely?",
  "Wrong answers detected! Am I that mysterious?",
  "You need to pay more attention to your better half!",
  "Looks like someone needs a refresher course in ME!",
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);

  const handleSelect = (index: number) => {
    if (saved) return;
    setSelectedAnswer(index);
  };

  const handleSave = () => {
    if (selectedAnswer === null) return;
    const updated = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(updated);
    setSaved(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setSaved(false);
    } else {
      // Calculate score
      let score = 0;
      const finalAnswers = { ...answers, [currentQuestion]: answers[currentQuestion] ?? selectedAnswer };
      for (let i = 0; i < quizQuestions.length; i++) {
        const userAnswer = finalAnswers[i];
        if (userAnswer !== undefined && quizQuestions[i].correctAnswers.includes(userAnswer)) {
          score++;
        }
      }
      const passed = score >= 9;

      if (passed) {
        try {
          localStorage.setItem("loveQuizPassed", "true");
          localStorage.setItem(
            "loveQuizAnswers",
            JSON.stringify(finalAnswers)
          );
        } catch {
          // localStorage not available
        }
      }

      setResult({ score, passed });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setSaved(false);
    setResult(null);
    try {
      localStorage.removeItem("loveQuizPassed");
      localStorage.removeItem("loveQuizAnswers");
    } catch {
      // localStorage not available
    }
  };

  // --- FAIL screen ---
  if (result && !result.passed) {
    const failMsg =
      funnyFailMessages[Math.floor(Math.random() * funnyFailMessages.length)];

    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <HeartCrack className="w-20 h-20 text-primary/60" />
            </div>

            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Oops!
            </h2>

            <div className="bg-primary/5 rounded-2xl p-4 mb-4 border border-primary/10">
              <p className="text-2xl font-bold text-primary mb-1">
                {result.score} / {quizQuestions.length}
              </p>
              <p className="text-sm text-muted-foreground">correct answers</p>
            </div>

            <div className="bg-secondary rounded-2xl p-4 mb-6 border border-border">
              <Frown className="w-8 h-8 mx-auto mb-2 text-primary/70" />
              <p className="text-foreground font-medium leading-relaxed text-pretty">
                {failMsg}
              </p>
            </div>

            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              You need at least <span className="font-bold text-primary">9 out of 10</span> correct to unlock the surprise. Try again!
            </p>

            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --- PASS screen ---
  if (result && result.passed) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
            <Heart className="w-20 h-20 mx-auto mb-4 text-primary fill-primary animate-heartbeat" />

            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              You Know Me So Well!
            </h2>

            <div className="bg-primary/10 rounded-2xl p-4 mb-4 border border-primary/20">
              <p className="text-3xl font-bold text-primary mb-1">
                {result.score} / {quizQuestions.length}
              </p>
              <p className="text-sm text-muted-foreground">
                correct answers
              </p>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
              You really do know me inside and out. Your surprise is waiting for you...
            </p>

            <Link
              href="/final"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              See My Surprise
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // --- QUIZ flow ---
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
                : "See My Results"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
