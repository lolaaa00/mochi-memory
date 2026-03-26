import { useState, useEffect, useCallback, useRef } from "react";
import { MochiCard, createDeck } from "@/lib/mochi-data";
import { LevelConfig, getLevelConfig, LEVELS } from "@/lib/levels";
import { playFlipSound, playMatchSound, playMismatchSound, playWinSound, playSwapSound, playLevelUpSound, startBgMusic, stopBgMusic } from "@/lib/sounds";

export type GamePhase = "start" | "preview" | "playing" | "won" | "lost" | "levelComplete";

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<MochiCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [locked, setLocked] = useState(false);
  const [levelConfig, setLevelConfig] = useState<LevelConfig>(getLevelConfig(1));
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const swapRef = useRef<ReturnType<typeof setInterval>>();

  const startLevel = useCallback((lvl: number) => {
    const config = getLevelConfig(lvl);
    setLevelConfig(config);
    setLevel(lvl);
    const deck = createDeck(config.pairs);
    setCards(deck);
    setFlippedIds([]);
    setMoves(0);
    setTime(0);
    setLocked(true);
    setPhase("preview");
    startBgMusic();

    // Show all cards for preview
    setCards(deck.map(c => ({ ...c, isFlipped: true })));
    setTimeout(() => {
      setCards(deck.map(c => ({ ...c, isFlipped: false })));
      setLocked(false);
      setPhase("playing");
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);

      // Start swap mechanic if enabled
      if (config.swapEnabled && config.swapInterval > 0) {
        swapRef.current = setInterval(() => {
          setCards(prev => {
            const unmatched = prev.filter(c => !c.isMatched && !c.isFlipped);
            if (unmatched.length < 2) return prev;
            const idxA = Math.floor(Math.random() * unmatched.length);
            let idxB = Math.floor(Math.random() * (unmatched.length - 1));
            if (idxB >= idxA) idxB++;
            const cardA = unmatched[idxA];
            const cardB = unmatched[idxB];
            playSwapSound();
            return prev.map(c => {
              if (c.id === cardA.id) return { ...cardB, id: cardA.id };
              if (c.id === cardB.id) return { ...cardA, id: cardB.id };
              return c;
            });
          });
        }, config.swapInterval);
      }
    }, config.previewTime);
  }, []);

  const startGame = useCallback(() => {
    startLevel(1);
  }, [startLevel]);

  const flipCard = useCallback((id: number) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedIds.length >= 2) return;

    playFlipSound();
    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = newFlipped.map(fid => newCards.find(c => c.id === fid)!);
      
      if (a.mochiId === b.mochiId) {
        setTimeout(() => {
          playMatchSound();
          setCards(prev => prev.map(c => 
            c.mochiId === a.mochiId ? { ...c, isMatched: true } : c
          ));
          setFlippedIds([]);
          setLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          playMismatchSound();
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
          setLocked(false);
        }, 800);
      }
    }
  }, [cards, flippedIds, locked]);

  // Check win
  useEffect(() => {
    if (phase === "playing" && cards.length > 0 && cards.every(c => c.isMatched)) {
      clearInterval(timerRef.current);
      clearInterval(swapRef.current);
      if (level < LEVELS.length) {
        playLevelUpSound();
        setTimeout(() => setPhase("levelComplete"), 600);
      } else {
        playWinSound();
        setTimeout(() => setPhase("won"), 600);
      }
    }
  }, [cards, phase, level]);

  // Check time limit
  useEffect(() => {
    if (phase === "playing" && levelConfig.timeLimit > 0 && time >= levelConfig.timeLimit) {
      clearInterval(timerRef.current);
      clearInterval(swapRef.current);
      setPhase("lost");
    }
  }, [time, phase, levelConfig]);

  const nextLevel = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(swapRef.current);
    startLevel(level + 1);
  }, [level, startLevel]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(swapRef.current);
      stopBgMusic();
    };
  }, []);

  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(swapRef.current);
    stopBgMusic();
    setPhase("start");
  }, []);

  const retryLevel = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(swapRef.current);
    startLevel(level);
  }, [level, startLevel]);

  return { phase, level, levelConfig, cards, moves, time, flipCard, startGame, restart, nextLevel, retryLevel, totalLevels: LEVELS.length };
}
