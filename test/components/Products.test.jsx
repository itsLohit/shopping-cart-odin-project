import React from "react";
import { describe, expect, it} from "vitest";
import { render, screen, within } from "@testing-library/react";
import Products from "../../src/components/Products";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { vi } from "vitest";

describe ('Products', () => {
    it ('renders the product image', () => {
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
            />
          </MemoryRouter>
        );
        const productImg = screen.getByRole('img');
        expect(productImg).toBeInTheDocument();
        expect(productImg).toHaveAttribute('src', 'hat.jpg');
    });
    it('renders the product image with meaningful alt text', () => {
      render(
        <MemoryRouter>
          <Products
            title="Cool Hat"
            imgSrc="hat.jpg"
            imgAlt="Blue wide-brim hat"
            price="499"
          />
        </MemoryRouter>
      );
      const productImg = screen.getByRole('img');
      expect(productImg).toHaveAttribute('alt', 'Blue wide-brim hat'); 
    });

    it ('renders the product title with link to product details', () => {
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
              id="12"
            />
          </MemoryRouter>
        );
        const productTitle = screen.getByRole('heading', {name: /cool hat/i});
        expect(productTitle).toBeInTheDocument();
        const parentLink = productTitle.closest('a');
        expect(parentLink).toHaveAttribute('href', '/shop/product/12');
    });
    it ('renders the product price', () => {
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
            />
          </MemoryRouter>
        );
        const productPrice = screen.getByTestId('product-price');
        expect(productPrice).toBeInTheDocument();
        expect(productPrice).toHaveTextContent('499');
    });
    it ('renders the number of items increment decrement buttons and its display', () => {
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
            />
          </MemoryRouter>
        );
        const incrementButton = screen.getByRole('button', {name: '+'});
        const decrementButton = screen.getByRole('button', {name: '-'});
        const countDisplay = screen.getByTestId('count-display');
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
        expect(countDisplay).toBeInTheDocument();
    });
    it ('renders the updated count display when the increment or drecrement buttons clicked', async () => {
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
            />
          </MemoryRouter>
        );
        const incrementButton = screen.getByRole('button', {name: '+'});
        const decrementButton = screen.getByRole('button', {name: '-'});
        const countDisplay = screen.getByTestId('count-display');
        expect(countDisplay).toHaveTextContent('0');
        await userEvent.click(incrementButton);
        await userEvent.click(incrementButton);
        await userEvent.click(incrementButton);
        await userEvent.click(decrementButton);
        act(() => {
            render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
            />
          </MemoryRouter>
        );
        })
        expect(countDisplay).toHaveTextContent('2');
    });
    it ('renders the add to cart button', () => {
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
            />
          </MemoryRouter>
        );
        const addToCartBtn = screen.getByRole('button', {name: /add to cart/i});
        expect(addToCartBtn).toBeInTheDocument();
    });
    it ('renders the cart nav when user clicked add to cart', async () => {
        const onAddtoCart = vi.fn();
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
              onAddtoCart={onAddtoCart}
            />
          </MemoryRouter>
        );
        const addToCartBtn = screen.getByRole('button', {name: /add to cart/i});
        const incrementButton = screen.getByRole('button', {name: '+'});
         await userEvent.click(incrementButton);
         await userEvent.click(incrementButton);
         await userEvent.click(addToCartBtn);
         expect(onAddtoCart).toHaveBeenCalledTimes(1);
         expect(onAddtoCart).toHaveBeenCalledWith({
            title: "Cool Hat",
            imgSrc: "hat.jpg",
            price: "499",
            count: 2,
         });
    });
    it ('disable the add to cart when count is zero', async () => {
        const onAddtoCart = vi.fn();
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
              onAddtoCart={onAddtoCart}
            />
          </MemoryRouter>
        );
        const addToCartBtn = screen.getByRole('button', {name: /add to cart/i});
        const incrementButton = screen.getByRole('button', {name: '+'});
         await userEvent.click(addToCartBtn);
         expect(onAddtoCart).toHaveBeenCalledTimes(0);
         await userEvent.click(incrementButton);
         await userEvent.click(incrementButton);
         await userEvent.click(addToCartBtn);
         expect(onAddtoCart).toHaveBeenCalledTimes(1);
         expect(onAddtoCart).toHaveBeenCalledWith({
            title: "Cool Hat",
            imgSrc: "hat.jpg",
            price: "499",
            count: 2,
         });
    });
    it ('reset count after add to cart is clicked', async () => {
        const onAddtoCart = vi.fn();
        render (
          <MemoryRouter>
            <Products
              title="Cool Hat"
              imgSrc="hat.jpg"
              price="499"
              onAddtoCart={onAddtoCart}
            />
          </MemoryRouter>
        );
        const addToCartBtn = screen.getByRole('button', {name: /add to cart/i});
        const incrementButton = screen.getByRole('button', {name: '+'});
        const countDisplay = screen.getByTestId('count-display');
         await userEvent.click(addToCartBtn);
         expect(onAddtoCart).toHaveBeenCalledTimes(0);
         await userEvent.click(incrementButton);
         await userEvent.click(incrementButton);
         expect(countDisplay).toHaveTextContent('2');
         await userEvent.click(addToCartBtn);
         expect(countDisplay).toHaveTextContent('0');
         expect(onAddtoCart).toHaveBeenCalledTimes(1);
         expect(onAddtoCart).toHaveBeenCalledWith({
            title: "Cool Hat",
            imgSrc: "hat.jpg",
            price: "499",
            count: 2,
         });
    });
});