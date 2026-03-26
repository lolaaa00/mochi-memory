import { useGameState } from "@/hooks/useGameState";
import StartScreen from "@/components/StartScreen";
import GameBoard from "@/components/GameBoard";
import WinScreen from "@/components/WinScreen";
import LevelCompleteScreen from "@/components/LevelCompleteScreen";
import LostScreen from "@/components/LostScreen";
import Particles from "@/components/Particles";

const Index = () => {
  const { phase, level, levelConfig, cards, moves, time, flipCard, startGame, restart, nextLevel, retryLevel, totalLevels } = useGameState();

  return (
    <div className="bg-gradient-animated min-h-screen relative overflow-hidden">
      <Particles />
      <div className="relative z-10">
        {phase === "start" && <StartScreen onStart={startGame} />}
        {(phase === "preview" || phase === "playing") && (
          <GameBoard cards={cards} moves={moves} time={time} level={level} levelConfig={levelConfig} onFlip={flipCard} />
        )}
        {phase === "levelComplete" && (
          <LevelCompleteScreen level={level} moves={moves} time={time} onNext={nextLevel} />
        )}
        {phase === "won" && <WinScreen moves={moves} time={time} level={level} onRestart={restart} />}
        {phase === "lost" && <LostScreen level={level} onRetry={retryLevel} onRestart={restart} />}
      </div>
    </div>
  );
};

export default Index;
