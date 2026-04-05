"use client";

import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import ProgressBar from "@/components/ProgressBar";
import RewardCard from "@/components/RewardCard";
import { XP_PER_LEVEL, useUserStore } from "@/store/useUserStore";

const missions = [
  {
    title: "Сыграй мини-игру 1 раз",
    reward: "+25 коинов",
    progress: "1/1",
    done: true,
  },
  {
    title: "Пригласи друга",
    reward: "+50 коинов",
    progress: "0/1",
    done: false,
  },
];

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const nextAvatar = useUserStore((state) => state.nextAvatar);

  const xpInLevel = user.xp % XP_PER_LEVEL;
  const progress = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
  const xpToNext = XP_PER_LEVEL - xpInLevel;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#0f172a_40%,_#e5e7eb_40%,_#f8fafc_100%)] pb-28">
      <section className="mx-auto max-w-md px-4 pt-5">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-2xl ring-1 ring-white/10">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                  Drinkit Avatar
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-3 py-2 text-right ring-1 ring-white/10 backdrop-blur">
                <p className="text-[11px] uppercase tracking-wide text-white/55 ">
                  Коины
                </p>
                <p className="mt-1 flex items-center justify-end gap-1 text-lg font-bold">
                  <span>{user.coins}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center">
            <button
              onClick={nextAvatar}
              className="group relative flex h-48 w-40 items-center justify-center overflow-hidden rounded-[32px] ring-4 ring-white/15 shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Сменить аватар"
            >
              <Image
                src={user.avatarUrl}
                alt="Аватар"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </button>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-white/75">
                  Уровень {user.level}
                </p>
                <p className="text-sm font-semibold text-white">{progress}%</p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-2 text-center text-sm text-white/70">
                Нажми на аватар, чтобы переключить образ
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Ежедневные задания
              </h2>
              <p className="text-sm text-slate-500">
                Выполняй задания, чтобы зарабатывать коины
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              1/2
            </span>
          </div>

          <div className="space-y-3">
            {missions.map((mission) => (
              <div
                key={mission.title}
                className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                        mission.done
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {mission.done ? "✓" : "•"}
                    </div>
                    <p className="font-medium text-slate-900">{mission.title}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Награда: {mission.reward}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {mission.progress}
                  </p>
                  <p className="text-xs text-slate-500">
                    {mission.done ? "Выполнено" : "В процессе"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between px-1">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Награды</h2>
              <p className="text-sm text-slate-500">Быстрый доступ к магазину</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              New
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <RewardCard title="Кофе" subtitle="50 коинов" emoji="☕" />
            <RewardCard title="Скидка" subtitle="100 коинов" emoji="🏷️" />
            <RewardCard title="Аватар" subtitle="200 коинов" emoji="🎭" />
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}