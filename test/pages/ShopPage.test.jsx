import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopPage from "../../src/pages/ShopPage";
import { MemoryRouter } from "react-router";

describe('Shop Page', () => {
    it('renders Header in the shop page', () => {
        render (
                  <MemoryRouter><ShopPage /></MemoryRouter>
                );
        const logo = screen.getByRole('link', { name: /sippy cart/i });
        expect(logo).toBeInTheDocument();
    });
});