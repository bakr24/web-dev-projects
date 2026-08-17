function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <p>PKR {item.price.toLocaleString()}</p>

        <div className="quantity-controls">
          <button onClick={() => onDecrease(item.id)}>
            -
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => onIncrease(item.id)}>
            +
          </button>
        </div>
      </div>

      <div className="cart-item-right">
        <strong>
          PKR {(item.price * item.quantity).toLocaleString()}
        </strong>

        <button
          className="remove-button"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;