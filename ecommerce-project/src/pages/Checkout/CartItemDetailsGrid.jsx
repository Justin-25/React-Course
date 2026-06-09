import axios from "axios";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { useState } from "react";

export function CartItemDetailsGrid({
  cartItem,
  deliveryOptions,
  loadCartData,
}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  async function deleteCartItem() {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);

    await loadCartData();
  }

  function inputUpdateQuantity(event) {
    setQuantity(Number(event.target.value));
  }
  
  async function keyFormat(event) {
    if (event.key === "Enter") {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity
      });

      setIsUpdating(false);
      await loadCartData();
    } else if (event.key === "Escape") {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: cartItem.quantity
      });
      
      setIsUpdating(false);
      await loadCartData();
    }
  }

  async function updateCartQuantity() {
    if (isUpdating === false) {
      setIsUpdating(true);
    } else if (isUpdating === true) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity
      });

      setIsUpdating(false);
      await loadCartData();
    }
  }

  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating === true ? (
              <input
                type="text"
                value={quantity}
                onChange={inputUpdateQuantity}
                onKeyDown={keyFormat}
                style={{ width: "50px" }}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>

      <DeliveryOptions
        cartItem={cartItem}
        deliveryOptions={deliveryOptions}
        loadCartData={loadCartData}
      />
    </div>
  );
}
