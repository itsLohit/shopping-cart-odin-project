import React, { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const mockProducts = [
  { id: 1, title: "Cool Hat", imgSrc: "hat.jpg", imgAlt: "Cool Hat", price: "499" },
  { id: 2, title: "Nice Shirt", imgSrc: "shirt.jpg", imgAlt: "Nice Shirt", price: "799" },
  { id: 3, title: "Gray Hoodie", imgSrc: "hoodie.jpg", imgAlt: "Gray Hoodie", price: "566" },
  { id: 4, title: "Red Shoes", imgSrc: "shoes.jpg", imgAlt: "Red Shoes", price: "299" },
  { id: 5, title: "Blue Socks", imgSrc: "socks.jpg", imgAlt: "Blue Socks", price: "199" },
];

describe('Home Page', () => {
  it('renders headline, subheadline, and CTA button', () => {
    render(
    <MemoryRouter>
        <HomePage products={mockProducts} />
    </MemoryRouter>);
    expect(screen.getByRole('heading', { name: /shop smart.*live stylish./i })).toBeInTheDocument();
        const homeDescription = screen.getByTestId("home-description");
    expect(
      homeDescription.textContent
    ).toContain("Welcome to Sippy Cart — where everyday essentials meet modern style.");
    

    expect(screen.getByRole('button', { name: /shop now/i })).toBeInTheDocument();
  });

  it('shows three product preview cards', () => {
    render(
    <MemoryRouter>
        <HomePage products={mockProducts} />
    </MemoryRouter>);
    const previews = screen.getAllByTestId('product-preview-card');
    expect(previews.length).toBe(3);
  });

  it('shows first three products and auto-advances after interval', () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <HomePage products={mockProducts} />
      </MemoryRouter>
    );

    let cards = screen.getAllByTestId("product-preview-card");
    expect(cards[0]).toHaveTextContent("Cool Hat");
    expect(cards[1]).toHaveTextContent("Nice Shirt");
    expect(cards[2]).toHaveTextContent("Gray Hoodie");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    cards = screen.getAllByTestId("product-preview-card");
    expect(cards[0]).toHaveTextContent("Red Shoes");
    expect(cards[1]).toHaveTextContent("Blue Socks");
    expect(cards[2]).toHaveTextContent("Cool Hat");

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    cards = screen.getAllByTestId("product-preview-card");
    expect(cards[0]).toHaveTextContent("Nice Shirt");
    expect(cards[1]).toHaveTextContent("Gray Hoodie");
    expect(cards[2]).toHaveTextContent("Red Shoes");

    vi.useRealTimers();
  });

  it('does not crash if fewer than 3 products', () => {
    render(<MemoryRouter><HomePage products={mockProducts.slice(0, 2)} /></MemoryRouter>);
    expect(screen.getAllByTestId("product-preview-card").length).toBe(2);
  });

  it("moves to previous set when left arrow clicked (wraps to end)", async() => {
    render(
      <MemoryRouter>
        <HomePage products={mockProducts} />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByRole('button', {name: /prev/i }));
    let cards = screen.getAllByTestId("product-preview-card");
    expect(cards[0]).toHaveTextContent("Gray Hoodie"); 
    await userEvent.click(screen.getByRole('button', {name: /prev/i }));
    cards = screen.getAllByTestId("product-preview-card");
    expect(cards[0]).toHaveTextContent("Blue Socks");
  });

  it("moves to next set when right arrow clicked (wraps to start)", async() => {
    render(
      <MemoryRouter>
        <HomePage products={mockProducts} />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByRole('button', {name: /next/i }));
    let cards = screen.getAllByTestId("product-preview-card");
    expect(cards[0]).toHaveTextContent("Red Shoes"); 
  });
});
