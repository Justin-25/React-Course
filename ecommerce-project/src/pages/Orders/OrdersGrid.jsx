import { OrderDetailsGrid } from "./OrderDetailsGrid";
import { OrderHead } from "./OrderHeader";

export function OrdersGrid({
  orders
}) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHead 
              order={order}
            />

            <OrderDetailsGrid 
              order={order}
            />
          </div>
        );
      })}
    </div>
  );
}
