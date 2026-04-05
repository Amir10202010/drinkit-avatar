export type User = {
  id: string;
  name: string;

  coins: number;

  level: number;
  xp: number; // 0–100 (% до следующего уровня)

  streak: number;

  avatar?: {
    emoji: string;
    badge?: string;
  };
};

export type Friend = {
  id: string;
  name: string;
  coins: number;
  level: number;

  status: "online" | "offline" | "playing";
  streak: number;
};

export type Reward = {
  id: string;
  title: string;
  cost: number;
  emoji: string;

  popular?: boolean;
  locked?: boolean;
};

export type Mission = {
  id: string;
  title: string;
  reward: number;
  progress: number;
  total: number;
  completed: boolean;
};

export type GameStats = {
  bestScore: number;
  totalPlays: number;
};