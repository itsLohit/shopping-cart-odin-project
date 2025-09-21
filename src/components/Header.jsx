import { Link, NavLink } from "react-router";
import styles from '../styles/Header.module.css';
import cartImg from '../assets/images/cart.svg';


export default function Header ({cart = []}) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
                <Link to = '/'>Sippy Stores</Link>
            </div>
            <nav className={styles.navLinks} role="navigation" aria-label="nav links">
                <NavLink className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                } to = '/'>Home</NavLink>
                <NavLink className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                } to = '/shop'>Shop</NavLink>
                <NavLink className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                } to = '/cart'>
                <div className={styles.cartNav}>
                    <img src={cartImg} alt="cart-icon" />
                    
                    Cart {itemCount > 0 && <span className= {styles.cartBadge} data-testid="cart-count">{itemCount}</span>}
                </div>
                </NavLink>
            </nav>
        </div>
    )
}

