"use client";

import { X, Heart } from "lucide-react";

interface LetterModalProps {
  mood: string;
  message: string;
  onClose: () => void;
}

export function LetterModal({ mood, message, onClose }: LetterModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={mood}
    >
      <div
        className="bg-card rounded-3xl shadow-2xl border border-border p-8 max-w-lg w-full animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => {}}
        role="document"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-sm font-medium text-primary">{mood}</span>
            <h3 className="font-serif text-2xl font-bold text-foreground mt-1">
              A Letter For You
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground bg-transparent"
            aria-label="Close letter"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
          <p className="text-foreground leading-relaxed text-base italic">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-primary">
          <Heart className="w-4 h-4 fill-primary" />
          <span className="text-sm font-medium">With all my love</span>
          <Heart className="w-4 h-4 fill-primary" />
        </div>
      </div>
    </div>
  );
}
