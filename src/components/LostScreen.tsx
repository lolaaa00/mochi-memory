import mochiDead from "@/assets/mochi_dead.png";

interface Props {
  level: number;
  onRetry: () => void;
  onRestart: () => void;
}

export default function LostScreen({ level, onRetry, onRestart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-6 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(0 100% 65% / 0.4), transparent 70%)" }}
      />

      <div className="floating" style={{ animation: "slideUp 0.5s ease-out both" }}>
        <img src={mochiDead} alt="Mochi" className="w-28 h-28 drop-shadow-2xl" />
      </div>

      <h1
        className="font-display text-4xl md:text-5xl font-bold text-destructive"
        style={{ animation: "slideUp 0.5s ease-out 0.15s both" }}
      >
        Time's Up! ⏰
      </h1>

      <p className="text-muted-foreground text-center" style={{ animation: "slideUp 0.5s ease-out 0.3s both" }}>
        Level {level} got the best of you this time...
      </p>

      <div className="flex gap-3 mt-2" style={{ animation: "slideUp 0.5s ease-out 0.45s both" }}>
        <button
          onClick={onRetry}
          className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg
            glow-primary hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
        >
          <span className="relative z-10">Retry</span>
          <div className="absolute inset-0 shimmer" />
        </button>
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-2xl glass-card text-foreground font-semibold text-lg
            hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Menu
        </button>
      </div>
    </div>
  );
}
