import { Link, NavLink } from "react-router";

export default function Header () {
    return (
        <div>
            <div className="logo">
                <Link to = '/'>Sippy Cart</Link>
            </div>
            <nav className="navLinks" role="navigation" aria-label="nav links">
                <NavLink to = '/'>Home</NavLink>
                <NavLink to = '/shop'>Shop</NavLink>
                <NavLink to = '/cart'>Cart</NavLink>
            </nav>
        </div>
    )
}