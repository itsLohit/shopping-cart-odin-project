import React from "react";
import { describe, expect, it} from "vitest";
import { render, screen, within } from "@testing-library/react";
import Header from "../../src/components/Header";
import { MemoryRouter } from "react-router";

describe ('Header', () => {
    it ('renders the logo linking to "/"', () => {
        render (
          <MemoryRouter><Header /></MemoryRouter>
        );
        const logo = screen.getByRole('link', {name:/sippy cart/i});
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('href', '/');
    });

    it ('renders the navigation links', () => {
        render (
          <MemoryRouter><Header /></MemoryRouter>
        );
        const navLinks = screen.getByRole('navigation', {name: /nav links/i});

        const home = within(navLinks).getByRole('link', {name: /home/i});
        expect(home).toBeInTheDocument();
        expect(home).toHaveAttribute('href', '/');

        const shop = within(navLinks).getByRole('link', {name: /shop/i});
        expect(shop).toBeInTheDocument();
        expect(shop).toHaveAttribute('href', '/shop');

        const cart = within(navLinks).getByRole('link', {name: /cart/i});
        expect(cart).toBeInTheDocument();
        expect(cart).toHaveAttribute('href', '/cart');
    });

    it ('displays cart item count and updates when the cart changes', () => {
        const cart = [
          { id: 1, title: "Hat", quantity: 2 },
          { id: 2, title: "Shirt", quantity: 3 },
        ];

        const { rerender } = render(
          <MemoryRouter>
            <Header cart={cart} />
          </MemoryRouter>
        );


        expect(screen.getByTestId("cart-count")).toHaveTextContent("5");
        const newCart = [
          { id: 1, title: "Hat", quantity: 2 },
          { id: 2, title: "Shirt", quantity: 3 },
          { id: 3, title: "Shoes", quantity: 1 },
        ];

        rerender (
          <MemoryRouter><Header cart={newCart}/></MemoryRouter>
        );

        expect(screen.getByTestId("cart-count")).toHaveTextContent("6");
    })
});