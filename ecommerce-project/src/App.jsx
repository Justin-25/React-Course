import { Routes, Route } from "react-router";

import "./App.css";

import { HomePage } from "./pages/Homepage";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { Tracking } from "./pages/Tracking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="orders" element={<Orders />} />
      <Route path="tracking" element={<Tracking />} />
    </Routes>
  );
}

export default App;
