function Display({ expression, value }) {
  return (
    <div className="display">
      <div className="expression">{expression}</div>
      <div className="current-value">{value}</div>
    </div>
  );
}

export default Display;