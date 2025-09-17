export default function ProductDetailsPage({ product }) {
  if (!product) return <div>Product not found.</div>;
  return (
    <div>
      <img src={product.imgSrc} alt={product.imgAlt} />
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
