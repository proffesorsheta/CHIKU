"use client";

import { useState, useEffect } from "react";
import { Heart, Check, RotateCcw, ShieldCheck, Trash2 } from "lucide-react";
import { quizQuestions } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [passed, setPassed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("loveQuizAnswers");
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      const savedPassed = localStorage.getItem("loveQuizPassed");
      if (savedPassed === "true") {
        setPassed(true);
      }
    } catch {
      // localStorage not available
    }
    setLoaded(true);
  }, []);

  const handlePass = () => {
    try {
      localStorage.setItem("loveQuizPassed", "true");
    } catch {
      // localStorage not available
    }
    setPassed(true);
  };

  const handleTryAgain = () => {
    try {
      localStorage.setItem("loveQuizPassed", "false");
      localStorage.removeItem("loveQuizAnswers");
    } catch {
      // localStorage not available
    }
    setPassed(false);
    setAnswers({});
  };

  const handleClearAll = () => {
    try {
      localStorage.removeItem("loveQuizAnswers");
      localStorage.removeItem("loveQuizPassed");
    } catch {
      // localStorage not available
    }
    setAnswers({});
    setPassed(false);
  };

  if (!loaded) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </section>
    );
  }

  const hasAnswers = Object.keys(answers).length > 0;

  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Secret Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Only you should see this page. Review her answers below.
          </p>
          {passed && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              <Check className="w-4 h-4" />
              She has passed! Final page is unlocked.
            </div>
          )}
        </div>

        {!hasAnswers ? (
          <div className="bg-card rounded-3xl shadow-lg border border-border p-8 text-center animate-fade-in-up">
            <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground text-lg">
              No quiz answers saved yet. She needs to take the quiz first!
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-10">
              {quizQuestions.map((q, index) => {
                const herAnswer = answers[index];
                const hasAnswer = herAnswer !== undefined;
                const isCorrect = hasAnswer && herAnswer === q.answer;

                return (
                  <div
                    key={index}
                    className={cn(
                      "bg-card rounded-2xl shadow-sm border p-5 animate-fade-in-up",
                      hasAnswer
                        ? isCorrect
                          ? "border-green-200"
                          : "border-accent/40"
                        : "border-border"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {q.question}
                      </h3>
                    </div>

                    {hasAnswer ? (
                      <div className="ml-10">
                        <p className="text-sm text-muted-foreground mb-1">
                          Her answer:
                        </p>
                        <p
                          className={cn(
                            "font-semibold text-base",
                            isCorrect ? "text-green-700" : "text-accent"
                          )}
                        >
                          {q.options[herAnswer]}
                          {isCorrect ? " \u2714" : " \u2718"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Correct answer:{" "}
                          <span className="font-medium text-foreground">
                            {q.options[q.answer]}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="ml-10 text-sm text-muted-foreground italic">
                        Not answered yet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Admin actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {!passed ? (
                <>
                  <button
                    type="button"
                    onClick={handlePass}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    {"Pass \u2764\uFE0F"}
                  </button>
                  <button
                    type="button"
                    onClick={handleTryAgain}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-colors bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-colors bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset & Try Again
                </button>
              )}
            </div>
          </>
        )}

        {/* Clear all data */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors bg-transparent"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all saved data
          </button>
        </div>
      </div>
    </section>
  );
}
