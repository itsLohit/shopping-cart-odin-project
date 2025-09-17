import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../../src/pages/CartPage";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";

const mockCart = [
  { id: 1, title: "Cool Hat", imgSrc: "hat.jpg", imgAlt: "A blue hat", price: 500, quantity: 2 },
  { id: 2, title: "Nice Shirt", imgSrc: "shirt.jpg", imgAlt: "A nice shirt", price: 800, quantity: 1 },
];

function TestCartPageWrapper({ initialCart }) {
  const [cart, setCart] = React.useState([...initialCart]);
  function handleIncrement(id) {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  function handleDecrement(id) {
    setCart(cart =>
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
  return (
    <CartPage
      cart={cart}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
}


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
    });
    const allPrices = screen.getAllByTestId('item-price');
    expect(allPrices.map(el => el.textContent)).toEqual(
      expect.arrayContaining([mockCart[0].price.toString(), mockCart[1].price.toString()])
    );
    const allCounts = screen.getAllByTestId('count-display');
    expect(allCounts.map(el => el.textContent)).toEqual(
      expect.arrayContaining([mockCart[0].quantity.toString(), mockCart[1].quantity.toString()])
    );
  });

  it('renders per-item subtotal in the cart', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    const allSubtotals = screen.getAllByTestId('item-subtotal');
    expect(allSubtotals.map(el => el.textContent)).toEqual(
      expect.arrayContaining([
        (mockCart[0].price * mockCart[0].quantity).toString(),
        (mockCart[1].price * mockCart[1].quantity).toString()
      ])
    );
  });

  it('shows increment/decrement controls but no "Add to cart" button', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('button', { name: "+" })).toHaveLength(mockCart.length);
    expect(screen.getAllByRole('button', { name: "-" })).toHaveLength(mockCart.length);
    expect(screen.queryByText(/add to cart/i)).not.toBeInTheDocument();
  });

  it('renders order summary and checkout button', () => {
    render(
      <MemoryRouter>
        <CartPage cart={mockCart} />
      </MemoryRouter>
    );
    // Check summary by testids for reliability
    expect(screen.getByTestId('checkout-subtotal')).toBeInTheDocument();
    expect(screen.getByTestId('checkout-shipping')).toBeInTheDocument();
    expect(screen.getByTestId('checkout-tax')).toBeInTheDocument();
    expect(screen.getByTestId('order-total')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

  it('updates item quantity, subtotal, and order summary when increment button is clicked', async () => {
    render(
      <MemoryRouter>
        <TestCartPageWrapper initialCart={mockCart} />
      </MemoryRouter>
    );
    const incrementBtns = screen.getAllByRole('button', { name: '+' });
    await userEvent.click(incrementBtns[0]);
    const itemCounts = screen.getAllByTestId('count-display');
    expect(itemCounts[0]).toHaveTextContent('3');
    const itemSubtotals = screen.getAllByTestId('item-subtotal');
    expect(itemSubtotals[0]).toHaveTextContent('1500');
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent('Subtotal: 2300'); 
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: 2764'); // 
  });
});
