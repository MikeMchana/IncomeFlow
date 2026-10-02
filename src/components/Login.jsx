import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Demo-only authentication.
    // Real authentication will be handled by the backend later.
    onLogin({
      email: email.trim(),
      rememberMe,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d0b] text-[#f5f7f6]">
      {/* Subtle background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-400/[0.045] blur-3xl" />

        <div className="absolute -bottom-48 right-[-100px] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.035] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_430px] lg:gap-20 xl:grid-cols-[1fr_450px]">
          {/* Left side */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              {/* Brand */}
              <div className="mb-12 flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-400 text-lg font-bold text-[#07100d] shadow-lg shadow-emerald-400/10">
                  I

                  <div className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-[3px] border-[#080d0b] bg-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#07100d]" />
                  </div>
                </div>

                <div>
                  <p className="text-[15px] font-semibold tracking-tight">
                    IncomeFlow
                  </p>

                  <p className="text-[10px] text-white/25">
                    Personal finance
                  </p>
                </div>
              </div>

              {/* Main message */}
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                  Your money. Your flow.
                </p>

                <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-[-0.035em] xl:text-6xl">
                  Take control
                  <br />
                  of your money.
                </h1>

                <p className="mt-6 max-w-md text-[15px] leading-7 text-white/35">
                  Track income, understand your spending, and keep a clear
                  picture of where your money is going.
                </p>
              </div>

              {/* Decorative financial preview */}
              <div className="relative mt-12 max-w-[470px]">
                <div className="absolute -inset-4 rounded-[30px] bg-emerald-400/[0.025] blur-2xl" />

                <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#101614]/90 p-5 shadow-2xl shadow-black/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                        This month
                      </p>

                      <p className="mt-2 text-2xl font-semibold tracking-tight">
                        KSh 26,500
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400/70">
                        <TrendingUp size={12} />
                        <span>Available balance</span>
                      </div>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.07] text-emerald-400/70">
                      <Wallet size={16} />
                    </div>
                  </div>

                  {/* Mini chart */}
                  <div className="mt-7 flex h-20 items-end gap-2">
                    <div className="h-[35%] flex-1 rounded-t-md bg-white/[0.055]" />
                    <div className="h-[48%] flex-1 rounded-t-md bg-white/[0.055]" />
                    <div className="h-[42%] flex-1 rounded-t-md bg-white/[0.055]" />
                    <div className="h-[65%] flex-1 rounded-t-md bg-emerald-400/20" />
                    <div className="h-[55%] flex-1 rounded-t-md bg-emerald-400/25" />
                    <div className="h-[78%] flex-1 rounded-t-md bg-emerald-400/35" />
                    <div className="h-[92%] flex-1 rounded-t-md bg-emerald-400/50" />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                      <p className="text-[10px] text-white/25">
                        Income
                      </p>

                      <p className="mt-1 text-sm font-medium text-white/75">
                        KSh 40,000
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                      <p className="text-[10px] text-white/25">
                        Expenses
                      </p>

                      <p className="mt-1 text-sm font-medium text-white/75">
                        KSh 13,500
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small trust line */}
              <div className="mt-6 flex items-center gap-2 text-[11px] text-white/20">
                <ShieldCheck size={13} />
                <span>Simple, private and built for everyday money management.</span>
              </div>
            </div>
          </div>

          {/* Mobile brand */}
          <div className="lg:hidden">
            <div className="flex items-center justify-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-400 text-lg font-bold text-[#07100d] shadow-lg shadow-emerald-400/10">
                I

                <div className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-[3px] border-[#080d0b] bg-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#07100d]" />
                </div>
              </div>

              <div>
                <p className="text-[15px] font-semibold tracking-tight">
                  IncomeFlow
                </p>

                <p className="text-[10px] text-white/25">
                  Personal finance
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                Your money. Your flow.
              </p>

              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em]">
                Take control of your money.
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/30">
                Track your income and expenses in one simple place.
              </p>
            </div>
          </div>

          {/* Login side */}
          <div className="w-full">
            <div className="rounded-[28px] border border-white/[0.09] bg-[#101614]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7 lg:p-8">
              {/* Card heading */}
              <div className="mb-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.08] text-emerald-400">
                  <Wallet size={18} />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/30">
                  Sign in to continue managing your finances.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/45">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 text-sm outline-none transition duration-200 placeholder:text-white/20 hover:border-white/[0.14] focus:border-emerald-400/45 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-400/[0.05]"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-xs font-medium text-white/45">
                      Password
                    </label>

                    <span className="text-[10px] text-white/20">
                      Demo
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-3.5 pr-12 text-sm outline-none transition duration-200 placeholder:text-white/20 hover:border-white/[0.14] focus:border-emerald-400/45 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-400/[0.05]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-white/25 transition hover:bg-white/5 hover:text-white/60 active:scale-[0.96]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="h-4 w-4 cursor-pointer accent-emerald-400"
                    />

                    <span className="text-xs text-white/35">
                      Remember me
                    </span>
                  </label>

                  <span className="text-xs text-white/20">
                    Demo account
                  </span>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3 text-xs leading-5 text-red-400">
                    <LockKeyhole
                      size={15}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>
                  </div>
                )}

                {/* Sign in */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 text-sm font-semibold text-[#07100d] shadow-lg shadow-emerald-400/[0.06] transition duration-200 hover:bg-emerald-300 hover:shadow-emerald-400/10 active:scale-[0.99]"
                >
                  Sign in

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
              </form>

              {/* Demo notice */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3.5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-400/60"
                />

                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/45">
                    Portfolio demo
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/25">
                    This version uses frontend-only authentication.
                    No password is sent to a server.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-white/15 sm:mt-6">
              <span>IncomeFlow</span>
              <span>•</span>
              <span>Personal finance management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;