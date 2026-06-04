import { Link } from "react-router";
import { useParams } from "react-router";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./TrackingPage.css";
import "../../components/header.css";

export function TrackingPage({
  cart
}) {

  const {orderId, productId} = useParams();
  const [order, setOrder] = useState(null)

  useEffect(() => {
    async function fetchTrackingPageData() {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
        setOrder(response.data)
    }

    fetchTrackingPageData()
  }, [orderId])

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find(
    (product) => product.productId === productId
  );

  if (!orderProduct) {
    return null
  }

  let totalDeliveryTimeMs = 0;
    totalDeliveryTimeMs += orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = Math.min((timePassedMs / totalDeliveryTimeMs) * 100, 100);

  let isPreparing;
  let isShipped;
  let isDelivered;

  if (deliveryPercent < 33) {
    isPreparing = true
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    isShipped = true
  } else if (deliveryPercent >= 100) {
    isDelivered = true
  }
  

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>
          <div className="delivery-date">{deliveryPercent >= 100 ? "Delivered on" : "Arriving on" } {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}</div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{width:`${deliveryPercent}%`}}  
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
