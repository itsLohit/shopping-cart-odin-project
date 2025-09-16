import React from "react";
import { describe, expect, it} from "vitest";
import { render, screen, within } from "@testing-library/react";
import Products from "../../src/components/Products";
import { MemoryRouter } from "react-router";

describe ('Products', () => {
    it ('renders the product image', () => {
        render (
          <MemoryRouter><Products /></MemoryRouter>
        );
        const productImg = screen.getByRole('img');
        expect(productImg).toBeInTheDocument();
        expect(productImg).toHaveAttribute('alt', 'product-image');
    });
    it ('renders the product title with link to product details', () => {
        render (
          <MemoryRouter><Products /></MemoryRouter>
        );
        const productTitle = screen.getByRole('heading');
        expect(productTitle).toBeInTheDocument();
        const parentLink = productTitle.closest('a');
        expect(parentLink).toHaveAttribute('href', '/shop/product');
    });
    it ('renders the product price', () => {
        render (
          <MemoryRouter><Products /></MemoryRouter>
        );
        const productPrice = screen.getByTestId('product-price');
        expect(productPrice).toBeInTheDocument();
    });
    it ('renders the number of items increment decrement buttons and its display', () => {
        render (
          <MemoryRouter><Products /></MemoryRouter>
        );
        const incrementButton = screen.getByRole('button', {name: '+'});
        const decrementButton = screen.getByRole('button', {name: '-'});
        const countDisplay = screen.getByTestId('count-display');
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
        expect(countDisplay).toBeInTheDocument();
    });
    it ('renders the add to cart button', () => {
        render (
          <MemoryRouter><Products /></MemoryRouter>
        );
        const addToCartBtn = screen.getByRole('button', {name: /add to cart/i});
        expect(addToCartBtn).toBeInTheDocument();
    });
});