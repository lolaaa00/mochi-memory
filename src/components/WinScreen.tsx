import mochiLove from "@/assets/mochi_love.png";
import mochiSmile from "@/assets/mochi_smile.png";
import mochiEat from "@/assets/mochi_eat.png";
import { LEVELS } from "@/lib/levels";

interface Props {
  moves: number;
  time: number;
  level: number;
  onRestart: () => void;
}

export default function WinScreen({ moves, time, level, onRestart }: Props) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const isFullWin = level >= LEVELS.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 relative">
      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, hsl(264 100% 82% / 0.6), transparent 70%)", animation: "pulseRing 2s ease-in-out infinite" }}
      />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(140 70% 60% / 0.5), transparent 70%)", animation: "pulseRing 3s ease-in-out infinite 0.5s" }}
      />

      {/* Decorative mochis */}
      <img src={mochiEat} alt="" className="absolute top-[12%] left-[10%] w-14 h-14 opacity-30 floating-slow" style={{ animationDelay: "0.3s" }} />
      <img src={mochiSmile} alt="" className="absolute top-[8%] right-[12%] w-12 h-12 opacity-25 floating-slow" style={{ animationDelay: "1s" }} />

      {/* Main Mochi */}
      <div className="relative" style={{ animation: "slideUp 0.6s ease-out both" }}>
        <div className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(140 70% 60% / 0.3), transparent 60%)",
            transform: "scale(3)",
            animation: "pulseRing 2s ease-in-out infinite",
          }}
        />
        <div className="floating">
          <img src={mochiLove} alt="Mochi Love" className="w-36 h-36 drop-shadow-2xl relative z-10" />
        </div>
      </div>

      {/* Title */}
      <h1
        className="font-display text-5xl md:text-6xl font-bold text-secondary"
        style={{ animation: "titleGlow 2s ease-in-out infinite, slideUp 0.6s ease-out 0.2s both" }}
      >
        {isFullWin ? "Champion! 🏆" : "Level Clear! ⭐"}
      </h1>

      {isFullWin && (
        <p className="text-muted-foreground text-center text-base glow-text" style={{ animation: "slideUp 0.6s ease-out 0.3s both" }}>
          You conquered all {LEVELS.length} levels!
        </p>
      )}

      {/* Stats */}
      <div className="glass-card-strong rounded-2xl px-8 py-5 flex gap-10 text-center glow-secondary"
        style={{ animation: "slideUp 0.6s ease-out 0.4s both" }}
      >
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Level</p>
          <p className="text-3xl font-bold text-secondary font-display">{level}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Moves</p>
          <p className="text-3xl font-bold text-foreground">{moves}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">Time</p>
          <p className="text-3xl font-bold text-foreground">
            {mins}:{secs.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onRestart}
        className="mt-2 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xl
          glow-primary hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
        style={{ animation: "slideUp 0.6s ease-out 0.6s both" }}
      >
        <span className="relative z-10">{isFullWin ? "Play Again" : "Play Again"}</span>
        <div className="absolute inset-0 shimmer" />
      </button>
    </div>
  );
}
