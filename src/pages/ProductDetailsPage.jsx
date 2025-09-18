import styles from '../styles/ProductDetailsPage.module.css';

export default function ProductDetailsPage({ product }) {
  if (!product) return <div className={styles.notFound}>Product not found.</div>;
  return (
    <div className={styles.detailsContainer}>
      <img className={styles.detailsImage} src={product.imgSrc} alt={product.imgAlt} />
      <h1 className={styles.detailsHeading}>{product.title}</h1>
      <p className={styles.detailsPrice}>${product.price}</p>
      <p className={styles.detailsDescription}>{product.description}</p>
    </div>
  );
}
