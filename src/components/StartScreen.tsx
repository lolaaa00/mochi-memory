import mochiSmile from "@/assets/mochi_smile.png";
import mochiLove from "@/assets/mochi_love.png";
import mochiEat from "@/assets/mochi_eat.png";
import { LEVELS } from "@/lib/levels";

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6 relative">
      {/* Decorative floating mochis */}
      <img
        src={mochiLove}
        alt=""
        className="absolute top-[10%] left-[8%] w-16 h-16 opacity-30 floating-slow"
        style={{ animationDelay: "0.5s" }}
      />
      <img
        src={mochiEat}
        alt=""
        className="absolute top-[15%] right-[10%] w-14 h-14 opacity-25 floating-slow"
        style={{ animationDelay: "1.2s" }}
      />
      <img
        src={mochiSmile}
        alt=""
        className="absolute bottom-[18%] left-[12%] w-12 h-12 opacity-20 floating-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(252 100% 53% / 0.6), transparent 70%)" }}
      />
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(264 100% 82% / 0.5), transparent 70%)" }}
      />

      {/* Main Mochi */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, hsl(264 100% 82% / 0.5), transparent 60%)",
            transform: "scale(2.5)",
            animation: "pulseRing 3s ease-in-out infinite",
          }}
        />
        <div className="floating">
          <img src={mochiSmile} alt="Mochi" className="w-36 h-36 md:w-44 md:h-44 drop-shadow-2xl relative z-10" />
        </div>
      </div>

      {/* Title — stacked like reference */}
      <div className="text-center" style={{ animation: "titleGlow 3s ease-in-out infinite" }}>
        <h1 className="font-display text-3xl md:text-5xl text-muted-foreground leading-relaxed">
          Mochi
        </h1>
        <h1 className="font-display text-3xl md:text-5xl text-secondary leading-relaxed glow-text-primary">
          Memory!
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-muted-foreground text-center text-lg max-w-xs" style={{ animation: "slideUp 0.8s ease-out 0.3s both" }}>
        Flip, match, and conquer {LEVELS.length} levels! ✨
      </p>

      {/* Level preview pills */}
      <div className="flex gap-2 flex-wrap justify-center max-w-xs" style={{ animation: "slideUp 0.8s ease-out 0.5s both" }}>
        {LEVELS.map((lvl) => (
          <span
            key={lvl.level}
            className="glass-card rounded-full px-3 py-1 text-xs text-muted-foreground"
          >
            Lv.{lvl.level}
          </span>
        ))}
      </div>

      {/* Play button */}
      <button
        onClick={onStart}
        className="mt-4 px-12 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xl
          glow-primary hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
        style={{ animation: "slideUp 0.8s ease-out 0.7s both" }}
      >
        <span className="relative z-10">Play</span>
        <div className="absolute inset-0 shimmer" />
      </button>
    </div>
  );
}
