import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CustomerApp from "./CustomerApp.jsx";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Test from "./Test.jsx";
import SearchPage from "./components/SearchPage.jsx";
import FavouritePage from "./components/FavouritePage.jsx";
import CartPage from "./components/CartPage.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import ProductPage from "./components/ProductPage.jsx";
import VendorApp from "./VendorApp.jsx";
import VendorLoginPage from "./components/vendor/VendorLoginPage.jsx";
import VendorHomePage from "./components/vendor/VendorHomePage.jsx";
import Dashboard from "./components/vendor/Dashboard.jsx";
import VendorProductsPage from "./components/vendor/VendorProductsPage.jsx";
import VendorProductPage from "./components/vendor/VendorProductPage.jsx";
import NewProductPage from "./components/vendor/NewProductPage.jsx";
import VendorQuestionPage from "./components/vendor/VendorQuestionPage.jsx";
import VendorOrderPage from "./components/vendor/VendorOrderPage.jsx";
import VendorAccountPage from "./components/vendor/VendorAccountPage.jsx";
import AccountPage from "./components/AccountPage.jsx";
import HistoryPage from "./components/HistoryPage.jsx";
import OrdersPage from "./components/OrdersPage.jsx";
import AddressPage from "./components/AddressPage.jsx";
import PriceTracker from "./components/PriceTracker.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerApp />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/search/:query",
            element: <SearchPage />,
          },
          {
            path: "/category/:categoryName",
            element: <CategoryPage />,
          },
          {
            path: "/wishlist",
            element: <FavouritePage />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/product/:id",
            element: <ProductPage />,
          },
          {
            path: "/test",
            element: <Test />,
          },
          {
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "/history",
            element: <HistoryPage />,
          },
          {
            path: "/orders",
            element: <OrdersPage />,
          },
          {
            path: "/address",
            element: <AddressPage />,
          },
          {
            path: "/pricetracker",
            element: <PriceTracker />,
          },
        ],
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/vendor",
    element: <VendorApp />,
    children: [
      {
        path: "/vendor/login",
        element: <VendorLoginPage />,
      },
      {
        path: "/vendor",
        element: <VendorHomePage />,
        children: [
          {
            path: "/vendor/home",
            element: <Dashboard />,
          },
          {
            path: "/vendor/products",
            element: <VendorProductsPage />,
          },
          {
            path: "/vendor/products/:id",
            element: <VendorProductPage />,
          },
          {
            path: "/vendor/products/new",
            element: <NewProductPage />,
          },
          {
            path: "/vendor/questions",
            element: <VendorQuestionPage />,
          },
          {
            path: "/vendor/orders",
            element: <VendorOrderPage />,
          },
          {
            path: "/vendor/account",
            element: <VendorAccountPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
