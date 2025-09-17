import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";
import { useState } from "react";
import products from "./data/products";

export default function App () {
  const initialCart = [];
  const [cart, setCart] = useState(initialCart);

  function handleAddToCart(product) {
    setCart(cart => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        return cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.count }
            : item
        );
      } else {
        return [...cart, { ...product, quantity: product.count }];
      }
    });
  }

  function handleIncrement(id) {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrement(id) {
    setCart(cart =>
      cart
        .map(item =>
          item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
        )
        .filter(item => item.quantity > 0) 
    );
  }



    return (
        <>
          <ShopPage 
            onAddToCart = {handleAddToCart}
            products={products}
          />
          <CartPage 
            cart = {cart}
            setCart = {setCart}
            onIncrement = {handleIncrement}
            onDecrement = {handleDecrement}
          />
        </>
    )
}