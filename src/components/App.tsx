import Login from "./login/Login";
import Products from "./products/Products";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./cart/Cart";
import CartDetails from "./cart/CartDetails";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { useEffect } from "react";
import { restoreSession } from "../store/slices/auth-slice";
import { API_ROUTES } from "../utils/constants";
import { getAuthFromLocalStorage } from "../data/localStorage";
import { useInitDesignFromUrl } from "../hooks/useInitDesignFromUrl";
function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const dispatch = useAppDispatch();

  useInitDesignFromUrl();

  useEffect(() => {
    const user = getAuthFromLocalStorage();

    if (user) {
      dispatch(restoreSession({ username: user }));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route
        path={API_ROUTES.PRODUCTS}
        element={isAuthenticated ? <Products /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={API_ROUTES.PRODUCTS} replace />
          ) : (
            <Login />
          )
        }
      />
      <Route path={API_ROUTES.CART} element={<Cart />} />
      <Route path={API_ROUTES.CART_DETAILS} element={<CartDetails />} />
    </Routes>
  );
}

export default App;
