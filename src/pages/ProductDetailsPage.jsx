export default function ProductDetailsPage({ product }) {
  if (!product) return null;

  return (
    <div className="product-details">
      <img src={product.imgSrc} alt={product.imgAlt} />
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
