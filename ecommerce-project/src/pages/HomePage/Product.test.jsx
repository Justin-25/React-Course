import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "./Product";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

describe("Product component", () => {
  let product;

  let loadCartData;

  let user;

  beforeEach(() => {
    user = userEvent.setup();

    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCartData = vi.fn();
  });

  it("display the products details correctly", () => {
    render(<Product product={product} loadCartData={loadCartData} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`,
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    render(<Product product={product} loadCartData={loadCartData} />);

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCartData).toHaveBeenCalled();
  });

  it('select a quantity for the product', async () => {
    render(<Product product={product} loadCartData={loadCartData} />);

    const quantitySelector = screen.getByTestId("select-quantity");
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(quantitySelector);
    await user.selectOptions(quantitySelector, '3')
    await user.click(addToCartButton);

    expect(quantitySelector).toHaveValue('3')

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 3
    });

    expect(loadCartData).toHaveBeenCalled();
  })
});
