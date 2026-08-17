function TransactionItem({ transaction, onDelete }) {
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h3>{transaction.title}</h3>
        <p>{transaction.category}</p>
      </div>

      <div className="transaction-actions">
        <strong
          className={
            transaction.type === "income"
              ? "income"
              : "expense"
          }
        >
          {transaction.type === "income" ? "+" : "-"} PKR{" "}
          {transaction.amount.toLocaleString()}
        </strong>

        <button onClick={() => onDelete(transaction.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;