"use client";

import BottomNav from "@/components/BottomNav";
import { useUserStore } from "@/store/useUserStore";

const friends = [
  { name: "Aruzhan", coins: 120, status: "online", rank: 1, streak: 7 },
  { name: "Dias", coins: 90, status: "playing", rank: 2, streak: 4 },
  { name: "Aibek", coins: 75, status: "offline", rank: 3, streak: 2 },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getStatusMeta(status: string) {
  switch (status) {
    case "online":
      return {
        label: "В сети",
        dot: "bg-emerald-400",
        pill: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      };
    case "playing":
      return {
        label: "Играет",
        dot: "bg-amber-400",
        pill: "bg-amber-50 text-amber-700 ring-amber-200",
      };
    default:
      return {
        label: "Офлайн",
        dot: "bg-slate-400",
        pill: "bg-slate-100 text-slate-600 ring-slate-200",
      };
  }
}

export default function FriendsPage() {
  const user = useUserStore((state) => state.user);

  const totalCoins =
    friends.reduce((sum, friend) => sum + friend.coins, 0) + user.coins;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#0f172a_38%,_#f8fafc_38%,_#f8fafc_100%)] pb-28">
      <section className="mx-auto max-w-md px-4 pt-5">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-2xl ring-1 ring-white/10">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Social Hub
              </p>
              <h1 className="mt-2 text-3xl font-bold">Друзья</h1>
              <p className="mt-2 max-w-[24ch] text-sm leading-6 text-white/70">
                Смотри активность и рейтинг.
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

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Твой профиль
              </h2>
              <p className="text-sm text-slate-500">
                {user.name} · {user.streak} дней серии
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Live
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-50 p-3 text-center">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Друзья
              </p>
              <p className="mt-1 text-base font-bold text-slate-900">
                {friends.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 text-center">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Все коины
              </p>
              <p className="mt-1 text-base font-bold text-slate-900">
                {totalCoins}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3 text-center">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Рекорд
              </p>
              <p className="mt-1 text-base font-bold text-slate-900">
                {user.bestScore}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Топ друзей
              </h2>
              <p className="text-sm text-slate-500">
                Короткий список без лишнего шума
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Live
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {friends.map((friend) => {
              const statusMeta = getStatusMeta(friend.status);

              return (
                <div
                  key={friend.name}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                        {getInitials(friend.name)}
                      </div>
                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700 shadow">
                        {friend.rank}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {friend.name}
                          </p>
                          <span
                            className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${statusMeta.pill}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dot}`} />
                            {statusMeta.label}
                          </span>
                        </div>

                        <div className="text-right">
                          <p className="text-base font-bold text-slate-900">
                            {friend.coins}
                          </p>
                          <p className="text-xs text-slate-500">коинов</p>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Серия: {friend.streak} дней
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}