import mochiSmile from "@/assets/mochi_smile.png";
import { getLevelConfig } from "@/lib/levels";

interface Props {
  level: number;
  moves: number;
  time: number;
  onNext: () => void;
}

export default function LevelCompleteScreen({ level, moves, time, onNext }: Props) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const nextConfig = getLevelConfig(level + 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 relative">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(140 70% 60% / 0.5), transparent 70%)", animation: "pulseRing 2s ease-in-out infinite" }}
      />

      <div className="floating" style={{ animation: "slideUp 0.5s ease-out both" }}>
        <img src={mochiSmile} alt="Mochi" className="w-28 h-28 drop-shadow-2xl" />
      </div>

      <h1
        className="font-display text-4xl md:text-5xl font-bold text-secondary"
        style={{ animation: "titleGlow 2s ease-in-out infinite, slideUp 0.5s ease-out 0.15s both" }}
      >
        Level {level} Clear! ⭐
      </h1>

      <div className="glass-card-strong rounded-2xl px-7 py-4 flex gap-8 text-center glow-match"
        style={{ animation: "slideUp 0.5s ease-out 0.3s both" }}
      >
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Moves</p>
          <p className="text-2xl font-bold text-foreground">{moves}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Time</p>
          <p className="text-2xl font-bold text-foreground">
            {mins}:{secs.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Next level preview */}
      <div className="glass-card rounded-xl px-5 py-3 text-center max-w-xs"
        style={{ animation: "slideUp 0.5s ease-out 0.45s both" }}
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next Up</p>
        <p className="font-display text-secondary text-sm">{nextConfig.name}</p>
        <p className="text-xs text-muted-foreground mt-1">{nextConfig.description}</p>
      </div>

      <button
        onClick={onNext}
        className="mt-2 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xl
          glow-primary hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
        style={{ animation: "slideUp 0.5s ease-out 0.6s both" }}
      >
        <span className="relative z-10">Next Level →</span>
        <div className="absolute inset-0 shimmer" />
      </button>
    </div>
  );
}
