import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
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
    <div className="relative flex min-h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0b0f0e] px-4 py-8 text-[#f5f7f6] sm:px-5 sm:py-10">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-3xl sm:h-[420px] sm:w-[420px]" />

        <div className="absolute bottom-[-220px] right-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-400/[0.035] blur-3xl sm:h-[380px] sm:w-[380px]" />
      </div>

      <div className="relative my-auto w-full max-w-md">
        {/* Brand */}
        <div className="mb-7 text-center sm:mb-9">
          <div className="mb-4 flex justify-center">
            <div className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-bold text-[#07100d] shadow-xl shadow-emerald-400/10 sm:h-14 sm:w-14">
              I

              <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0b0f0e] bg-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#07100d]" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            IncomeFlow
          </h1>

          <p className="mt-1 text-xs text-white/30">
            Personal finance, simplified.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-[26px] border border-white/10 bg-[#101514]/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[28px] sm:p-8">
          {/* Heading */}
          <div className="mb-7 sm:mb-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/10 text-emerald-400">
              <Wallet size={18} />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/35">
              Sign in to continue managing your finances.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 hover:border-white/15 focus:border-emerald-400/50 focus:bg-white/[0.055] focus:ring-4 focus:ring-emerald-400/5"
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
                  className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-white/20 hover:border-white/15 focus:border-emerald-400/50 focus:bg-white/[0.055] focus:ring-4 focus:ring-emerald-400/5"
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
            <div className="flex flex-col gap-2 pt-1 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
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
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 text-sm font-semibold text-[#07100d] shadow-lg shadow-emerald-400/5 transition hover:bg-emerald-300 hover:shadow-emerald-400/10 active:scale-[0.99]"
            >
              Sign in

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </form>

          {/* Security / Demo Notice */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-3.5 sm:mt-6 sm:p-4">
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
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[10px] text-white/15 sm:mt-7">
          <span>IncomeFlow</span>

          <span>•</span>

          <span>Personal finance management</span>
        </div>
      </div>
    </div>
  );
}

export default Login;