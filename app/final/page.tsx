"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Volume2,
  VolumeX,
  Home,
  Lock,
  ArrowRight,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { quizQuestions } from "@/lib/data";

const slides = [
  {
    title: "The Day We Met",
    text: "A moment that changed everything. My heart found its home in yours.",
  },
  {
    title: "Our First Laugh",
    text: "You laughed and the whole world stopped. I knew right then you were my forever.",
  },
  {
    title: "Late Night Talks",
    text: "3 AM conversations that made me fall deeper in love with your mind and soul.",
  },
  {
    title: "Every Little Moment",
    text: "The quiet mornings, the stolen glances, the way you say my name. All of it is magic.",
  },
  {
    title: "Our Future",
    text: "Every dream I have starts and ends with you. This is just the beginning.",
  },
];

export default function FinalPage() {
  const [passed, setPassed] = useState<boolean | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const savedPassed = localStorage.getItem("loveQuizPassed");
      const answers = localStorage.getItem("loveQuizAnswers");
      setPassed(savedPassed === "true");
      if (answers) {
        setSavedAnswers(JSON.parse(answers));
      }
    } catch {
      setPassed(false);
    }
  }, []);

  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#e88da8", "#f5c6d0", "#fdd9b5", "#ff6b8a", "#ff85a1"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    fireConfetti();
    try {
      if (audioRef.current) {
        audioRef.current.play().catch(() => { });
        setMusicPlaying(true);
      }
    } catch {
      // autoplay blocked
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => { });
      setMusicPlaying(true);
    }
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!revealed) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [revealed]);

  // Loading
  if (passed === null) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Heart className="w-10 h-10 text-primary animate-pulse-heart" />
      </section>
    );
  }

  // Locked
  if (!passed) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
              This Page is Locked
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You need to get at least 9 out of 10 correct on the love quiz to
              unlock this surprise!
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/5 fill-primary/5 animate-float"
            style={{
              width: `${14 + i * 5}px`,
              height: `${14 + i * 5}px`,
              left: `${3 + i * 10}%`,
              top: `${8 + (i % 5) * 18}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {!revealed ? (
          <div className="text-center animate-fade-in-up">
            <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12">
              <Heart className="w-20 h-20 mx-auto mb-6 text-primary fill-primary animate-pulse-heart" />
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                You Passed My Heart Test
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg text-pretty">
                I always knew you were the one. Ready to see your surprise?
              </p>
              <button
                type="button"
                onClick={handleReveal}
                className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-5 h-5 fill-primary-foreground" />
                Reveal My Surprise
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* Photo Slideshow */}
            <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden mb-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-secondary h-52 flex items-center justify-center">
                  <Heart className="w-20 h-20 text-primary/30 fill-primary/20 animate-pulse-heart" />
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {currentSlide + 1} / {slides.length}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2 text-balance">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {slides[currentSlide].text}
                  </p>
                </div>

                <div className="flex items-center justify-between px-6 pb-6">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors bg-transparent"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentSlide(i)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          i === currentSlide
                            ? "bg-primary w-6"
                            : "bg-border hover:bg-primary/40"
                        )}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors bg-transparent"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Love message */}
            <div className="bg-card rounded-3xl shadow-lg border border-border p-6 md:p-8 text-center mb-6">
              <Heart className="w-10 h-10 mx-auto text-primary fill-primary animate-heartbeat mb-3" />
              <p className="font-serif text-xl font-bold text-foreground mb-2">
                You are my forever
              </p>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                Thank you for being you. For every laugh, every tear, every
                moment. I choose you, today and always. This is just the
                beginning of our beautiful story.
              </p>
            </div>

            {/* Toggle answers section */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowAnswers((prev) => !prev)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl font-semibold text-foreground shadow-sm hover:shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                {showAnswers ? "Hide Our Answers" : "See All Our Answers"}
              </button>

              {showAnswers && (
                <div className="mt-4 flex flex-col gap-3 animate-fade-in-up">
                  {quizQuestions.map((q, i) => {
                    const userAnswer = savedAnswers[i];
                    const isCorrect =
                      userAnswer !== undefined &&
                      q.correctAnswers.includes(userAnswer);
                    const userAnswerText =
                      userAnswer !== undefined
                        ? q.options[userAnswer]
                        : "Not answered";
                    const correctText = q.correctAnswers
                      .map((idx) => q.options[idx])
                      .join(" or ");

                    return (
                      <div
                        key={i}
                        className={cn(
                          "bg-card rounded-2xl border p-4 transition-all",
                          isCorrect
                            ? "border-green-200 bg-green-50/50"
                            : "border-red-200 bg-red-50/50"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5",
                              isCorrect
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-500"
                            )}
                          >
                            {isCorrect ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground mb-1">
                              Q{i + 1}. {q.question}
                            </p>
                            <p
                              className={cn(
                                "text-sm font-medium",
                                isCorrect
                                  ? "text-green-700"
                                  : "text-red-600"
                              )}
                            >
                              Your answer: {userAnswerText}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600 mt-0.5">
                                Correct: {correctText}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* J-hope Cartoon */}
            <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden mb-6 animate-fade-in-up">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src="/jhope-cartoon.jpg"
                  alt="J-hope cartoon illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-5 text-center">
                <p className="font-serif text-lg font-bold text-foreground mb-1">
                  J-hope
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Because every love story needs a little hope and sunshine
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={toggleMusic}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors bg-transparent"
              >
                {musicPlaying ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                {musicPlaying ? "Pause Music" : "Play Music"}
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <Home className="w-4 h-4" />
                Back to Start
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Persistent music toggle */}
      {revealed && (
        <button
          type="button"
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 p-3 bg-card rounded-full shadow-lg border border-border text-primary hover:scale-110 transition-all"
          aria-label={musicPlaying ? "Mute music" : "Play music"}
        >
          {musicPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      )}
    </section>
  );
}
