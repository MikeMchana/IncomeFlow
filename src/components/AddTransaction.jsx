import { X } from "lucide-react";
import { useState } from "react";

function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function AddTransaction({ onClose, onAdd }) {
  const [type, setType] = useState("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Dining");
  const [date, setDate] = useState(getToday());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !amount || Number(amount) <= 0) {
      return;
    }

    const transaction = {
      id: Date.now(),
      name: name.trim(),
      category: type === "income" ? "Income" : category,
      amount: Number(amount),
      type,
      date,
    };

    onAdd(transaction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4">
      <div className="my-auto w-full max-w-lg rounded-[26px] border border-white/10 bg-[#111716] p-5 shadow-2xl shadow-black/40 sm:rounded-3xl sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-7">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight">
              Add transaction
            </h2>

            <p className="mt-1 max-w-sm text-sm leading-5 text-white/35">
              Record money coming in or going out.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-white/40 transition hover:bg-white/5 hover:text-white active:scale-[0.97]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="mb-2 block text-xs font-medium text-white/40">
              Transaction type
            </label>

            <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`rounded-lg py-3 text-sm font-medium transition active:scale-[0.99] ${
                  type === "expense"
                    ? "bg-white/10 text-white"
                    : "text-white/35 hover:text-white/60"
                }`}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() => setType("income")}
                className={`rounded-lg py-3 text-sm font-medium transition active:scale-[0.99] ${
                  type === "income"
                    ? "bg-emerald-400 text-[#07100d]"
                    : "text-white/35 hover:text-white/60"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs font-medium text-white/40">
              Description
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Freelance project"
              autoComplete="off"
              className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 hover:border-white/15 focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-400/5"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-xs font-medium text-white/40">
              Amount
            </label>

            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] transition focus-within:border-emerald-400/50 focus-within:ring-4 focus-within:ring-emerald-400/5">
              <span className="flex shrink-0 items-center border-r border-white/10 px-4 text-sm font-medium text-emerald-400">
                KSh
              </span>

              <input
                type="number"
                min="1"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="min-w-0 w-full bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Category */}
          {type === "expense" && (
            <div>
              <label className="mb-2 block text-xs font-medium text-white/40">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#171d1b] px-4 py-3.5 text-sm text-white outline-none transition focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/5"
              >
                <option>Food & Dining</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="mb-2 block text-xs font-medium text-white/40">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-400/5"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-2 sm:gap-3 sm:pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-white/55 transition hover:bg-white/10 hover:text-white/70 active:scale-[0.99]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-emerald-400 py-3.5 text-sm font-semibold text-[#07100d] shadow-lg shadow-emerald-400/5 transition hover:bg-emerald-300 active:scale-[0.99]"
            >
              Add transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;