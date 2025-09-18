import { Link, NavLink } from "react-router";

export default function Header ({cart = []}) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div>
            <div className="logo">
                <Link to = '/'>Sippy Cart</Link>
            </div>
            <nav className="navLinks" role="navigation" aria-label="nav links">
                <NavLink to = '/'>Home</NavLink>
                <NavLink to = '/shop'>Shop</NavLink>
                <NavLink to = '/cart'>Cart {itemCount > 0 && <span data-testid="cart-count">{itemCount}</span>}</NavLink>
            </nav>
        </div>
    )
}