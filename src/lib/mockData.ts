import { User, Friend, Reward, Mission, GameStats } from "./types";

export const mockUser: User = {
  id: "1",
  name: "Amirkhan",
  coins: 240,
  level: 5,
  xp: 68,
  streak: 7,
  avatar: {
    emoji: "😀",
    badge: "PRO",
  },
};

export const mockFriends: Friend[] = [
  {
    id: "f1",
    name: "Aruzhan",
    coins: 120,
    level: 4,
    status: "online",
    streak: 7,
  },
  {
    id: "f2",
    name: "Dias",
    coins: 90,
    level: 3,
    status: "playing",
    streak: 4,
  },
  {
    id: "f3",
    name: "Aibek",
    coins: 75,
    level: 2,
    status: "offline",
    streak: 2,
  },
];

export const mockRewards: Reward[] = [
  { id: "r1", title: "Кофе", cost: 50, emoji: "☕", popular: true },
  { id: "r2", title: "Десерт", cost: 80, emoji: "🍰" },
  { id: "r3", title: "Скидка", cost: 100, emoji: "🏷️", popular: true },
  { id: "r4", title: "Стикер", cost: 30, emoji: "✨" },
];

export const mockMissions: Mission[] = [
  {
    id: "m1",
    title: "Сыграть 1 игру",
    reward: 25,
    progress: 1,
    total: 1,
    completed: true,
  },
  {
    id: "m2",
    title: "Пригласить друга",
    reward: 50,
    progress: 0,
    total: 1,
    completed: false,
  },
  {
    id: "m3",
    title: "Открыть награду",
    reward: 15,
    progress: 0,
    total: 1,
    completed: false,
  },
];

export const mockGameStats: GameStats = {
  bestScore: 980,
  totalPlays: 12,
};