import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartItem from "../../src/components/CartItem";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockItem = {
  id: 1,
  title: "Cool Hat",
  imgSrc: "hat.jpg",
  imgAlt: "A blue hat",
  price: 500,
  quantity: 2,
};

describe('CartItem', () => {
  it('renders the product image with meaningful alt text', () => {
    render(
      <MemoryRouter>
        <CartItem {...mockItem} />
      </MemoryRouter>
    );
    const productImg = screen.getByRole('img');
    expect(productImg).toBeInTheDocument();
    expect(productImg).toHaveAttribute('src', 'hat.jpg');
    expect(productImg).toHaveAttribute('alt', 'A blue hat');
  });

  it('renders the product title with link to product details', () => {
    render(
      <MemoryRouter>
        <CartItem {...mockItem} />
      </MemoryRouter>
    );
    const productTitle = screen.getByRole('heading', { name: /cool hat/i });
    expect(productTitle).toBeInTheDocument();
    const parentLink = productTitle.closest('a');
    expect(parentLink).toHaveAttribute('href', '/shop/product/1');
  });

  it('renders the product price', () => {
    render(
      <MemoryRouter>
        <CartItem {...mockItem} />
      </MemoryRouter>
    );
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it('shows the correct quantity (count) display', () => {
    render(
      <MemoryRouter>
        <CartItem {...mockItem} />
      </MemoryRouter>
    );
    // Quantity is shown
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders increment and decrement buttons for quantity', () => {
    render(
      <MemoryRouter>
        <CartItem {...mockItem} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  });

  it('shows per-item subtotal', () => {
    render(
      <MemoryRouter>
        <CartItem {...mockItem} />
      </MemoryRouter>
    );
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it('increments quantity and updates subtotal when increment button is clicked', async () => {
    const onIncrement = vi.fn();
    render(
      <MemoryRouter>
        <CartItem {...mockItem} onIncrement={onIncrement} />
      </MemoryRouter>
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    const incrementBtn = screen.getByRole("button", { name: "+" });
    await userEvent.click(incrementBtn);
    expect(onIncrement).toHaveBeenCalledTimes(1);
    expect(onIncrement).toHaveBeenCalledWith(mockItem.id);
    render(
      <MemoryRouter>
        <CartItem {...mockItem} quantity={3} onIncrement={onIncrement}/>
      </MemoryRouter>
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();
  });
});
