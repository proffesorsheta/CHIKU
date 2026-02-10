"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { CloudRain, Heart, Flame, Sun, ArrowRight, Mail } from "lucide-react";
import { LetterModal } from "@/components/letter-modal";
import { letters } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  "cloud-rain": <CloudRain className="w-8 h-8" />,
  heart: <Heart className="w-8 h-8" />,
  flame: <Flame className="w-8 h-8" />,
  sun: <Sun className="w-8 h-8" />,
};

export default function LettersPage() {
  const [openLetter, setOpenLetter] = useState<number | null>(null);

  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Letters For You
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Open the right letter based on how you feel. I wrote each one
            just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {letters.map((letter, index) => (
            <button
              key={letter.mood}
              type="button"
              onClick={() => setOpenLetter(index)}
              className="group text-left p-6 rounded-3xl border-2 border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {iconMap[letter.icon]}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                Open {letter.mood}
              </h3>
              <p className="text-sm text-muted-foreground">
                Tap to read your letter
              </p>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/bucket"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Our Bucket List
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {openLetter !== null && (
        <LetterModal
          mood={letters[openLetter].mood}
          message={letters[openLetter].message}
          onClose={() => setOpenLetter(null)}
        />
      )}
    </section>
  );
}
