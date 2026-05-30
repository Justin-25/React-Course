import { Routes, Route } from "react-router";

import "./App.css";

import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/Orders/OrdersPage";
import { TrackingPage } from "./pages/Tracking/TrackingPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
