"use client";

import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import RewardCard from "@/components/RewardCard";
import { useUserStore } from "@/store/useUserStore";

const rewards = [
  { title: "Кофе", subtitle: "50 коинов", emoji: "☕", cost: 50, popular: true },
  { title: "Десерт", subtitle: "80 коинов", emoji: "🍰", cost: 80, popular: false },
  { title: "Скидка", subtitle: "100 коинов", emoji: "🏷️", cost: 100, popular: true },
  { title: "Стикер", subtitle: "30 коинов", emoji: "✨", cost: 30, popular: false },
];

export default function RewardsPage() {
  const user = useUserStore((state) => state.user);
  const spendCoins = useUserStore((state) => state.spendCoins);

  const [message, setMessage] = useState("");

  const availableRewards = rewards.filter((reward) => user.coins >= reward.cost).length;

  const nextRewardCost = useMemo(() => {
    const higher = rewards
      .map((reward) => reward.cost)
      .filter((cost) => cost > user.coins)
      .sort((a, b) => a - b);

    return higher[0] ?? rewards[rewards.length - 1].cost;
  }, [user.coins]);

  const redeem = (title: string, cost: number) => {
    const ok = spendCoins(cost);

    if (!ok) {
      setMessage("Недостаточно коинов");
      return;
    }

    setMessage(`Обменено: ${title} за ${cost} коинов`);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#0f172a_38%,_#f8fafc_38%,_#f8fafc_100%)] pb-28">
      <section className="mx-auto max-w-md px-4 pt-5">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-2xl ring-1 ring-white/10">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Reward Store
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight">
                Награды
              </h1>
              <p className="mt-2 max-w-[24ch] text-sm leading-6 text-white/70">
                Обменивай коины на бонусы и косметику.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-3 py-2 text-right ring-1 ring-white/10 backdrop-blur">
              <p className="text-[11px] uppercase tracking-wide text-white/55">
                Коины
              </p>
              <p className="mt-1 flex items-center justify-end gap-1 text-lg font-bold">
                <span>{user.coins}</span>
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-[24px] bg-emerald-50 p-4 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
            {message}
          </div>
        )}

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Избранная награда
              </h2>
              <p className="text-sm text-slate-500">
                Самый доступный бонус сейчас
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              Hot
            </span>
          </div>

          <div className="mt-4 rounded-[24px] bg-gradient-to-br from-amber-50 to-orange-100 p-4 ring-1 ring-amber-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-4xl">🏷️</p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  Скидка
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Снижай стоимость покупок и копи быстрее.
                </p>
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Цена
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">100</p>
                <p className="text-xs text-slate-500">коинов</p>
              </div>
            </div>

            <button
              onClick={() => redeem("Скидка", 100)}
              className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
            >
              Обменять сейчас
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Каталог
              </h2>
              <p className="text-sm text-slate-500">
                Всё в одном месте
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {availableRewards}/{rewards.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward) => (
              <RewardCard
                key={reward.title}
                title={reward.title}
                subtitle={reward.subtitle}
                emoji={reward.emoji}
                cost={reward.cost}
                popular={reward.popular}
                disabled={user.coins < reward.cost}
                onClick={() => redeem(reward.title, reward.cost)}
              />
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}