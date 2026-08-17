function SummaryCards({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <section className="summary-cards">
      <div className="summary-card">
        <span>Total Balance</span>
        <h2>PKR {balance.toLocaleString()}</h2>
      </div>

      <div className="summary-card">
        <span>Total Income</span>
        <h2>PKR {income.toLocaleString()}</h2>
      </div>

      <div className="summary-card">
        <span>Total Expenses</span>
        <h2>PKR {expenses.toLocaleString()}</h2>
      </div>
    </section>
  );
}

export default SummaryCards;