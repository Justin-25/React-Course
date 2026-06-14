import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter } from "react-router";
import { Location } from "./Location";

vi.mock("axios");

describe("Payment summary component", () => {
  let loadCartData;

  let paymentSummary;

  let user;

  beforeEach(() => {
    user = userEvent.setup();

    loadCartData = vi.fn();

    paymentSummary = {
      totalItems: 8,
      productCostCents: 15192,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 15192,
      taxCents: 1519,
    };

    axios.get.mockImplementation(async () => {
      return {
        data: {}
      }
    });

    axios.post.mockImplementation(async () => {
      return {
        data: {},
      };
    });
  });

  it("payment summary of the products", async () => {
    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCartData={loadCartData}
        />
      </MemoryRouter>,
    );

    const orderButton = screen.getByTestId("place-order-button");
    const navigate = screen.getByTestId('url-path')
    await user.click(orderButton);
    await loadCartData()

    expect(axios.post).toHaveBeenCalledWith('/api/orders?expand=products')
    expect(navigate).toHaveTextContent('/orders');
    expect(loadCartData).toHaveBeenCalled()
  });
});
