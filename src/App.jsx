import { useParams } from "react-router";
import { useState } from "react";
import products from "./data/products";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";


export default function App () {
  const { name, productId } = useParams();
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

  let page;
  if (productId) {
    const product = products.find((p) => p.id === productId);
    page = <ProductDetailsPage product={product} />;
  } else if (name === "home") {
    page = <HomePage />;
  } else if (name === "shop") {
    page = (
      <ShopPage
        onAddToCart={handleAddToCart}
        products={products}
      />
    );
  } else if (name === "cart") {
    page = (
      <CartPage
        cart={cart}
        setCart={setCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    );
  } else {
    page = <HomePage />;
  }



    return (
        <>

          <Header />
          {page}
        </>
    )
}