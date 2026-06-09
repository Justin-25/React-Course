import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart, loadCartData }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrdersData() {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    }

    fetchOrdersData()
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCartData={loadCartData} />
      </div>
    </>
  );
}
