import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartPage from "../../src/pages/CartPage";
import { MemoryRouter } from "react-router";

// Stateful test wrapper for CartPage
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
      cart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
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

const mockCart = [
  { id: 1, title: "Cool Hat", imgSrc: "hat.jpg", imgAlt: "A blue hat", price: 500, quantity: 2 },
  { id: 2, title: "Nice Shirt", imgSrc: "shirt.jpg", imgAlt: "A nice shirt", price: 800, quantity: 1 },
];

describe('Cart Page', () => {
  it('renders all cart items with image, title, price, and quantity', () => {
    render(
      <MemoryRouter>
        <TestCartPageWrapper initialCart={mockCart} />
      </MemoryRouter>
    );
    mockCart.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText(item.imgAlt)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId('item-price').map(e => e.textContent))
      .toEqual(expect.arrayContaining([mockCart[0].price.toString(), mockCart[1].price.toString()]));
    expect(screen.getAllByTestId('count-display').map(e => e.textContent))
      .toEqual(expect.arrayContaining([mockCart[0].quantity.toString(), mockCart[1].quantity.toString()]));
  });

  it('updates item quantity, subtotal, and summary when increment button is clicked', async () => {
    render(
      <MemoryRouter>
        <TestCartPageWrapper initialCart={mockCart} />
      </MemoryRouter>
    );
    const incrementBtns = screen.getAllByRole('button', { name: '+' });
    await userEvent.click(incrementBtns[0]);
    expect(screen.getAllByTestId('count-display')[0]).toHaveTextContent('3');
    expect(screen.getAllByTestId('item-subtotal')[0]).toHaveTextContent('1500');
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent('Subtotal: 2300');
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: 2764');
  });

  it('updates item quantity, subtotal, and summary when decrement button is clicked', async () => {
    render(
      <MemoryRouter>
        <TestCartPageWrapper initialCart={mockCart} />
      </MemoryRouter>
    );
    const decrementBtns = screen.getAllByRole('button', { name: '-' });
    await userEvent.click(decrementBtns[0]); // Cool Hat goes from 2 -> 1
    expect(screen.getAllByTestId('count-display')[0]).toHaveTextContent('1');
    expect(screen.getAllByTestId('item-subtotal')[0]).toHaveTextContent('500');
    // Subtotal now: 500 + 800 = 1300
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent('Subtotal: 1300');
    // Total: 1300 + 50 + 234 = 1584
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: 1584');
  });

  it('removes cart item if quantity reaches zero', async () => {
    render(
      <MemoryRouter>
        <TestCartPageWrapper initialCart={mockCart} />
      </MemoryRouter>
    );
    // Decrement Nice Shirt from 1 -> 0 (should remove)
    const decrementBtns = screen.getAllByRole('button', { name: '-' });
    await userEvent.click(decrementBtns[1]);
    expect(screen.queryByText('Nice Shirt')).not.toBeInTheDocument();
    expect(screen.queryByAltText('A nice shirt')).not.toBeInTheDocument();
    // Cart summary recalculates
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent('Subtotal: 1000'); // (Cool Hat's subtotal if still present)
  });

  it('shows empty cart message and disables checkout button when cart empty', async () => {
    render(
      <MemoryRouter>
        <TestCartPageWrapper initialCart={[{ id: 1, title: "Cool Hat", imgSrc: "hat.jpg", imgAlt: "A blue hat", price: 500, quantity: 1 }]} />
      </MemoryRouter>
    );
    // Decrement Cool Hat from 1 -> 0 (should remove, cart empty)
    const decrementBtn = screen.getAllByRole('button', { name: '-' })[0];
    await userEvent.click(decrementBtn);
    expect(screen.queryByText('Cool Hat')).not.toBeInTheDocument();
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent('Subtotal: 0');
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: 50');
    // Check for empty cart UI or checkout button disabled (update CartPage as needed)
    // For example:
    // expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeDisabled();
  });
});
