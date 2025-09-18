import CartItem from "../components/CartItem";
import Header from "../components/Header";
import styles from "../styles/CartPage.module.css";

export default function CartPage ({ cart = [], onIncrement, onDecrement, onDelete }) {

    if (cart.length === 0) {
      return (
        <div className="empty-cart-message">
          Your cart is empty.
        </div>
      )
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;


    return (
        <>
        <div className={styles.title}><h1>Shopping Cart</h1></div>
        <div className={styles.cartInfoNote}>
          Review your items below before proceeding to checkout.
        </div>
        <div className={styles.cartContainer}>
            <div className={styles.itemsContainer}>
                {cart.map(item => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      imgSrc={item.imgSrc}
                      imgAlt={item.imgAlt}
                      price={item.price}
                      quantity={item.quantity}
                      onIncrement={onIncrement}
                      onDecrement={onDecrement}
                      onDelete={onDelete}
                    />
                ))}
            </div>
            <div className={styles.checkoutContainer}>
                <div className={styles.checkoutBoxHeading}><h2>Order Summary</h2></div>
                <div className={styles.costContainer}>
                    <div data-testid="checkout-subtotal">Subtotal: ${subtotal}</div>
                    <div data-testid="checkout-shipping">Shipping: ${shipping}</div>
                    <div data-testid="checkout-tax">Tax (18%): ${tax}</div>
                </div>
                <div className={styles.totalCost} data-testid="order-total">Total: {total}</div>
                <button className={styles.checkoutButton}>Proceed to checkout</button>
            </div>
        </div>
        </>
    )
}