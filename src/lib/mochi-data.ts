import mochiAngry from "@/assets/mochi_angry.png";
import mochiLove from "@/assets/mochi_love.png";
import mochiEat from "@/assets/mochi_eat.png";
import mochifly from "@/assets/mochi_fly.png";
import mochiSmile from "@/assets/mochi_smile.png";
import mochiSwim from "@/assets/mochi_swim.png";
import mochiDead from "@/assets/mochi_dead.png";

export interface MochiCard {
  id: number;
  mochiId: string;
  name: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MOCHI_TYPES = [
  { id: "love", name: "Mochi Love", image: mochiLove },
  { id: "swim", name: "Mochi Swim", image: mochiSwim },
  { id: "eat", name: "Mochi Eat", image: mochiEat },
  { id: "dead", name: "Mochi Low Battery", image: mochiDead },
  { id: "angry", name: "Mochi Angry", image: mochiAngry },
  { id: "fly", name: "Mochi Fly", image: mochifly },
  { id: "smile", name: "Mochi Smile", image: mochiSmile },
];

export function createDeck(pairCount: number): MochiCard[] {
  // Pick pairCount mochi types (cycle if needed)
  const selected: typeof MOCHI_TYPES = [];
  for (let i = 0; i < pairCount; i++) {
    selected.push(MOCHI_TYPES[i % MOCHI_TYPES.length]);
  }
  
  const pairs = selected.flatMap((mochi, i) => [
    { id: i * 2, mochiId: mochi.id + (i >= MOCHI_TYPES.length ? `-${Math.floor(i / MOCHI_TYPES.length)}` : ""), name: mochi.name, image: mochi.image, isFlipped: false, isMatched: false },
    { id: i * 2 + 1, mochiId: mochi.id + (i >= MOCHI_TYPES.length ? `-${Math.floor(i / MOCHI_TYPES.length)}` : ""), name: mochi.name, image: mochi.image, isFlipped: false, isMatched: false },
  ]);
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}
