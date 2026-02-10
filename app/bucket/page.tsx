"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ListChecks, Heart } from "lucide-react";
import { bucketListItems } from "@/lib/data";

export default function BucketListPage() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("loveBucketList");
      if (saved) {
        setChecked(JSON.parse(saved));
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const handleToggle = (id: number) => {
    setChecked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("loveBucketList", JSON.stringify(updated));
      } catch {
        // localStorage not available
      }
      return updated;
    });
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <ListChecks className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 text-balance">
            Our Bucket List
          </h1>
          <p className="text-muted-foreground text-lg">
            {completedCount} of {bucketListItems.length} dreams fulfilled
          </p>
          {/* Progress bar */}
          <div className="mt-4 w-full max-w-xs mx-auto h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / bucketListItems.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-10">
          {bucketListItems.map((item, index) => (
            <label
              key={item.id}
              className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={!!checked[item.id]}
                  onChange={() => handleToggle(item.id)}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 rounded-lg border-2 border-border peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
                  {checked[item.id] && (
                    <Heart className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground" />
                  )}
                </div>
              </div>
              <span
                className={`font-medium transition-all ${
                  checked[item.id]
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/final"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            The Final Surprise
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
