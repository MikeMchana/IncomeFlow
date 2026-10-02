import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Menu,
  Plus,
  Settings as SettingsIcon,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import AddTransaction from "./components/AddTransaction";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import { initialTransactions } from "./data/transactions";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      "incomeflow_transactions"
    );

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions;
  });

  const totals = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const handleAddTransaction = (transaction) => {
    setTransactions((current) => {
      const updatedTransactions = [transaction, ...current];

      localStorage.setItem(
        "incomeflow_transactions",
        JSON.stringify(updatedTransactions)
      );

      return updatedTransactions;
    });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((current) => {
      const updatedTransactions = current.filter(
        (transaction) => transaction.id !== id
      );

      localStorage.setItem(
        "incomeflow_transactions",
        JSON.stringify(updatedTransactions)
      );

      return updatedTransactions;
    });
  };

  const handleResetTransactions = () => {
    const resetTransactions = [...initialTransactions];

    localStorage.setItem(
      "incomeflow_transactions",
      JSON.stringify(resetTransactions)
    );

    setTransactions(resetTransactions);
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-[#f5f7f6]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:hidden">
        <Logo />

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 p-2.5"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        {/* Desktop Sidebar */}
        <aside className="hidden min-h-screen w-64 shrink-0 border-r border-white/10 px-5 py-7 lg:block">
          <Logo />

          <Navigation
            activePage={activePage}
            onNavigate={handleNavigation}
          />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="relative h-full w-72 bg-[#101514] px-5 py-7">
              <div className="mb-8 flex items-center justify-between">
                <Logo />

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-2 text-white/60 transition hover:bg-white/5"
                  aria-label="Close navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <Navigation
                activePage={activePage}
                onNavigate={handleNavigation}
              />
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
          {activePage === "overview" && (
            <Dashboard
              totals={totals}
              transactions={transactions}
              onAdd={() => setShowAddTransaction(true)}
            />
          )}

          {activePage === "transactions" && (
            <Transactions
              transactions={transactions}
              onDelete={handleDeleteTransaction}
            />
          )}

          {activePage === "analytics" && (
            <Analytics transactions={transactions} />
          )}

          {activePage === "settings" && (
            <Settings
              transactions={transactions}
              onReset={handleResetTransactions}
            />
          )}
        </main>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <AddTransaction
          onClose={() => setShowAddTransaction(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
}

/* -------------------------------- */
/* Dashboard */
/* -------------------------------- */

function Dashboard({ totals, transactions, onAdd }) {
  const currentHour = new Date().getHours();

  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }

  return (
    <>
      <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-emerald-400">
            Personal finance
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {greeting}, Mike.
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
            Here's a clear picture of your money today.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex w-fit items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#07100d] transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add transaction
        </button>
      </section>

      {/* Balance */}
      <section className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#16221e] to-[#101514] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-white/45">
              Available balance
            </p>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-sm text-emerald-400">
                KSh
              </span>

              <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {formatMoney(totals.balance)}
              </h3>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-emerald-400">
                <ArrowUpRight size={16} />
                Active
              </span>

              <span className="text-white/35">
                based on your recorded transactions
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[330px]">
            <StatMini
              label="Income"
              value={`KSh ${formatMoney(totals.income)}`}
              icon={<ArrowDownRight size={17} />}
              positive
            />

            <StatMini
              label="Expenses"
              value={`KSh ${formatMoney(totals.expenses)}`}
              icon={<ArrowUpRight size={17} />}
            />
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Cash Flow */}
        <div className="rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="font-medium">Cash flow</h3>

              <p className="mt-1 text-sm text-white/35">
                Income vs expenses
              </p>
            </div>

            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/40">
              Last 6 months
            </span>
          </div>

          <CashFlowChart transactions={transactions} />
        </div>

        {/* Spending */}
        <Spending transactions={transactions} />
      </section>

      {/* Recent Transactions */}
      <section className="mt-6 rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              Recent transactions
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Your latest activity
            </p>
          </div>

          <span className="text-sm text-white/30">
            {transactions.length} records
          </span>
        </div>

        {transactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
            <p className="text-sm text-white/35">
              No transactions yet.
            </p>

            <p className="mt-1 text-xs text-white/20">
              Add your first transaction to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 6).map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

/* -------------------------------- */
/* Cash Flow Chart */
/* -------------------------------- */

function CashFlowChart({ transactions }) {
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();

    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));

    return {
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
    };
  });

  const monthlyData = months.map((month) => {
    const income = transactions
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === month.monthIndex &&
          date.getFullYear() === month.year &&
          transaction.type === "income"
        );
      })
      .reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

    const expenses = transactions
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === month.monthIndex &&
          date.getFullYear() === month.year &&
          transaction.type === "expense"
        );
      })
      .reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

    return {
      ...month,
      income,
      expenses,
    };
  });

  const maxValue = Math.max(
    ...monthlyData.flatMap((month) => [
      month.income,
      month.expenses,
    ]),
    1
  );

  return (
    <div>
      {/* Legend */}
      <div className="mb-5 flex items-center justify-end gap-4 text-xs text-white/30">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Income
        </span>

        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          Expenses
        </span>
      </div>

      {/* Chart */}
      <div className="flex h-64 items-end gap-3 sm:gap-5">
        {monthlyData.map((month) => {
          const incomeHeight =
            month.income > 0
              ? Math.max(
                  (month.income / maxValue) * 100,
                  8
                )
              : 3;

          const expenseHeight =
            month.expenses > 0
              ? Math.max(
                  (month.expenses / maxValue) * 100,
                  8
                )
              : 3;

          return (
            <div
              key={`${month.month}-${month.year}`}
              className="flex min-w-0 flex-1 flex-col items-center gap-3"
            >
              <div className="flex h-full w-full items-end justify-center gap-1">
                <div
                  className="w-1/2 max-w-8 rounded-t-lg bg-emerald-400/80 transition-all duration-700"
                  style={{
                    height: `${incomeHeight}%`,
                  }}
                  title={`Income: KSh ${formatMoney(
                    month.income
                  )}`}
                />

                <div
                  className="w-1/2 max-w-8 rounded-t-lg bg-white/10 transition-all duration-700"
                  style={{
                    height: `${expenseHeight}%`,
                  }}
                  title={`Expenses: KSh ${formatMoney(
                    month.expenses
                  )}`}
                />
              </div>

              <span className="text-[11px] text-white/30">
                {month.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- */
/* Spending */
/* -------------------------------- */

function Spending({ transactions }) {
  const categories = {};

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) +
        transaction.amount;
    });

  const total = Object.values(categories).reduce(
    (sum, value) => sum + value,
    0
  );

  const categoryList = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#101514] p-6 sm:p-7">
      <div className="mb-7">
        <h3 className="font-medium">Spending</h3>

        <p className="mt-1 text-sm text-white/35">
          Where your money goes
        </p>
      </div>

      {categoryList.length === 0 ? (
        <p className="text-sm text-white/30">
          No expenses recorded yet.
        </p>
      ) : (
        <div className="space-y-5">
          {categoryList.map(([name, amount]) => {
            const percentage =
              total > 0
                ? Math.round((amount / total) * 100)
                : 0;

            return (
              <Category
                key={name}
                name={name}
                amount={`KSh ${formatMoney(amount)}`}
                percent={`${percentage}%`}
                width={`${percentage}%`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------- */
/* Navigation */
/* -------------------------------- */

function Navigation({ activePage, onNavigate }) {
  return (
    <nav className="mt-12 space-y-2">
      <NavItem
        icon={<LayoutDashboard size={18} />}
        label="Overview"
        active={activePage === "overview"}
        onClick={() => onNavigate("overview")}
      />

      <NavItem
        icon={<BarChart3 size={18} />}
        label="Analytics"
        active={activePage === "analytics"}
        onClick={() => onNavigate("analytics")}
      />

      <NavItem
        icon={<Wallet size={18} />}
        label="Transactions"
        active={activePage === "transactions"}
        onClick={() => onNavigate("transactions")}
      />

      <NavItem
        icon={<SettingsIcon size={18} />}
        label="Settings"
        active={activePage === "settings"}
        onClick={() => onNavigate("settings")}
      />
    </nav>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "bg-emerald-400/10 text-emerald-400"
          : "text-white/40 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* -------------------------------- */
/* Logo */
/* -------------------------------- */

function Logo() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 text-sm font-bold text-[#07100d]">
          I
        </div>

        <span className="text-lg font-semibold tracking-tight">
          IncomeFlow
        </span>
      </div>

      <p className="mt-1 pl-10 text-[11px] text-white/30">
        Personal finance
      </p>
    </div>
  );
}

/* -------------------------------- */
/* Small Components */
/* -------------------------------- */

function StatMini({ label, value, icon, positive }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-white/40">
        <span
          className={
            positive
              ? "text-emerald-400"
              : "text-white/40"
          }
        >
          {icon}
        </span>

        {label}
      </div>

      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function Category({ name, amount, percent, width }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/65">{name}</span>

        <span className="text-white/40">{amount}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
          style={{ width }}
        />
      </div>

      <p className="mt-1 text-right text-[10px] text-white/25">
        {percent}
      </p>
    </div>
  );
}

function Transaction({ transaction }) {
  const positive = transaction.type === "income";

  return (
    <div className="flex items-center justify-between rounded-2xl px-3 py-3 transition hover:bg-white/[0.03]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50">
          {positive ? (
            <Wallet size={18} />
          ) : (
            <CreditCard size={18} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {transaction.name}
          </p>

          <p className="mt-1 text-xs text-white/30">
            {transaction.category} · {transaction.date}
          </p>
        </div>
      </div>

      <span
        className={`ml-4 whitespace-nowrap text-sm font-medium ${
          positive
            ? "text-emerald-400"
            : "text-white/70"
        }`}
      >
        {positive ? "+" : "-"} KSh{" "}
        {formatMoney(transaction.amount)}
      </span>
    </div>
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

export default App;