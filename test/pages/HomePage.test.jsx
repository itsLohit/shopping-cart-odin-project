import { render, screen } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
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

  it('shows all product preview cards', () => {
    render(
    <MemoryRouter>
        <HomePage products={mockProducts} />
    </MemoryRouter>);
    const previews = screen.getAllByTestId('product-preview-card');
    expect(previews.length).toBe(mockProducts.length);
  });

  it('does not crash if fewer than 3 products', () => {
    render(<MemoryRouter><HomePage products={mockProducts.slice(0, 2)} /></MemoryRouter>);
    expect(screen.getAllByTestId("product-preview-card").length).toBe(2);
  });
});
