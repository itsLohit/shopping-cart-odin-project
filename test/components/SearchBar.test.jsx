import React from "react";
import { describe, expect, it} from "vitest";
import { render, screen, within } from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
describe ('SearchBar', () => {

  const filterCategories = [
    'All',
    'Clothes',
    'Mobiles',
    'Laptops',
    'Electronics',
    'Shoes',
    'Others'
  ];

    it ('renders the search bar', () => {
      render (
        <MemoryRouter><SearchBar /></MemoryRouter>
      );
      
      const input = screen.getByRole('searchbox', {name:/search products/i});
      expect(input).toHaveAttribute('placeholder', 'Search for products...');
      expect(input).toHaveValue('');
    });

    it ('renders the search bar to callback when user types something', async () => {
      const onSearchChange = vi.fn();

      render (
        <MemoryRouter><SearchBar onSearchChange = {onSearchChange}/></MemoryRouter>
      );
      
      const input = screen.getByRole('searchbox', {name:/search products/i});
      await userEvent.type(input, "Laptop");
      expect(onSearchChange).toHaveBeenCalledTimes(6);
      expect(onSearchChange).toHaveBeenCalledWith('Laptop');
    });


    it ('renders all the filter categories button', () => {
      render (
        <MemoryRouter><SearchBar filterCategories = {filterCategories}/></MemoryRouter>
      );

      const filterButtons = screen.getByTestId('filter-buttons');
      expect(within(filterButtons).getAllByRole('button').length).toBe(7);
      filterCategories.forEach((category) => {
        const button = screen.getByRole('button', {name: category});
        expect(button).toBeInTheDocument();
      });
    });

    it ('renders the search bar to callback when user select a category button', async () => {
      const onFilterChange = vi.fn();

      render (
        <MemoryRouter><SearchBar filterCategories={filterCategories} onFilterChange = {onFilterChange}/></MemoryRouter>
      );
      
      const button = screen.getByRole('button', {name: 'Laptops'});
      await userEvent.click(button);
      expect(onFilterChange).toHaveBeenCalledTimes(1);
      expect(onFilterChange).toHaveBeenCalledWith('Laptops');
    });
});