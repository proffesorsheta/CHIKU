"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Heart, Volume2, VolumeX, Home } from "lucide-react";
import confetti from "canvas-confetti";

export default function FinalPage() {
  const [answered, setAnswered] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
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

  const handleYes = () => {
    setAnswered(true);
    fireConfetti();
  };

  const toggleMusic = () => {
    if (!audioRef) {
      // Create a simple oscillator-based tone as background music
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);

        // Play a gentle melody
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33];
        let time = ctx.currentTime;
        for (const note of notes) {
          osc.frequency.setValueAtTime(note, time);
          time += 0.5;
        }
        osc.frequency.setValueAtTime(523.25, time);
        osc.start();
        osc.stop(time + 1);

        setMusicPlaying(true);
        setTimeout(() => setMusicPlaying(false), (notes.length + 1) * 500);
      }
      return;
    }
    if (musicPlaying) {
      audioRef.pause();
      setMusicPlaying(false);
    } else {
      audioRef.play();
      setMusicPlaying(true);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative floating hearts */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/5 fill-primary/5 animate-float"
            style={{
              width: `${16 + i * 6}px`,
              height: `${16 + i * 6}px`,
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12 animate-fade-in-up">
          <Heart className="w-20 h-20 mx-auto mb-6 text-primary fill-primary animate-pulse-heart" />

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            You Mean Everything to Me
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8 text-lg text-pretty">
            From our first moment to this very second, every heartbeat has been
            for you. You are my dream come true, my best adventure, and my
            forever love. I do not need the whole world \u2014 just you.
          </p>

          {!answered ? (
            <button
              type="button"
              onClick={handleYes}
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-5 h-5 fill-primary-foreground" />
              Will you always choose me?
            </button>
          ) : (
            <div className="animate-fade-in-up">
              <div className="bg-primary/10 rounded-2xl p-6 mb-6">
                <Heart className="w-12 h-12 mx-auto text-primary fill-primary animate-heartbeat mb-3" />
                <p className="font-serif text-2xl font-bold text-foreground mb-2">
                  I knew it!
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Thank you for choosing me, today and always. You are the
                  greatest love of my life, and I will spend forever making sure
                  you know it.
                </p>
              </div>

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
                  {musicPlaying ? "Stop Music" : "Play a Tune"}
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

        {/* Music toggle in corner */}
        <button
          type="button"
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 p-3 bg-card rounded-full shadow-lg border border-border text-primary hover:scale-110 transition-all bg-transparent"
          aria-label={musicPlaying ? "Mute music" : "Play music"}
        >
          {musicPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>
    </section>
  );
}
