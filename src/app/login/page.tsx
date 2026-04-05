export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#0f172a_38%,_#f8fafc_38%,_#f8fafc_100%)] px-4 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-2xl ring-1 ring-white/10">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                Drinkit Avatar
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight">
                С возвращением
              </h1>
              <p className="mt-2 max-w-[26ch] text-sm leading-6 text-white/70">
                Войди в аккаунт, чтобы продолжить копить коины, играть и открывать
                награды.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">
                    XP
                  </p>
                  <p className="mt-1 text-xl font-bold">240</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">
                    Level
                  </p>
                  <p className="mt-1 text-xl font-bold">5</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">
                    Streak
                  </p>
                  <p className="mt-1 text-xl font-bold">7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Вход</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Используй email и пароль, чтобы войти в свой аккаунт.
              </p>
            </div>

            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  Запомнить меня
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Войти
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                or
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Google
              </button>
              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                GitHub
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Нет аккаунта?{" "}
              <a
                href="/signup"
                className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              >
                Зарегистрироваться
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}