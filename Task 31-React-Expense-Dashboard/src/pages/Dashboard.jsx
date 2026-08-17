import { useState } from "react";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  function addTransaction(transaction) {
    const updatedTransactions = [
      transaction,
      ...transactions,
    ];

    setTransactions(updatedTransactions);

    localStorage.setItem(
      "transactions",
      JSON.stringify(updatedTransactions)
    );
  }

  function deleteTransaction(id) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);

    localStorage.setItem(
      "transactions",
      JSON.stringify(updatedTransactions)
    );
  }

  return (
    <main className="dashboard">
      <Header />

      <SummaryCards transactions={transactions} />

      <div className="dashboard-grid">
        <TransactionForm
          onAddTransaction={addTransaction}
        />

        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </main>
  );
}

export default Dashboard;