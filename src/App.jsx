import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { allProducts } from "./data/products";
import ScrollToTop from "./components/ScrollToTop";


export default function App () {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  setLoading(true);
  fetch('https://api.escuelajs.co/api/v1/products')
    .then(res => res.json())
    .then(data => {
      if(allProducts) {
        setProducts(allProducts);
      } else {
        setProducts(data);
      }
      
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to load products from API");
      setLoading(false);
    });
}, []);

  const { name, productId } = useParams();
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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


  function handleDelete (id) {
        setCart(
          cart.filter(item => item.id !== id)
        );
  }
  
  console.log(products.map(p => p.category && p.category.name));

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  let page;
  if (productId) {
    const product = products.find((p) => String(p.id) === String(productId));
    page = <ProductDetailsPage product={product} onAddToCart={handleAddToCart} products={products}/>;
  } else if (name === "home") {
    page = <HomePage products={products}/>;
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
        onDelete={handleDelete}
      />
    );
  } else {
    page = <HomePage products={products}/>;
  }


  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

    return (
        <>
          <ScrollToTop />
          <Header 
            cart={cart}
          />
          {page}
        </>
    )
}