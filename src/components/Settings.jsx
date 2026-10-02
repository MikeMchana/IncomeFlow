import {
  AlertTriangle,
  Database,
  Moon,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function Settings({ transactions, onReset }) {
  const [showReset, setShowReset] = useState(false);

  const incomeCount = transactions.filter(
    (transaction) => transaction.type === "income"
  ).length;

  const expenseCount = transactions.filter(
    (transaction) => transaction.type === "expense"
  ).length;

  const handleReset = () => {
    onReset();
    setShowReset(false);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="mb-7 sm:mb-8">
        <p className="mb-2 text-sm text-emerald-400">
          Application preferences
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Settings
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
          Manage your IncomeFlow preferences and understand how
          your local data is stored.
        </p>
      </section>

      {/* Appearance */}
      <section className="mb-5 rounded-3xl border border-white/10 bg-[#101514] p-4 shadow-xl shadow-black/5 sm:mb-6 sm:p-7">
        <SectionHeader
          icon={<Moon size={17} />}
          title="Appearance"
          description="Control how IncomeFlow looks."
        />

        <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/30">
              <Moon size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-white/70">
                Dark mode
              </p>

              <p className="mt-1 text-xs leading-5 text-white/25">
                IncomeFlow currently uses the dark interface.
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-3 pl-12 sm:pl-0">
            <span className="text-xs text-emerald-400/70">
              Active
            </span>

            <div
              className="flex h-7 w-12 shrink-0 items-center rounded-full bg-emerald-400 p-1"
              aria-label="Dark mode active"
            >
              <div className="ml-auto h-5 w-5 rounded-full bg-[#07100d] shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Your Data */}
      <section className="mb-5 rounded-3xl border border-white/10 bg-[#101514] p-4 shadow-xl shadow-black/5 sm:mb-6 sm:p-7">
        <SectionHeader
          icon={<Database size={17} />}
          title="Your data"
          description="Information currently stored in this browser."
        />

        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
          <DataCard
            label="Total records"
            value={transactions.length}
          />

          <DataCard
            label="Income records"
            value={incomeCount}
            accent
          />

          <DataCard
            label="Expense records"
            value={expenseCount}
          />
        </div>

        {/* Storage Notice */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4 sm:mt-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
            <ShieldCheck size={16} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-white/60">
              Local storage
            </p>

            <p className="mt-1 text-xs leading-5 text-white/25">
              Your transactions are currently stored locally in
              this browser. This demo does not require an account
              or server database.
            </p>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-3xl border border-red-400/10 bg-[#101514] p-4 shadow-xl shadow-black/5 sm:p-7">
        <div className="mb-5 flex items-start gap-3 sm:mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
            <AlertTriangle size={17} />
          </div>

          <div className="min-w-0">
            <h2 className="font-medium text-white/80">
              Danger zone
            </h2>

            <p className="mt-1 text-xs leading-5 text-white/25">
              Actions here can permanently remove your local
              transaction data.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-red-400/10 bg-red-400/[0.025] p-4 sm:gap-5 sm:p-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-white/65">
              Reset all transactions
            </p>

            <p className="mt-1 max-w-lg text-xs leading-5 text-white/25">
              Delete your current transactions and restore the
              original IncomeFlow demo data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.03] px-4 py-3 text-sm font-medium text-red-400 transition hover:border-red-400/25 hover:bg-red-400/10 active:scale-[0.99] md:w-fit"
          >
            <RotateCcw size={16} />
            Reset data
          </button>
        </div>
      </section>

      {/* Reset Confirmation */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4">
          <div className="my-auto w-full max-w-md rounded-[26px] border border-white/10 bg-[#111716] p-5 shadow-2xl shadow-black/40 sm:rounded-[28px] sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-400">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-tight">
              Reset your data?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/35">
              This will remove all transactions you have added
              and restore the original IncomeFlow demo data.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-white/50 transition hover:bg-white/10 hover:text-white/70 active:scale-[0.99]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 rounded-xl bg-red-400 py-3.5 text-sm font-semibold text-[#180706] transition hover:bg-red-300 active:scale-[0.99]"
              >
                Reset data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="mb-5 flex items-start gap-3 sm:mb-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.035] text-white/40">
        {icon}
      </div>

      <div className="min-w-0">
        <h2 className="font-medium text-white/80">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-white/25">
          {description}
        </p>
      </div>
    </div>
  );
}

function DataCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition hover:border-white/10 hover:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs text-white/25">
          {label}
        </p>

        {accent && (
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />
        )}
      </div>

      <p
        className={`mt-2 text-2xl font-semibold ${
          accent ? "text-emerald-400" : "text-white/80"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default Settings;