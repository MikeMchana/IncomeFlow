import {
  ArrowDownRight,
  ArrowUpRight,
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

    return {
      income,
      expenses,
      balance,
      categories,
      highestExpense,
      highestIncome,
      savingsRate,
    };
  }, [transactions]);

  return (
    <div>
      {/* Page Header */}
      <section className="mb-8">
        <p className="mb-2 text-sm text-emerald-400">
          Financial insights
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Analytics
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
          Understand where your money is coming from and where
          it's going.
        </p>
      </section>

      {/* Overview Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          label="Total income"
          value={`KSh ${formatMoney(analytics.income)}`}
          icon={<ArrowDownRight size={18} />}
          accent
        />

        <AnalyticsCard
          label="Total expenses"
          value={`KSh ${formatMoney(analytics.expenses)}`}
          icon={<ArrowUpRight size={18} />}
        />

        <AnalyticsCard
          label="Current balance"
          value={`KSh ${formatMoney(analytics.balance)}`}
          icon={<Wallet size={18} />}
        />

        <AnalyticsCard
          label="Savings rate"
          value={`${analytics.savingsRate}%`}
          icon={<TrendingUp size={18} />}
          accent
        />
      </section>

      {/* Main Analytics */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Spending Breakdown */}
        <div className="rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
          <div className="mb-8">
            <h2 className="font-medium">
              Spending breakdown
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Your expenses by category
            </p>
          </div>

          {analytics.categories.length === 0 ? (
            <EmptyAnalytics />
          ) : (
            <div className="space-y-6">
              {analytics.categories.map(([category, amount]) => {
                const percentage =
                  analytics.expenses > 0
                    ? Math.round(
                        (amount / analytics.expenses) * 100
                      )
                    : 0;

                return (
                  <div key={category}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-white/65">
                        {category}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/30">
                          {percentage}%
                        </span>

                        <span className="text-sm text-white/50">
                          KSh {formatMoney(amount)}
                        </span>
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Financial Snapshot */}
        <div className="rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
          <div className="mb-8">
            <h2 className="font-medium">
              Financial snapshot
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Highlights from your records
            </p>
          </div>

          <div className="space-y-4">
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
            />

            <Insight
              label="Transactions"
              value={transactions.length}
              description="Total recorded activity"
            />

            <Insight
              label="Average expense"
              value={
                analytics.expenses > 0
                  ? `KSh ${formatMoney(
                      Math.round(
                        analytics.expenses /
                          transactions.filter(
                            (transaction) =>
                              transaction.type === "expense"
                          ).length
                      )
                    )}`
                  : "KSh 0"
              }
              description="Average per expense transaction"
            />
          </div>
        </div>
      </section>

      {/* Money Position */}
      <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#16221e] to-[#101514] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-white/40">
              Your money position
            </p>

            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              KSh {formatMoney(analytics.balance)}
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/35">
              This is the difference between all recorded income
              and expenses.
            </p>
          </div>

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/5">
            <div className="text-center">
              <p className="text-2xl font-semibold text-emerald-400">
                {analytics.savingsRate}%
              </p>

              <p className="text-[10px] text-white/30">
                retained
              </p>
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
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101514] p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-white/35">
          {label}
        </span>

        <span
          className={
            accent
              ? "text-emerald-400"
              : "text-white/30"
          }
        >
          {icon}
        </span>
      </div>

      <p className="text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function Insight({
  label,
  value,
  description,
  positive,
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-white/30">
            {label}
          </p>

          <p
            className={`mt-1 text-sm font-medium ${
              positive
                ? "text-emerald-400"
                : "text-white/75"
            }`}
          >
            {value}
          </p>
        </div>

        <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-400/60" />
      </div>

      <p className="mt-2 truncate text-xs text-white/25">
        {description}
      </p>
    </div>
  );
}

function EmptyAnalytics() {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
      <p className="text-sm text-white/35">
        No expense data yet.
      </p>

      <p className="mt-1 text-xs text-white/20">
        Add some expenses to see your spending breakdown.
      </p>
    </div>
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

export default Analytics;