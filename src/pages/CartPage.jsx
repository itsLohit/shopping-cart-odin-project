import CartItem from "../components/CartItem";
import Header from "../components/Header";

export default function CartPage ({ cart = [], onIncrement, onDecrement }) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;


    return (
        <>
        <Header />
        <div className="title"><h1>Shopping Cart</h1></div>
        <div className="cart-container">
            <div className="items-container">
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
                    />
                ))}
            </div>
            <div className="checkout-container">
                <div className="checkout-box-heading"><h2>Order Summary</h2></div>
                <div className="cost-container">
                    <div data-testid="checkout-subtotal">Subtotal: {subtotal}</div>
                    <div data-testid="checkout-shipping">Shipping: {shipping}</div>
                    <div data-testid="checkout-tax">Tax: {tax}</div>
                </div>
                <div className="total-cost" data-testid="order-total">Total: {total}</div>
                <button>Proceed to checkout</button>
            </div>
        </div>
        </>
    )
}