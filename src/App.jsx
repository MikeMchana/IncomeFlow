import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings as SettingsIcon,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import AddTransaction from "./components/AddTransaction";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import { initialTransactions } from "./data/transactions";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddTransaction, setShowAddTransaction] =
    useState(false);
  const [activePage, setActivePage] = useState("overview");

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return (
      localStorage.getItem("incomeflow_logged_in") === "true" ||
      sessionStorage.getItem("incomeflow_logged_in") === "true"
    );
  });

  const [userEmail, setUserEmail] = useState(() => {
    return (
      localStorage.getItem("incomeflow_user_email") ||
      sessionStorage.getItem("incomeflow_user_email") ||
      ""
    );
  });

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
      .reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const handleLogin = ({ email, rememberMe }) => {
    setIsLoggedIn(true);
    setUserEmail(email);

    if (rememberMe) {
      localStorage.setItem("incomeflow_logged_in", "true");
      localStorage.setItem("incomeflow_user_email", email);

      sessionStorage.removeItem("incomeflow_logged_in");
      sessionStorage.removeItem("incomeflow_user_email");
    } else {
      sessionStorage.setItem("incomeflow_logged_in", "true");
      sessionStorage.setItem("incomeflow_user_email", email);

      localStorage.removeItem("incomeflow_logged_in");
      localStorage.removeItem("incomeflow_user_email");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("incomeflow_logged_in");
    localStorage.removeItem("incomeflow_user_email");

    sessionStorage.removeItem("incomeflow_logged_in");
    sessionStorage.removeItem("incomeflow_user_email");

    setIsLoggedIn(false);
    setUserEmail("");
    setSidebarOpen(false);
    setActivePage("overview");
  };

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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0f0e] text-[#f5f7f6]">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5 lg:hidden">
        <Logo />

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 p-2.5 transition hover:bg-white/10 active:scale-[0.97]"
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
            onLogout={handleLogout}
            userEmail={userEmail}
          />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="relative flex h-full w-[min(82vw,320px)] flex-col overflow-y-auto bg-[#101514] px-4 py-6 shadow-2xl sm:w-72 sm:px-5 sm:py-7">
              <div className="mb-8 flex items-center justify-between">
                <Logo />

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white active:scale-[0.97]"
                  aria-label="Close navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <Navigation
                activePage={activePage}
                onNavigate={handleNavigation}
                onLogout={handleLogout}
                userEmail={userEmail}
              />
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-10">
          {activePage === "overview" && (
            <Dashboard
              totals={totals}
              transactions={transactions}
              onAdd={() => setShowAddTransaction(true)}
              userEmail={userEmail}
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

function Dashboard({
  totals,
  transactions,
  onAdd,
  userEmail,
}) {
  const currentHour = new Date().getHours();
  const currentMonth = new Date().getMonth();

  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }

  const userName = userEmail
    ? userEmail.split("@")[0]
    : "Mike";

  const displayName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <>
      {/* Header */}
      <section className="mb-7 flex flex-col gap-5 sm:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400/80">
              Personal finance
            </p>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {greeting}, {displayName}.
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/40">
            Here's a clear picture of your money today.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-[#07100d] shadow-lg shadow-emerald-400/5 transition hover:bg-emerald-300 hover:shadow-emerald-400/10 active:scale-[0.99] sm:w-fit"
        >
          <Plus
            size={18}
            className="transition-transform duration-200 group-hover:rotate-90"
          />

          Add transaction
        </button>
      </section>

      {/* Balance */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#17241f] via-[#13201c] to-[#101514] p-5 shadow-2xl shadow-black/10 sm:p-8">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-white/45">
                Available balance
              </p>

              <span className="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-0.5 text-[9px] uppercase tracking-wider text-emerald-400/60">
                Live
              </span>
            </div>

            <div className="mt-2 flex min-w-0 items-baseline gap-2">
              <span className="shrink-0 text-sm font-medium text-emerald-400">
                KSh
              </span>

              <h3
                className={`min-w-0 break-words text-4xl font-semibold tracking-tight sm:text-5xl ${
                  totals.balance < 0
                    ? "text-red-400"
                    : "text-white"
                }`}
              >
                {formatMoney(Math.abs(totals.balance))}
              </h3>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                  <ArrowUpRight size={12} />
                </span>

                Active balance
              </span>

              <span className="text-white/25">
                Based on recorded transactions
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 md:w-auto md:min-w-[350px]">
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
        <div className="min-w-0 rounded-3xl border border-white/10 bg-[#101514] p-5 sm:p-7">
          <div className="mb-7 flex items-start justify-between gap-3 sm:mb-8 sm:gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  Cash flow
                </h3>

                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />
              </div>

              <p className="mt-1 text-sm text-white/35">
                Income vs expenses throughout the year
              </p>
            </div>

            <span className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-white/40 sm:px-3">
              {new Date().getFullYear()}
            </span>
          </div>

          <CashFlowChart
            transactions={transactions}
            currentMonth={currentMonth}
          />
        </div>

        {/* Spending */}
        <Spending transactions={transactions} />
      </section>

      {/* Recent Transactions */}
      <section className="mt-6 rounded-3xl border border-white/10 bg-[#101514] p-5 sm:p-7">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-medium">
              Recent transactions
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Your latest activity
            </p>
          </div>

          <span className="w-fit rounded-lg border border-white/5 bg-white/[0.025] px-3 py-2 text-xs text-white/30">
            {transactions.length}{" "}
            {transactions.length === 1
              ? "record"
              : "records"}
          </span>
        </div>

        {transactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/25">
              <Wallet size={19} />
            </div>

            <p className="mt-4 text-sm text-white/35">
              No transactions yet.
            </p>

            <p className="mt-1 text-xs text-white/20">
              Add your first transaction to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
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

function CashFlowChart({
  transactions,
  currentMonth,
}) {
  const currentYear = new Date().getFullYear();

  const months = Array.from(
    { length: 12 },
    (_, index) => {
      const date = new Date(
        currentYear,
        index,
        1
      );

      return {
        month: date.toLocaleString("en-US", {
          month: "short",
        }),
        monthIndex: index,
      };
    }
  );

  const monthlyData = months.map((month) => {
    const income = transactions
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getFullYear() === currentYear &&
          date.getMonth() === month.monthIndex &&
          transaction.type === "income"
        );
      })
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

    const expenses = transactions
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getFullYear() === currentYear &&
          date.getMonth() === month.monthIndex &&
          transaction.type === "expense"
        );
      })
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
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

  const hasData = transactions.some((transaction) => {
    const date = new Date(transaction.date);

    return date.getFullYear() === currentYear;
  });

  return (
    <div className="min-w-0">
      {/* Legend */}
      <div className="mb-5 flex flex-col gap-3 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
        <p className="text-[11px] text-white/20">
          Monthly activity
        </p>

        <div className="flex items-center gap-4 text-xs text-white/30">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Income
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            Expenses
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 min-w-0 overflow-visible">
        {/* Horizontal grid */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
          <div className="border-t border-white/[0.045]" />
          <div className="border-t border-white/[0.045]" />
          <div className="border-t border-white/[0.045]" />
          <div className="border-t border-white/[0.045]" />
          <div className="border-t border-white/[0.07]" />
        </div>

        <div className="relative flex h-full min-w-0 items-end gap-0.5 sm:gap-2">
          {monthlyData.map((month) => {
            const isCurrentMonth =
              month.monthIndex === currentMonth;

            const incomeHeight =
              month.income > 0
                ? Math.max(
                    (month.income / maxValue) * 88,
                    7
                  )
                : 0;

            const expenseHeight =
              month.expenses > 0
                ? Math.max(
                    (month.expenses / maxValue) * 88,
                    7
                  )
                : 0;

            return (
              <div
                key={month.monthIndex}
                className={`group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end rounded-xl pt-2 transition ${
                  isCurrentMonth
                    ? "bg-white/[0.025]"
                    : ""
                }`}
              >
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-[calc(100%-30px)] left-1/2 z-20 hidden w-36 -translate-x-1/2 rounded-xl border border-white/10 bg-[#171d1b] p-3 shadow-xl group-hover:block">
                  <p className="mb-2 text-xs font-medium text-white/70">
                    {month.month}
                  </p>

                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between gap-3">
                      <span className="text-emerald-400/70">
                        Income
                      </span>

                      <span className="text-white/50">
                        KSh{" "}
                        {formatMoney(month.income)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-white/35">
                        Expenses
                      </span>

                      <span className="text-white/50">
                        KSh{" "}
                        {formatMoney(month.expenses)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bars */}
                <div className="flex h-[calc(100%-28px)] w-full items-end justify-center gap-px px-0.5 sm:gap-1 sm:px-1">
                  <div
                    className={`w-1/2 max-w-7 rounded-t-md transition-all duration-700 ${
                      month.income > 0
                        ? "bg-emerald-400/85 group-hover:bg-emerald-300"
                        : "h-1 bg-emerald-400/10"
                    }`}
                    style={
                      month.income > 0
                        ? {
                            height: `${incomeHeight}%`,
                          }
                        : undefined
                    }
                  />

                  <div
                    className={`w-1/2 max-w-7 rounded-t-md transition-all duration-700 ${
                      month.expenses > 0
                        ? "bg-white/15 group-hover:bg-white/25"
                        : "h-1 bg-white/5"
                    }`}
                    style={
                      month.expenses > 0
                        ? {
                            height: `${expenseHeight}%`,
                          }
                        : undefined
                    }
                  />
                </div>

                {/* Month */}
                <span
                  className={`mt-3 text-[9px] sm:text-[11px] ${
                    isCurrentMonth
                      ? "font-medium text-emerald-400"
                      : "text-white/25"
                  }`}
                >
                  {month.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {!hasData && (
        <p className="mt-5 text-center text-xs text-white/20">
          Add transactions to build your cash-flow history.
        </p>
      )}

      {hasData && (
        <p className="mt-5 text-center text-xs text-white/20">
          {currentYear} · Monthly income and expenses
        </p>
      )}
    </div>
  );
}

/* -------------------------------- */
/* Spending */
/* -------------------------------- */

function Spending({ transactions }) {
  const categories = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
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
    <div className="min-w-0 rounded-3xl border border-white/10 bg-[#101514] p-5 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-3 sm:mb-7 sm:gap-4">
        <div className="min-w-0">
          <h3 className="font-medium">
            Spending
          </h3>

          <p className="mt-1 text-sm text-white/35">
            Where your money goes
          </p>
        </div>

        {total > 0 && (
          <span className="shrink-0 text-xs text-white/25">
            KSh {formatMoney(total)}
          </span>
        )}
      </div>

      {categoryList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/25">
            <CreditCard size={17} />
          </div>

          <p className="mt-3 text-sm text-white/30">
            No expenses recorded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {categoryList.map(([name, amount]) => {
            const percentage =
              total > 0
                ? Math.round(
                    (amount / total) * 100
                  )
                : 0;

            return (
              <Category
                key={name}
                name={name}
                amount={`KSh ${formatMoney(
                  amount
                )}`}
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

function Navigation({
  activePage,
  onNavigate,
  onLogout,
  userEmail,
}) {
  return (
    <div className="flex min-h-[calc(100vh-90px)] flex-1 flex-col">
      <nav className="mt-10 flex-1 space-y-2 sm:mt-12">
        <NavItem
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          active={activePage === "overview"}
          onClick={() =>
            onNavigate("overview")
          }
        />

        <NavItem
          icon={<BarChart3 size={18} />}
          label="Analytics"
          active={activePage === "analytics"}
          onClick={() =>
            onNavigate("analytics")
          }
        />

        <NavItem
          icon={<Wallet size={18} />}
          label="Transactions"
          active={activePage === "transactions"}
          onClick={() =>
            onNavigate("transactions")
          }
        />

        <NavItem
          icon={<SettingsIcon size={18} />}
          label="Settings"
          active={activePage === "settings"}
          onClick={() =>
            onNavigate("settings")
          }
        />
      </nav>

      {/* Account + Logout */}
      <div className="border-t border-white/10 pt-5">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.025] px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-sm font-semibold text-emerald-400">
            {userEmail
              ? userEmail
                  .charAt(0)
                  .toUpperCase()
              : "M"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-white/70">
              {userEmail || "Demo user"}
            </p>

            <p className="mt-0.5 text-[10px] text-white/25">
              Demo account
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/35 transition hover:bg-red-400/5 hover:text-red-400 active:scale-[0.99]"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition active:scale-[0.99] ${
        active
          ? "bg-emerald-400/10 text-emerald-400 shadow-sm shadow-emerald-400/5"
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
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400 text-sm font-bold text-[#07100d]">
          I
        </div>

        <span className="truncate text-lg font-semibold tracking-tight">
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

function StatMini({
  label,
  value,
  icon,
  positive,
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition hover:border-white/15 hover:bg-white/[0.045] sm:p-4">
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

      <p className="truncate text-sm font-medium">
        {value}
      </p>
    </div>
  );
}

function Category({
  name,
  amount,
  percent,
  width,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="min-w-0 truncate text-white/65">
          {name}
        </span>

        <span className="shrink-0 text-xs text-white/40">
          {amount}
        </span>
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
  const positive =
    transaction.type === "income";

  return (
    <div className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl px-2 py-3 transition hover:bg-white/[0.035] sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-white/5 text-white/35"
          }`}
        >
          {positive ? (
            <ArrowDownRight size={18} />
          ) : (
            <CreditCard size={17} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {transaction.name}
          </p>

          <p className="mt-1 truncate text-xs text-white/30">
            {transaction.category} ·{" "}
            {transaction.date}
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 whitespace-nowrap text-xs font-medium sm:text-sm ${
          positive
            ? "text-emerald-400"
            : "text-white/65"
        }`}
      >
        {positive ? "+" : "-"} KSh{" "}
        {formatMoney(transaction.amount)}
      </span>
    </div>
  );
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-KE").format(
    amount
  );
}

export default App;