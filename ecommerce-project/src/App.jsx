import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/Orders/OrdersPage";
import { TrackingPage } from "./pages/Tracking/TrackingPage";
import { NotFound } from "./pages/NotFound";
import { useEffect, useState } from "react";

import axios from "axios";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
