import { DeliveryDate } from "./DeliveryDate";
import { CartItemDetailsGrid } from "./CartItemDetailsGrid";

export function OrderSummary({
  cart,
  deliveryOptions,
  loadCartData
}) {
  return (

    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate 
                selectedDeliveryOption={selectedDeliveryOption}
              />

              <CartItemDetailsGrid 
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCartData={loadCartData}
              />
            </div>
          );
        })}
    </div>
  );
}
