"use client";

type RewardCardProps = {
  title: string;
  subtitle: string;
  emoji: string;
  cost?: number;
  popular?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function RewardCard({
  title,
  subtitle,
  emoji,
  cost,
  popular = false,
  disabled = false,
  onClick,
}: RewardCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full overflow-hidden rounded-[24px] border bg-white p-4 text-left shadow-sm transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed border-slate-200 opacity-60"
          : "border-slate-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
      }`}
    >
      {popular && (
        <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
          Popular
        </span>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 text-3xl ring-1 ring-amber-200/60 transition-transform duration-200 group-hover:scale-105">
          {emoji}
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {cost ? `${cost} коинов` : "Доступно"}
          </span>

          {disabled && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              Locked
            </span>
          )}
        </div>
      </div>
    </button>
  );
}