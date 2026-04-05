"use client";

import { useUserStore, XP_PER_LEVEL } from "@/store/useUserStore";

type AvatarCardProps = {
  badge?: string;
  emoji?: string;
};

export default function AvatarCard({
  badge = "PRO",
  emoji = "😀",
}: AvatarCardProps) {
  const user = useUserStore((state) => state.user);

  const progress = Math.min(
    100,
    Math.max(0, Math.round(((user.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100))
  );

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="relative bg-[radial-gradient(circle_at_top_right,_#eef2ff,_#ffffff_55%,_#f8fafc_100%)] p-5">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-pink-400/10 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 text-4xl shadow-lg ring-4 ring-white">
              {emoji}
            </div>
            <div className="absolute -right-1 -top-1 rounded-full bg-slate-900 px-2 py-1 text-[10px] font-bold tracking-wide text-white shadow-md">
              Lv {user.level}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Твой аватар
                </p>
                <h2 className="mt-1 truncate text-2xl font-bold text-slate-900">
                  {user.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Собирай коины, повышай уровень и открывай новые бонусы.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {badge}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-slate-50 p-3 text-center">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Коины
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {user.coins}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3 text-center">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Уровень
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {user.level}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3 text-center">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Серия
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {user.streak}д
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              Прогресс уровня
            </p>
            <p className="text-sm font-semibold text-slate-900">{progress}%</p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>До следующего уровня</span>
            <span>{100 - progress}% осталось</span>
          </div>
        </div>
      </div>
    </div>
  );
}