import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
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
    async function fetchAppData() {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    }

    fetchAppData()
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />

      <Route path="*" element={<NotFound cart={cart} />} />
    </Routes>
  );
}

export default App;
