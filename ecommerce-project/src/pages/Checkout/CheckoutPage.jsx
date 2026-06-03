import { Link } from "react-router";
import { CheckoutHeaderPage } from "./CheckoutHeaderPage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeaderPage />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
          />

          <PaymentSummary 
            paymentSummary={paymentSummary}
          />
        </div>
      </div>
    </>
  );
}
