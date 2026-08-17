import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page empty-cart">
        <h1>Your Cart Is Empty</h1>
        <p>Add some products to your cart to get started.</p>

        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <strong>PKR {total.toLocaleString()}</strong>
          </div>

          <button className="checkout-button">
            Checkout
          </button>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;