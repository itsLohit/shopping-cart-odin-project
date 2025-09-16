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
    })
});