import Login from "./components/login/Login";
import Products from "./components/products/Products";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Cart from "./components/cart/Cart";
import CartDetails from "./components/cart/CartDetails";
import { useAppDispatch, useAppSelector } from "./hooks/useAppDispatch";
import { useEffect } from "react";
import { DesignVersion } from "./enums";
import { configActions } from "./store/slices/config-slice";
import { authActions } from "./store/slices/auth-slice";
function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const param = searchParams.get("design");

    if (param) {
      const version = parseInt(param, 10);

      const enumValues = Object.values(DesignVersion).filter(
        (v) => typeof v === "number"
      );
      if (enumValues.includes(version)) {
        dispatch(configActions.setDesignVersion(version));
      }
    }
  }, [searchParams, dispatch]);
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(authActions.restoreSession({ username: user }));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route
        path="/products"
        element={isAuthenticated ? <Products /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/products" replace /> : <Login />
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/:id" element={<CartDetails />} />
    </Routes>
  );
}

export default App;
