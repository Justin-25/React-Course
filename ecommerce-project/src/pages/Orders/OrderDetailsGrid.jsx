import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";

export function OrderDetailsGrid({ order, loadCartData }) {

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        async function addtoCart() {
          await axios.post("/api/cart-items", {
            productId: orderProduct.product.id,
            quantity: Number(1)
          });

          await loadCartData();
        }

        return (
          <Fragment key={orderProduct.productId}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img
                  className="buy-again-icon"
                  src={"src/assets/images/icons/buy-again.png"}
                />
                <span className="buy-again-message" onClick={addtoCart}>
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
