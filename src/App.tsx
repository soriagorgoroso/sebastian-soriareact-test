import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/_global.scss";
import Login from "./components/login/Login";
import Products from "./pages/Products";
import ProductCreate from "./pages/ProductCreate";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuthStore } from "./store/authStore";
import ProductDetail from "./components/products/ProductDetails";
import Users from "./pages/Users";

const App: React.FC = () => {
  const { initializeActivityTimeout, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      initializeActivityTimeout();
    }
  }, [user, initializeActivityTimeout]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={<PrivateRoute component={Products} />}
        />
        <Route
          path="/products/create"
          element={<PrivateRoute component={ProductCreate} />}
        />
        <Route
          path="/products/:id"
          element={<PrivateRoute component={ProductDetail} />}
        />
        <Route path="/users" element={<PrivateRoute component={Users} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
