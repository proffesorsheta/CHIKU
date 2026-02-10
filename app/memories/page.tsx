"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MemoryCard } from "@/components/memory-card";
import { memories } from "@/lib/data";

export default function MemoriesPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Our Beautiful Memories
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Every moment with you is a treasure. Tap on a card to relive the
            memory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.title}
              title={memory.title}
              description={memory.description}
              color={memory.color}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/reasons"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Why I Love You
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
