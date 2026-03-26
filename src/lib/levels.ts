export interface LevelConfig {
  level: number;
  name: string;
  pairs: number;
  cols: number;
  previewTime: number; // ms
  swapEnabled: boolean;
  swapInterval: number; // ms — how often unmatched cards swap positions
  timeLimit: number; // seconds, 0 = no limit
  description: string;
}

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    name: "Gentle Start",
    pairs: 4,
    cols: 4,
    previewTime: 3000,
    swapEnabled: false,
    swapInterval: 0,
    timeLimit: 0,
    description: "Find 4 pairs — take your time 🌸",
  },
  {
    level: 2,
    name: "Getting Warmer",
    pairs: 6,
    cols: 4,
    previewTime: 2500,
    swapEnabled: false,
    swapInterval: 0,
    timeLimit: 60,
    description: "6 pairs, 60 seconds ⏱️",
  },
  {
    level: 3,
    name: "Tricky Mochi",
    pairs: 6,
    cols: 4,
    previewTime: 2000,
    swapEnabled: true,
    swapInterval: 8000,
    timeLimit: 60,
    description: "Cards swap positions! Stay sharp 🔀",
  },
  {
    level: 4,
    name: "Memory Master",
    pairs: 8,
    cols: 4,
    previewTime: 2000,
    swapEnabled: true,
    swapInterval: 6000,
    timeLimit: 75,
    description: "8 pairs, faster swaps, less time 🔥",
  },
  {
    level: 5,
    name: "Mochi Chaos",
    pairs: 10,
    cols: 5,
    previewTime: 1500,
    swapEnabled: true,
    swapInterval: 5000,
    timeLimit: 90,
    description: "The ultimate challenge! 🌟",
  },
];

export function getLevelConfig(level: number): LevelConfig {
  return LEVELS[Math.min(level - 1, LEVELS.length - 1)];
}
