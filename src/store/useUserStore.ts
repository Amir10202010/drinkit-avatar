"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const XP_PER_LEVEL = 1000;

type User = {
  name: string;
  avatarUrl: string;
  avatarOptions: string[];
  coins: number;
  xp: number;
  level: number;
  streak: number;
  bestScore: number;
};

type UserStore = {
  user: User;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addXP: (amount: number) => void;
  addGameReward: (coins: number, xp?: number) => void;
  setBestScore: (score: number) => void;
  setAvatar: (avatarUrl: string) => void;
  nextAvatar: () => void;
  resetProgress: () => void;
};

const getLevel = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {
        name: "Amirkhan",
        avatarUrl: "/avatars/avatar-1.jpg",
        avatarOptions: [
          "/avatars/avatar-1.jpg",
          "/avatars/avatar-2.jpg",
          "/avatars/avatar-3.jpg",
        ],
        coins: 240,
        xp: 4680,
        level: 5,
        streak: 7,
        bestScore: 980,
      },

      addCoins: (amount) =>
        set((state) => ({
          user: {
            ...state.user,
            coins: state.user.coins + amount,
          },
        })),

      spendCoins: (amount) => {
        const { coins } = get().user;
        if (coins < amount) return false;

        set((state) => ({
          user: {
            ...state.user,
            coins: state.user.coins - amount,
          },
        }));

        return true;
      },

      addXP: (amount) =>
        set((state) => {
          const nextXP = state.user.xp + amount;
          return {
            user: {
              ...state.user,
              xp: nextXP,
              level: getLevel(nextXP),
            },
          };
        }),

      addGameReward: (coins, xp = coins * 4) =>
        set((state) => {
          const nextCoins = state.user.coins + coins;
          const nextXP = state.user.xp + xp;

          return {
            user: {
              ...state.user,
              coins: nextCoins,
              xp: nextXP,
              level: getLevel(nextXP),
            },
          };
        }),

      setBestScore: (score) =>
        set((state) => ({
          user: {
            ...state.user,
            bestScore: Math.max(state.user.bestScore, score),
          },
        })),

      setAvatar: (avatarUrl) =>
        set((state) => ({
          user: {
            ...state.user,
            avatarUrl,
          },
        })),

      nextAvatar: () =>
        set((state) => {
          const { avatarOptions, avatarUrl } = state.user;
          const currentIndex = avatarOptions.indexOf(avatarUrl);
          const nextIndex = (currentIndex + 1) % avatarOptions.length;

          return {
            user: {
              ...state.user,
              avatarUrl: avatarOptions[nextIndex],
            },
          };
        }),

      resetProgress: () =>
        set((state) => ({
          user: {
            ...state.user,
            coins: 0,
            xp: 0,
            level: 1,
            streak: 0,
            bestScore: 0,
          },
        })),
    }),
    {
      name: "drinkit-user-store",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);