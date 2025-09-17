import App from "./App";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/:name?",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:productId",
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
