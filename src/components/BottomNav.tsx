"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Home" },
  { href: "/game", label: "Game" },
  { href: "/rewards", label: "Rewards" },
  { href: "/friends", label: "Friends" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-md px-3 py-3">
        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-1">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 text-center rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}