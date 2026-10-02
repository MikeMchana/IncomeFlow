import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";

function Analytics({ transactions }) {
  const analytics = useMemo(() => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income"
    );

    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense"
    );

    const income = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const expenses = expenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const balance = income - expenses;

    const categoryTotals = {};

    expenseTransactions.forEach((transaction) => {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        transaction.amount;
    });

    const categories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const highestExpense =
      expenseTransactions.length > 0
        ? [...expenseTransactions].sort(
            (a, b) => b.amount - a.amount
          )[0]
        : null;

    const highestIncome =
      incomeTransactions.length > 0
        ? [...incomeTransactions].sort(
            (a, b) => b.amount - a.amount
          )[0]
        : null;

    const savingsRate =
      income > 0
        ? Math.round(((income - expenses) / income) * 100)
        : 0;

    const averageExpense =
      expenseTransactions.length > 0
        ? Math.round(
            expenses / expenseTransactions.length
          )
        : 0;

    return {
      income,
      expenses,
      balance,
      categories,
      highestExpense,
      highestIncome,
      savingsRate,
      averageExpense,
      incomeCount: incomeTransactions.length,
      expenseCount: expenseTransactions.length,
    };
  }, [transactions]);

  return (
    <div>
      {/* Page Header */}
      <section className="mb-7 sm:mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-emerald-400">
          <BarChart3 size={16} />
          <span>Financial insights</span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
              Understand your income, spending patterns, and
              overall financial position.
            </p>
          </div>

          <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2 text-xs text-white/30">
            <Receipt size={14} />

            <span>
              {transactions.length}{" "}
              {transactions.length === 1
                ? "record"
                : "records"}
            </span>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="grid gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <AnalyticsCard
          label="Total income"
          value={`KSh ${formatMoney(analytics.income)}`}
          icon={<ArrowDownRight size={18} />}
          accent
          description={`${analytics.incomeCount} income ${
            analytics.incomeCount === 1
              ? "record"
              : "records"
          }`}
        />

        <AnalyticsCard
          label="Total expenses"
          value={`KSh ${formatMoney(analytics.expenses)}`}
          icon={<ArrowUpRight size={18} />}
          description={`${analytics.expenseCount} expense ${
            analytics.expenseCount === 1
              ? "record"
              : "records"
          }`}
        />

        <AnalyticsCard
          label="Current balance"
          value={`KSh ${formatMoney(analytics.balance)}`}
          icon={<Wallet size={18} />}
          balance={analytics.balance}
          description="Income minus expenses"
        />

        <AnalyticsCard
          label="Savings rate"
          value={`${analytics.savingsRate}%`}
          icon={<TrendingUp size={18} />}
          accent
          description="Income retained"
        />
      </section>

      {/* Main Analytics */}
      <section className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Spending Breakdown */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#101514] p-5 shadow-xl shadow-black/5 sm:p-7">
          <div className="mb-7 flex items-start justify-between gap-3 sm:mb-8 sm:gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                  <BarChart3 size={15} />
                </div>

                <h2 className="truncate font-medium">
                  Spending breakdown
                </h2>
              </div>

              <p className="mt-2 text-sm leading-5 text-white/30">
                See how your recorded expenses are distributed.
              </p>
            </div>

            {analytics.expenses > 0 && (
              <div className="hidden shrink-0 text-right min-[430px]:block">
                <p className="text-[10px] uppercase tracking-wider text-white/20">
                  Total spent
                </p>

                <p className="mt-1 text-sm font-medium text-white/60">
                  KSh {formatMoney(analytics.expenses)}
                </p>
              </div>
            )}
          </div>

          {analytics.categories.length === 0 ? (
            <EmptyAnalytics />
          ) : (
            <div className="space-y-5">
              {analytics.categories.map(
                ([category, amount]) => {
                  const percentage =
                    analytics.expenses > 0
                      ? Math.round(
                          (amount /
                            analytics.expenses) *
                            100
                        )
                      : 0;

                  return (
                    <div key={category}>
                      <div className="mb-2.5 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />

                          <span className="truncate text-sm text-white/65">
                            {category}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                          <span className="text-[11px] text-white/25 sm:text-xs">
                            {percentage}%
                          </span>

                          <span className="text-xs font-medium text-white/55 sm:text-sm">
                            KSh {formatMoney(amount)}
                          </span>
                        </div>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                          style={{
                            width: `${Math.max(
                              percentage,
                              2
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {analytics.categories.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-5 sm:mt-8">
              <p className="text-xs text-white/20">
                Showing your top spending categories
              </p>

              {analytics.categories.length >= 6 && (
                <span className="rounded-md bg-white/[0.025] px-2 py-1 text-xs text-white/20">
                  Top 6
                </span>
              )}
            </div>
          )}
        </div>

        {/* Financial Snapshot */}
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#101514] p-5 shadow-xl shadow-black/5 sm:p-7">
          <div className="mb-6 sm:mb-7">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/40">
                <CircleDollarSign size={15} />
              </div>

              <h2 className="font-medium">
                Financial snapshot
              </h2>
            </div>

            <p className="mt-2 text-sm leading-5 text-white/30">
              A quick look at your recorded activity.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <Insight
              label="Largest income"
              value={
                analytics.highestIncome
                  ? `KSh ${formatMoney(
                      analytics.highestIncome.amount
                    )}`
                  : "No income"
              }
              description={
                analytics.highestIncome
                  ? analytics.highestIncome.name
                  : "Add an income transaction"
              }
              positive
              icon={<ArrowDownRight size={15} />}
            />

            <Insight
              label="Largest expense"
              value={
                analytics.highestExpense
                  ? `KSh ${formatMoney(
                      analytics.highestExpense.amount
                    )}`
                  : "No expenses"
              }
              description={
                analytics.highestExpense
                  ? analytics.highestExpense.name
                  : "Add an expense transaction"
              }
              icon={<ArrowUpRight size={15} />}
            />

            <Insight
              label="Transactions"
              value={transactions.length}
              description="Total recorded activity"
              icon={<Receipt size={15} />}
            />

            <Insight
              label="Average expense"
              value={`KSh ${formatMoney(
                analytics.averageExpense
              )}`}
              description={
                analytics.expenseCount > 0
                  ? "Average per expense transaction"
                  : "No expense transactions yet"
              }
              icon={<Wallet size={15} />}
            />
          </div>
        </div>
      </section>

      {/* Money Position */}
      <section className="relative mt-5 overflow-hidden rounded-3xl border border-emerald-400/10 bg-gradient-to-br from-[#16221e] via-[#111a17] to-[#101514] p-5 shadow-xl shadow-black/5 sm:mt-6 sm:p-8">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center md:gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-white/35">
              <Wallet size={15} />

              <span>Your money position</span>
            </div>

            <h2
              className={`mt-3 break-words text-3xl font-semibold tracking-tight sm:text-4xl ${
                analytics.balance >= 0
                  ? "text-white"
                  : "text-red-400"
              }`}
            >
              {analytics.balance < 0 ? "- " : ""}
              KSh {formatMoney(Math.abs(analytics.balance))}
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/30">
              This represents the difference between all recorded
              income and expenses.
            </p>
          </div>

          <div className="flex items-center gap-5 self-start sm:self-auto">
            <div className="hidden h-12 w-px bg-white/5 md:block" />

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] sm:h-24 sm:w-24">
              <div className="text-center">
                <p
                  className={`text-xl font-semibold sm:text-2xl ${
                    analytics.savingsRate >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {analytics.savingsRate}%
                </p>

                <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/25 sm:text-[10px]">
                  retained
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AnalyticsCard({
  label,
  value,
  icon,
  accent,
  balance,
  description,
}) {
  const balanceNegative =
    balance !== undefined && balance < 0;

  return (
    <div
      className={`min-w-0 rounded-2xl border bg-[#101514] p-4 shadow-lg shadow-black/[0.03] sm:p-5 ${
        accent
          ? "border-emerald-400/10"
          : "border-white/10"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="truncate text-xs text-white/30">
          {label}
        </span>

        <span
          className={
            accent
              ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400"
              : "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/30"
          }
        >
          {icon}
        </span>
      </div>

      <p
        className={`break-words text-lg font-semibold sm:text-xl ${
          balanceNegative ? "text-red-400" : ""
        }`}
      >
        {value}
      </p>

      <p className="mt-2 truncate text-[10px] text-white/20">
        {description}
      </p>
    </div>
  );
}

function Insight({
  label,
  value,
  description,
  positive,
  icon,
}) {
  return (
    <div className="group min-w-0 rounded-2xl border border-white/5 bg-white/[0.025] p-3.5 transition hover:border-white/10 hover:bg-white/[0.04] sm:p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            positive
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-white/5 text-white/30"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-white/20">
            {label}
          </p>

          <p
            className={`mt-1 truncate text-sm font-medium ${
              positive
                ? "text-emerald-400"
                : "text-white/75"
            }`}
          >
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 truncate pl-11 text-xs text-white/20">
        {description}
      </p>
    </div>
  );
}

function EmptyAnalytics() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 py-12 text-center sm:px-6 sm:py-14">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/20">
        <BarChart3 size={20} />
      </div>

      <p className="mt-4 text-sm font-medium text-white/45">
        No spending data yet
      </p>

      <p className="mt-1.5 max-w-xs text-xs leading-5 text-white/20">
        Add some expense transactions to see where your money
        is going.
      </p>
    </div>
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

export default Analytics;