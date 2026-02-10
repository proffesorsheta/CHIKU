"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, RotateCw } from "lucide-react";
import { spinWheelItems } from "@/lib/data";

const COLORS = [
  "hsl(340, 65%, 65%)",
  "hsl(350, 80%, 72%)",
  "hsl(30, 40%, 80%)",
  "hsl(340, 65%, 65%)",
  "hsl(350, 80%, 72%)",
  "hsl(30, 40%, 80%)",
  "hsl(340, 65%, 65%)",
  "hsl(350, 80%, 72%)",
];

export default function SpinPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [resultEmoji, setResultEmoji] = useState<string>("");
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / spinWheelItems.length;

  const handleSpin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const randomExtra = Math.random() * 360;
    const totalSpin = 1440 + randomExtra; // 4 full spins + random
    const newRotation = rotation + totalSpin;
    setRotation(newRotation);

    setTimeout(() => {
      // Calculate which segment landed at the top (pointer at top)
      const finalAngle = newRotation % 360;
      // The pointer is at the top (0 degrees). The wheel rotates clockwise.
      // We need to find which segment is at the top after rotation.
      const adjustedAngle = (360 - finalAngle + segmentAngle / 2) % 360;
      const index = Math.floor(adjustedAngle / segmentAngle) % spinWheelItems.length;
      setResult(spinWheelItems[index].label);
      setResultEmoji(spinWheelItems[index].emoji);
      setSpinning(false);
    }, 3500);
  }, [spinning, rotation, segmentAngle]);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 text-balance">
          Spin the Love Wheel
        </h1>
        <p className="text-muted-foreground text-lg">
          Give it a spin and see what love has in store for you!
        </p>
      </div>

      <div className="relative mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderTop: "24px solid hsl(340, 65%, 65%)",
            }}
          />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-primary shadow-2xl relative overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              : "none",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {spinWheelItems.map((item, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const x1 = 100 + 100 * Math.cos(startRad);
              const y1 = 100 + 100 * Math.sin(startRad);
              const x2 = 100 + 100 * Math.cos(endRad);
              const y2 = 100 + 100 * Math.sin(endRad);
              const largeArc = segmentAngle > 180 ? 1 : 0;

              const midAngle = startAngle + segmentAngle / 2;
              const midRad = (midAngle * Math.PI) / 180;
              const textX = 100 + 60 * Math.cos(midRad);
              const textY = 100 + 60 * Math.sin(midRad);

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={COLORS[i % COLORS.length]}
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="8"
                    fontWeight="600"
                    fill="white"
                    transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                  >
                    {item.emoji}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="18" fill="white" stroke="hsl(340, 65%, 65%)" strokeWidth="2" />
            <text x="100" y="100" textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="700" fill="hsl(340, 65%, 65%)">
              LOVE
            </text>
          </svg>
        </div>
      </div>

      {/* Spin button */}
      <button
        type="button"
        onClick={handleSpin}
        disabled={spinning}
        className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed mb-6"
      >
        <RotateCw className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
        {spinning ? "Spinning..." : "Spin!"}
      </button>

      {/* Result popup */}
      {result && !spinning && (
        <div className="w-full max-w-sm mx-auto animate-fade-in-up">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-8 text-center">
            <span className="text-5xl mb-4 block">{resultEmoji}</span>
            <p className="font-serif text-2xl font-bold text-foreground mb-2">
              You got:
            </p>
            <p className="text-xl text-primary font-semibold mb-4">{result}</p>
            <p className="text-muted-foreground text-sm">
              Time to make it happen, lovebirds!
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/letters"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
          Read My Letters
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
