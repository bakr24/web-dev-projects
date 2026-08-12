function Button({ value, onClick, type = "" }) {
  return (
    <button
      className={`calculator-button ${type}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;