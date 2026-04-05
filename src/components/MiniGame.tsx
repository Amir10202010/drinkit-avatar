"use client";

import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

const ROUND_SECONDS = 15;
const COMBO_WINDOW_MS = 900;

export default function MiniGame() {
  const bestScore = useUserStore((state) => state.user.bestScore);
  const addGameReward = useUserStore((state) => state.addGameReward);
  const setBestScore = useUserStore((state) => state.setBestScore);

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const [lastTapAt, setLastTapAt] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const timerRef = useRef<number | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsPlaying(false);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (score > bestScore) setBestScore(score);
  }, [score, bestScore, setBestScore]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    setCombo(0);
    setLastTapAt(null);
    setFeedback("");
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const handleTap = () => {
    if (!isPlaying || isGameOver) return;

    const now = Date.now();
    const isComboHit = lastTapAt !== null && now - lastTapAt <= COMBO_WINDOW_MS;
    const nextCombo = isComboHit ? combo + 1 : 1;
    const bonus = Math.floor(nextCombo / 3);
    const points = 1 + bonus;

    setScore((prev) => prev + points);
    setCombo(nextCombo);
    setLastTapAt(now);

    addGameReward(points);

    setFeedback(
      bonus > 0
        ? `+${points} коинов • комбо x${nextCombo}`
        : `+${points} коин`
    );

    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
    }

    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedback("");
    }, 900);
  };

  return (
    <div className="rounded-2xl bg-white p-3 text-slate-900 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
            Mini Game
          </p>
          <h2 className="mt-1 text-base font-semibold">Быстрый тап</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Нажимай быстро, собирай комбо и зарабатывай коины.
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 px-3 py-2 text-center ring-1 ring-slate-200">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Рекорд
          </p>
          <p className="mt-1 text-sm font-semibold">{bestScore}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-50 p-2 text-center ring-1 ring-slate-200">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Счёт
          </p>
          <p className="mt-1 text-lg font-bold">{score}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-2 text-center ring-1 ring-slate-200">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Комбо
          </p>
          <p className="mt-1 text-lg font-bold">x{combo}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-2 text-center ring-1 ring-slate-200">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Время
          </p>
          <p className="mt-1 text-lg font-bold">{timeLeft}s</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-600">Статус</p>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              isGameOver
                ? "bg-rose-100 text-rose-700"
                : isPlaying
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {isGameOver ? "Завершён" : isPlaying ? "Игра" : "Готово"}
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }}
          />
        </div>

        <p className="mt-2 min-h-[16px] text-xs text-slate-500">
          {feedback || (isPlaying ? "Лови ритм." : "Нажми старт.")}
        </p>
      </div>

      <div className="mt-3">
        {!isPlaying && !isGameOver ? (
          <button
            onClick={startGame}
            className="w-full rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white"
          >
            Начать раунд
          </button>
        ) : isPlaying ? (
          <button
            onClick={handleTap}
            className="w-full rounded-xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white"
          >
            +1 коин
          </button>
        ) : (
          <button
            onClick={startGame}
            className="w-full rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white"
          >
            Играть ещё раз
          </button>
        )}
      </div>
    </div>
  );
}