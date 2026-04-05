"use client";

import Image from "next/image";
import { useUserStore, XP_PER_LEVEL } from "@/store/useUserStore";

export default function ProfileHero() {
  const user = useUserStore((state) => state.user);
  const nextAvatar = useUserStore((state) => state.nextAvatar);

  const xpInLevel = user.xp % XP_PER_LEVEL;
  const progress = Math.round((xpInLevel / XP_PER_LEVEL) * 100);

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-2xl ring-1 ring-white/10">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">
              Drinkit Avatar
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight">
              Привет, {user.name} 👋
            </h1>
          </div>

          <div className="rounded-2xl bg-white/10 px-3 py-2 text-right ring-1 ring-white/10 backdrop-blur">
            <p className="text-[11px] uppercase tracking-wide text-white/55">
              Коины
            </p>
            <p className="mt-1 flex items-center gap-1 text-lg font-bold">
              <span>🪙</span>
              <span>{user.coins}</span>
            </p>
          </div>
        </div>

        <div className="mt-5">
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
        </div>

        <div className="mt-5 flex flex-col items-center">
          <button
            onClick={nextAvatar}
            className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[32px] ring-4 ring-white/15 shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Сменить аватар"
          >
            <Image
              src={user.avatarUrl}
              alt="Аватар"
              fill
              className="object-cover"
              priority
            />
          </button>

          <p className="mt-3 text-center text-sm text-white/70">
            Нажми на аватар, чтобы переключить образ
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 backdrop-blur">
            <p className="text-[11px] uppercase tracking-wide text-white/55">
              До апа
            </p>
            <p className="mt-1 text-base font-bold text-white">
              {XP_PER_LEVEL - xpInLevel} XP
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 backdrop-blur">
            <p className="text-[11px] uppercase tracking-wide text-white/55">
              Серия
            </p>
            <p className="mt-1 text-base font-bold text-white">
              {user.streak} дней
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}