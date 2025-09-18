import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ShopPage from "../../src/pages/ShopPage";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const mockProducts = [
  {
    id: 1,
    title: "Cool Hat",
    category: "Others",
    imgSrc: "hat.jpg",
    imgAlt: "A blue hat",
    price: "499"
  },
  {
    id: 2,
    title: "Nice Shirt",
    category: "Clothes",
    imgSrc: "shirt.jpg",
    imgAlt: "A nice shirt",
    price: "799"
  },
];

describe('Shop Page', () => {
    it('renders and display the searchBar', () => {
        render (
                  <MemoryRouter><ShopPage /></MemoryRouter>
                );
        const searchBarInput = screen.getByRole('searchbox', {name: /search products/i});
        expect(searchBarInput).toBeInTheDocument();
        const searchBarFilterButtons = screen.getByTestId('filter-buttons');
        expect(within(searchBarFilterButtons).getAllByRole('button').length).toBe(7);
    });

    it('renders and display all products in its data array', () => {
        render (
                  <MemoryRouter><ShopPage products={mockProducts}/></MemoryRouter>
                );
        expect(screen.getByText("Cool Hat")).toBeInTheDocument();
        expect(screen.getByText("Nice Shirt")).toBeInTheDocument();
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBe(2);
    });

    it('renders products filtered by category', async () => {
        render (
                  <MemoryRouter><ShopPage products={mockProducts}/></MemoryRouter>
                );
        expect(screen.getByText("Cool Hat")).toBeInTheDocument();
        expect(screen.getByText("Nice Shirt")).toBeInTheDocument();
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBe(2);
        const clothesBtn = screen.getByRole('button', {name: "Clothes"});
        await userEvent.click(clothesBtn);
        expect(screen.queryByText("Cool Hat")).not.toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).toBeInTheDocument();
        const othersBtn = screen.getByRole('button', {name: "Others"});
        await userEvent.click(othersBtn);
        expect(screen.queryByText("Cool Hat")).toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).not.toBeInTheDocument();
    });

    it('renders products filtered by search term', async () => {
        render (
                  <MemoryRouter><ShopPage products={mockProducts}/></MemoryRouter>
                );
        expect(screen.getByText("Cool Hat")).toBeInTheDocument();
        expect(screen.getByText("Nice Shirt")).toBeInTheDocument();
        const searchBarInput = screen.getByRole('searchbox', {name:/search products/i});
        await userEvent.type(searchBarInput, "Shirt");
        expect(screen.queryByText("Cool Hat")).not.toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).toBeInTheDocument();
        await userEvent.clear(searchBarInput);
        await userEvent.type(searchBarInput, "Hat");
        expect(screen.queryByText("Cool Hat")).toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).not.toBeInTheDocument();
    });
    
    it('renders products matching both category and search term', async () => {
        render (
                  <MemoryRouter><ShopPage products={mockProducts}/></MemoryRouter>
                );
        const clothesBtn = screen.getByRole('button', {name: "Clothes"});
        await userEvent.click(clothesBtn);
        expect(screen.queryByText("Cool Hat")).not.toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).toBeInTheDocument();
        const searchBarInput = screen.getByRole('searchbox', {name:/search products/i});
        await userEvent.clear(searchBarInput);
        await userEvent.type(searchBarInput, "Nice");
        expect(screen.queryByText("Cool Hat")).not.toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).toBeInTheDocument();
        await userEvent.clear(searchBarInput);
        await userEvent.type(searchBarInput, "Hat");
        expect(screen.queryByText("Cool Hat")).not.toBeInTheDocument();
        expect(screen.queryByText("Nice Shirt")).not.toBeInTheDocument();
    });

    it('shows "No products found" when no products match filter/search', async () => {
      render(
        <MemoryRouter>
          <ShopPage products={mockProducts}/>
        </MemoryRouter>
      );
      const clothesBtn = screen.getByRole('button', {name: "Clothes"});
      await userEvent.click(clothesBtn);
      const searchBarInput = screen.getByRole('searchbox', {name:/search products/i});
      await userEvent.clear(searchBarInput);
      await userEvent.type(searchBarInput, "Pants");
      expect(screen.getByRole('status', /no products found/i)).toBeInTheDocument();
    });

    it('highlights the active category button', async () => {
      render(
        <MemoryRouter>
          <ShopPage products={mockProducts}/>
        </MemoryRouter>
      );
      const allBtn = screen.getByRole('button', {name: "All"});
      expect(allBtn).toHaveClass('active-category');
      const clothesBtn = screen.getByRole('button', {name: "Clothes"});
      await userEvent.click(clothesBtn);
      expect(clothesBtn).toHaveClass('active-category');
      expect(allBtn).not.toHaveClass('active-category');
    });
});