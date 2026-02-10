"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemoryCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
}

export function MemoryCard({ title, description, color, index }: MemoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative w-full text-left p-6 rounded-3xl border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in-up",
          color
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <Heart className="w-8 h-8 text-primary/40 fill-primary/20 mb-3 group-hover:fill-primary/40 transition-colors" />
        <h3 className="font-serif text-lg font-bold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <span className="mt-3 inline-block text-xs font-medium text-primary">
          Tap to read more
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="bg-card rounded-3xl shadow-2xl border border-border p-8 max-w-md w-full animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
            role="document"
          >
            <div className="flex items-start justify-between mb-4">
              <Heart className="w-10 h-10 text-primary fill-primary animate-pulse-heart" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground bg-transparent"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
