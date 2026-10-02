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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111716] p-6 shadow-2xl sm:p-8">
        <div className="mb-7 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Add transaction
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Record money coming in or going out.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="mb-2 block text-xs text-white/40">
              Transaction type
            </label>

            <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`rounded-lg py-2.5 text-sm transition ${
                  type === "expense"
                    ? "bg-white/10 text-white"
                    : "text-white/35"
                }`}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() => setType("income")}
                className={`rounded-lg py-2.5 text-sm transition ${
                  type === "income"
                    ? "bg-emerald-400 text-[#07100d]"
                    : "text-white/35"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs text-white/40">
              Description
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Freelance project"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-emerald-400/50"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-xs text-white/40">
              Amount
            </label>

            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-emerald-400/50">
              <span className="flex items-center border-r border-white/10 px-4 text-sm text-emerald-400">
                KSh
              </span>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Category */}
          {type === "expense" && (
            <div>
              <label className="mb-2 block text-xs text-white/40">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#171d1b] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
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
            <label className="mb-2 block text-xs text-white/40">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-white/60 transition hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-emerald-400 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-emerald-300"
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