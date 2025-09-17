import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,           // App holds the state/context and header
    errorElement: <ErrorPage />,
    children: [
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <CartPage /> },
      { index: true, element: <div><h1>Welcome to Sippy Cart</h1></div> }
    ]
  }
]);

export default router;
