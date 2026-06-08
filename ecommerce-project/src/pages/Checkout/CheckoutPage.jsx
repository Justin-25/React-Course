import { Link } from "react-router";
import { CheckoutHeaderPage } from "./CheckoutHeaderPage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart, loadCartData }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    async function fetchCheckoutData() {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    }

    fetchCheckoutData()
  }, [cart]);

  return (
    <>
      <link rel="icon" type="image/png" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeaderPage 
        cart={cart}
      />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCartData={loadCartData} />

          <PaymentSummary paymentSummary={paymentSummary} loadCartData={loadCartData} />
        </div>
      </div>
    </>
  );
}
