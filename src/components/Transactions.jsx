import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Trash2,
  Wallet,
  CreditCard,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

function Transactions({ transactions, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        transaction.name.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm);

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  const hasFilters =
    search.trim() !== "" || filter !== "all";

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
  };

  return (
    <div>
      {/* Page Header */}
      <section className="mb-7 sm:mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400">
          <Wallet size={16} />
          <span>Financial activity</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Transactions
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
          Review, search, and manage every income and expense
          recorded in your account.
        </p>
      </section>

      {/* Main Card */}
      <section className="rounded-3xl border border-white/10 bg-[#101514] p-4 shadow-xl shadow-black/5 sm:p-7">
        {/* Card Header */}
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-medium">
              All transactions
            </h2>

            <p className="mt-1 text-sm text-white/30">
              {transactions.length === 1
                ? "1 transaction recorded"
                : `${transactions.length} transactions recorded`}
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex w-fit items-center gap-1.5 rounded-lg py-1 text-xs text-white/30 transition hover:text-emerald-400 active:scale-[0.98]"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="group relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition group-focus-within:text-emerald-400/60"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by description or category..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/20 hover:border-white/15 focus:border-emerald-400/40 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-400/5"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2 sm:mb-7">
          <FilterButton
            label="All"
            count={transactions.length}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />

          <FilterButton
            label="Income"
            count={
              transactions.filter(
                (transaction) =>
                  transaction.type === "income"
              ).length
            }
            active={filter === "income"}
            onClick={() => setFilter("income")}
            positive
          />

          <FilterButton
            label="Expenses"
            count={
              transactions.filter(
                (transaction) =>
                  transaction.type === "expense"
              ).length
            }
            active={filter === "expense"}
            onClick={() => setFilter("expense")}
          />
        </div>

        {/* Divider */}
        <div className="mb-2 h-px bg-white/5" />

        {/* Results */}
        {filteredTransactions.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onClear={clearFilters}
          />
        ) : (
          <div className="space-y-1">
            {filteredTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {/* Result Count */}
        <div className="mt-5 border-t border-white/5 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-white/20">
              Showing{" "}
              <span className="text-white/35">
                {filteredTransactions.length}
              </span>{" "}
              of{" "}
              <span className="text-white/35">
                {transactions.length}
              </span>{" "}
              transactions
            </p>

            {filter !== "all" && (
              <span className="rounded-md bg-emerald-400/5 px-2 py-1 text-xs capitalize text-emerald-400/60">
                {filter}
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
  positive,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition active:scale-[0.98] ${
        active
          ? positive
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
            : "border-white/10 bg-white/10 text-white"
          : "border-white/5 bg-white/[0.025] text-white/35 hover:border-white/10 hover:bg-white/5 hover:text-white/60"
      }`}
    >
      <span>{label}</span>

      <span
        className={`rounded-md px-1.5 py-0.5 text-[10px] ${
          active
            ? positive
              ? "bg-emerald-400/10 text-emerald-400/70"
              : "bg-white/10 text-white/50"
            : "bg-white/5 text-white/20"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function TransactionRow({ transaction, onDelete }) {
  const positive = transaction.type === "income";

  return (
    <div className="group flex min-w-0 items-center justify-between gap-2 rounded-2xl px-1.5 py-3.5 transition hover:bg-white/[0.025] sm:gap-3 sm:px-3.5">
      {/* Left side */}
      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-11 sm:w-11 ${
            positive
              ? "border-emerald-400/10 bg-emerald-400/10 text-emerald-400"
              : "border-white/5 bg-white/[0.04] text-white/35"
          }`}
        >
          {positive ? (
            <ArrowDownLeft size={18} />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white/85">
            {transaction.name}
          </p>

          <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[11px] text-white/25 sm:gap-2 sm:text-xs">
            <span className="min-w-0 truncate">
              {transaction.category}
            </span>

            <span className="shrink-0 text-white/10">
              •
            </span>

            <span className="shrink-0">
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-0.5 sm:gap-3">
        <div className="text-right">
          <p
            className={`text-xs font-medium sm:text-[15px] ${
              positive
                ? "text-emerald-400"
                : "text-white/70"
            }`}
          >
            {positive ? "+" : "-"} KSh{" "}
            {formatMoney(transaction.amount)}
          </p>

          <p className="mt-1 hidden text-[10px] text-white/15 sm:block">
            {positive ? "Income" : "Expense"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDelete(transaction.id)}
          className="rounded-xl p-2.5 text-white/15 transition hover:bg-red-400/10 hover:text-red-400 active:scale-[0.96] sm:opacity-0 sm:group-hover:opacity-100"
          title="Delete transaction"
          aria-label={`Delete ${transaction.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ hasFilters, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-14 text-center sm:px-6 sm:py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/20">
        <CreditCard size={20} />
      </div>

      <h3 className="mt-4 text-sm font-medium text-white/60">
        {hasFilters
          ? "No matching transactions"
          : "No transactions yet"}
      </h3>

      <p className="mt-1.5 max-w-xs text-xs leading-5 text-white/25">
        {hasFilters
          ? "Try changing your search or filter to find what you're looking for."
          : "Your financial activity will appear here once you add your first transaction."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl bg-white/5 px-4 py-2.5 text-xs font-medium text-white/50 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

function formatDate(date) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export default Transactions;