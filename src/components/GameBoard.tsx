import { MochiCard } from "@/lib/mochi-data";
import { LevelConfig } from "@/lib/levels";
import GameCard from "./GameCard";

interface Props {
  cards: MochiCard[];
  moves: number;
  time: number;
  level: number;
  levelConfig: LevelConfig;
  onFlip: (id: number) => void;
}

export default function GameBoard({ cards, moves, time, level, levelConfig, onFlip }: Props) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const timeLeft = levelConfig.timeLimit > 0 ? levelConfig.timeLimit - time : null;
  const isUrgent = timeLeft !== null && timeLeft <= 10;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-4">
      {/* Top bar */}
      <div className="glass-card rounded-2xl px-5 py-2.5 flex items-center gap-6 mb-4 glow-secondary">
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Level</p>
          <p className="text-lg font-bold text-secondary">{level}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Moves</p>
          <p className="text-lg font-bold text-foreground">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {timeLeft !== null ? "Left" : "Time"}
          </p>
          <p className={`text-lg font-bold ${isUrgent ? "text-destructive" : "text-foreground"}`}
            style={isUrgent ? { animation: "titleGlow 0.5s ease-in-out infinite", textShadow: "0 0 10px hsl(0 100% 65% / 0.8)" } : undefined}
          >
            {timeLeft !== null
              ? `${Math.floor(Math.max(0, timeLeft) / 60)}:${(Math.max(0, timeLeft) % 60).toString().padStart(2, "0")}`
              : `${mins}:${secs.toString().padStart(2, "0")}`
            }
          </p>
        </div>
      </div>

      {/* Level name */}
      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
        <span className="font-display text-secondary text-sm">{levelConfig.name}</span>
        {levelConfig.swapEnabled && <span className="text-[10px] glass-card rounded-full px-2 py-0.5">🔀 Swaps!</span>}
      </p>

      {/* Grid */}
      <div
        className="grid gap-2.5 w-full"
        style={{
          gridTemplateColumns: `repeat(${levelConfig.cols}, 1fr)`,
          maxWidth: levelConfig.cols === 5 ? "28rem" : "22rem",
        }}
      >
        {cards.map(card => (
          <GameCard key={card.id} card={card} onClick={() => onFlip(card.id)} />
        ))}
      </div>
    </div>
  );
}
