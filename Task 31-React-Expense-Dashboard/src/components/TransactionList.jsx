import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onDelete }) {
  return (
    <section className="transaction-list-section">
      <div className="section-header">
        <h2>Recent Transactions</h2>
        <span>{transactions.length} transactions</span>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-transactions">
          <p>No transactions yet.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;