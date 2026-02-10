"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { reasons } from "@/lib/data";

export default function ReasonsPage() {
  const [revealedCount, setRevealedCount] = useState(1);

  const handleRevealNext = () => {
    if (revealedCount < reasons.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  const allRevealed = revealedCount >= reasons.length;

  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Why I Love You
          </h1>
          <p className="text-muted-foreground text-lg">
            {revealedCount} of {reasons.length} reasons revealed
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          {reasons.slice(0, revealedCount).map((reason, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary mb-1 block">
                  Reason #{index + 1}
                </span>
                <p className="text-foreground font-medium leading-relaxed">
                  {reason}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center flex flex-col items-center gap-4">
          {!allRevealed ? (
            <button
              type="button"
              onClick={handleRevealNext}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              Reveal Next Reason
            </button>
          ) : (
            <div className="animate-fade-in-up">
              <p className="text-muted-foreground mb-4 text-lg font-medium">
                And there are a million more reasons...
              </p>
              <Link
                href="/letters"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Read My Letters
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
