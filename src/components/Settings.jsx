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
    <div className="max-w-4xl">
      {/* Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm text-emerald-400">
          Application preferences
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Settings
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
          Manage your IncomeFlow data and application preferences.
        </p>
      </section>

      {/* Appearance */}
      <section className="mb-6 rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50">
            <Moon size={18} />
          </div>

          <div>
            <h2 className="font-medium">Appearance</h2>

            <p className="mt-1 text-xs text-white/30">
              Control how IncomeFlow looks.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.025] p-4">
          <div>
            <p className="text-sm text-white/70">
              Dark mode
            </p>

            <p className="mt-1 text-xs text-white/30">
              IncomeFlow currently uses the dark interface.
            </p>
          </div>

          <div className="flex h-7 w-12 items-center rounded-full bg-emerald-400 p-1">
            <div className="ml-auto h-5 w-5 rounded-full bg-[#07100d]" />
          </div>
        </div>
      </section>

      {/* Data */}
      <section className="mb-6 rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50">
            <Database size={18} />
          </div>

          <div>
            <h2 className="font-medium">Your data</h2>

            <p className="mt-1 text-xs text-white/30">
              Information currently stored in this browser.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <DataCard
            label="Total records"
            value={transactions.length}
          />

          <DataCard
            label="Income records"
            value={incomeCount}
          />

          <DataCard
            label="Expense records"
            value={expenseCount}
          />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-sm text-white/65">
              Local storage
            </p>

            <p className="mt-1 text-xs leading-5 text-white/30">
              Your transactions are currently stored locally
              in this browser. No account or server database is
              required.
            </p>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-3xl border border-red-400/10 bg-[#101514] p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
            <AlertTriangle size={18} />
          </div>

          <div>
            <h2 className="font-medium">Danger zone</h2>

            <p className="mt-1 text-xs text-white/30">
              Actions here can permanently remove your local data.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-white/70">
              Reset all transactions
            </p>

            <p className="mt-1 max-w-lg text-xs leading-5 text-white/30">
              Delete your current transactions and restore the
              original demo data.
            </p>
          </div>

          <button
            onClick={() => setShowReset(true)}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-400/10"
          >
            <RotateCcw size={16} />
            Reset data
          </button>
        </div>
      </section>

      {/* Reset Confirmation */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111716] p-6 shadow-2xl sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Reset your data?
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              This will remove all transactions you have added
              and restore the original IncomeFlow demo data.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-white/60 transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleReset}
                className="flex-1 rounded-xl bg-red-400 py-3 text-sm font-semibold text-[#180706] transition hover:bg-red-300"
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

function DataCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4">
      <p className="text-xs text-white/30">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

export default Settings;