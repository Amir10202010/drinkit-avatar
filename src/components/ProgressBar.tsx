"use client";

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
};

export default function ProgressBar({
  value,
  label = "Прогресс",
  showValue = true,
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {showValue && (
          <p className="text-sm font-semibold text-slate-900">{safeValue}%</p>
        )}
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-300 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <span>Меньше — ближе к следующему уровню</span>
        <span>{100 - safeValue}% осталось</span>
      </div>
    </div>
  );
}