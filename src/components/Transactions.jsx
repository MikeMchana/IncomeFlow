import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Trash2,
  Wallet,
  CreditCard,
} from "lucide-react";
import { useMemo, useState } from "react";

function Transactions({ transactions, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return (
    <section className="rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
      {/* Header */}
      <div className="mb-6">
        <div>
          <h3 className="text-lg font-medium">
            All transactions
          </h3>

          <p className="mt-1 text-sm text-white/35">
            Search and manage your financial activity.
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/20 focus:border-emerald-400/50"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#171d1b] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/50"
        >
          <option value="all">All transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      {/* Results */}
      {filteredTransactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
          <p className="text-sm text-white/35">
            No transactions found.
          </p>

          <p className="mt-1 text-xs text-white/20">
            Try another search or filter.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Result count */}
      <div className="mt-5 border-t border-white/5 pt-4">
        <p className="text-xs text-white/25">
          Showing {filteredTransactions.length} of{" "}
          {transactions.length} transactions
        </p>
      </div>
    </section>
  );
}

function TransactionRow({ transaction, onDelete }) {
  const positive = transaction.type === "income";

  return (
    <div className="group flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition hover:bg-white/[0.03] sm:px-4">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-white/5 text-white/40"
          }`}
        >
          {positive ? (
            <ArrowDownLeft size={19} />
          ) : (
            <ArrowUpRight size={19} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {transaction.name}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/30">
            <span>{transaction.category}</span>

            <span>•</span>

            <span>{transaction.date}</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-3">
        <span
          className={`text-sm font-medium ${
            positive
              ? "text-emerald-400"
              : "text-white/70"
          }`}
        >
          {positive ? "+" : "-"} KSh{" "}
          {formatMoney(transaction.amount)}
        </span>

        <button
          onClick={() => onDelete(transaction.id)}
          className="rounded-lg p-2 text-white/20 opacity-0 transition hover:bg-red-400/10 hover:text-red-400 group-hover:opacity-100"
          title="Delete transaction"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

export default Transactions;