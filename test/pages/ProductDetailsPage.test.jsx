import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDetailsPage from "../../src/pages/ProductDetailsPage";

const sampleProduct = {
  id: '2d0269ab-75b6-48f8-88aa-0f9f6fa4ee87',
  title: 'Majestic Mountain Graphic T-Shirt',
  imgSrc: 'https://i.imgur.com/QkIa5tT.jpeg',
  imgAlt: 'Majestic Mountain Graphic T-Shirt',
  price: 44,
  description: 'Elevate your wardrobe with this stylish black t-shirt...',
};

describe('Product Details Page', () => {
  it('renders the image, title, price, and description', () => {
    render(<ProductDetailsPage product={sampleProduct} />);
    expect(screen.getByAltText(sampleProduct.imgAlt)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: sampleProduct.title })).toBeInTheDocument();
    expect(screen.getByText(`$${sampleProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(sampleProduct.description)).toBeInTheDocument();
  });
});
