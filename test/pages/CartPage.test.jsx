import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../../src/pages/CartPage";
import { MemoryRouter } from "react-router";

// Mock cart data—ids, titles, images, price, and quantity
const mockCart = [
  {
    id: 1,
    title: "Cool Hat",
    imgSrc: "hat.jpg",
    imgAlt: "A blue hat",
    price: 500,
    quantity: 2
  },
  {
    id: 2,
    title: "Nice Shirt",
    imgSrc: "shirt.jpg",
    imgAlt: "A nice shirt",
    price: 800,
    quantity: 1
  },
];

describe('Cart Page', () => {
  it('renders the header and cart page title', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /sippy cart/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();
  });

  it('renders all cart items with image, title, price, and quantity', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    mockCart.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText(item.imgAlt)).toBeInTheDocument();
      expect(screen.getByText(item.price.toString())).toBeInTheDocument();
      expect(screen.getByText(item.quantity.toString())).toBeInTheDocument();
    });
  });
  
  it('renders per-item subtotal in the cart', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    mockCart.forEach(item => {
      const subtotal = (item.price * item.quantity).toString();
      expect(screen.getByText(subtotal)).toBeInTheDocument();
    });
  });
  
  it('shows increment/decrement controls but no "Add to cart" button', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('button', { name: "+" })).not.toHaveLength(0);
    expect(screen.getAllByRole('button', { name: "-" })).not.toHaveLength(0);
    expect(screen.queryByText(/add to cart/i)).not.toBeInTheDocument();
  });

  it('renders order summary and checkout button', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/shipping/i)).toBeInTheDocument();
    expect(screen.getByText(/tax/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });
});
