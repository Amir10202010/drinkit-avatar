"use client";

import BottomNav from "@/components/BottomNav";
import MiniGame from "@/components/MiniGame";
import { useUserStore } from "@/store/useUserStore";

const tips = [
  "Играй короткими сессиями.",
  "Чем быстрее тап — тем больше комбо.",
  "Комбо повышает награду за раунд.",
];

export default function GamePage() {
  const user = useUserStore((state) => state.user);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#0f172a_38%,_#f8fafc_38%,_#f8fafc_100%)] pb-28">
      <section className="mx-auto max-w-md px-4 pt-5">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-2xl ring-1 ring-white/10">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Mini Game
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight">
                Играй
              </h1>
              <p className="mt-2 max-w-[24ch] text-sm leading-6 text-white/70">
                Нажимай быстро и зарабатывай коины.
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
          <MiniGame />
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-base font-semibold text-slate-900">Как играть</h2>

          <div className="mt-3 space-y-2">
            {tips.map((tip, index) => (
              <div
                key={tip}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}