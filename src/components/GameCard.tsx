import { MochiCard } from "@/lib/mochi-data";
import { useState } from "react";
import logo from "@/assets/logo.png";

interface Props {
  card: MochiCard;
  onClick: () => void;
}

export default function GameCard({ card, onClick }: Props) {
  const [tapped, setTapped] = useState(false);
  const isVisible = card.isFlipped || card.isMatched;

  const handleClick = () => {
    if (card.isMatched || card.isFlipped) return;
    setTapped(true);
    setTimeout(() => setTapped(false), 150);
    onClick();
  };

  return (
    <div
      className="relative w-full aspect-square cursor-pointer"
      style={{ perspective: "600px" }}
      onClick={handleClick}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isVisible ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Back (face down) — logo */}
        <div
          className={`absolute inset-0 rounded-2xl card-back-gradient flex items-center justify-center backface-hidden
            ${!isVisible ? "glow-primary" : ""}
            ${tapped ? "scale-95" : "scale-100"}
          `}
          style={{
            backfaceVisibility: "hidden",
            transition: "transform 0.15s ease, box-shadow 0.3s ease",
          }}
        >
          <img
            src={logo}
            alt="Card back"
            className="w-8 h-8 md:w-10 md:h-10 opacity-60 invert"
            draggable={false}
          />
        </div>

        {/* Front (face up) */}
        <div
          className={`absolute inset-0 rounded-2xl glass-card flex items-center justify-center p-2
            ${card.isMatched ? "glow-match" : "glow-secondary"}
          `}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            animation: card.isMatched ? "matchBurst 0.6s ease-out" : undefined,
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-contain drop-shadow-lg"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
