import { Link, NavLink } from "react-router";
import styles from '../styles/Header.module.css';

export default function Header ({cart = []}) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
                <Link to = '/'>Sippy Cart</Link>
            </div>
            <nav className={styles.navLinks} role="navigation" aria-label="nav links">
                <NavLink className={styles.navLink} to = '/'>Home</NavLink>
                <NavLink className={styles.navLink} to = '/shop'>Shop</NavLink>
                <NavLink className={styles.navLink} to = '/cart'>Cart {itemCount > 0 && <span className= {styles.cartBadge} data-testid="cart-count">{itemCount}</span>}</NavLink>
            </nav>
        </div>
    )
}