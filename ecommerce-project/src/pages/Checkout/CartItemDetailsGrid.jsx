import axios from "axios";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function CartItemDetailsGrid({
  cartItem,
  deliveryOptions,
  loadCartData
}) {

  async function deleteCartItem() {
    await axios.delete(`/api/cart-items/${cartItem.productId}`)

    await loadCartData();
  }

  async function updateCartQuantity() {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: cartItem.quantity
    })

    await loadCartData();
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
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary"
            onChange={updateCartQuantity}
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary"
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
