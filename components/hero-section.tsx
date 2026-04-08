"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      {/* Floating hearts background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 fill-primary/10 animate-float"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🎉</span>
            <Heart className="w-16 h-16 text-primary fill-primary animate-pulse-heart" />
            <span className="text-4xl">🎂</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-2 text-balance">
            Happy Birthday
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-6 text-balance">
            Our Love Story
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            A special birthday celebration of our most beautiful moments, the reasons I
            adore you, and all the dreams we share together. You deserve all the love and joy in this world.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Heart className="w-5 h-5 fill-primary-foreground" />
            Start the Quiz
          </Link>
        </div>

        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { label: "Love Quiz", href: "/quiz", icon: "?" },
            { label: "Memories", href: "/memories", icon: "\u2661" },
            { label: "Letters", href: "/letters", icon: "\u2709" },
            { label: "Forever", href: "/final", icon: "\u221E" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
