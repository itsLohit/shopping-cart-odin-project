import styles from '../styles/ProductDetailsPage.module.css';
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function ProductDetailsPage({ product, onAddToCart, products }) {

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setCount(1); 
  }, [product]);

  let id = product.id;
  let title  = product.title;
  let imgAlt = product.title;
  let imgSrc = product.images[0];
  let price = product.price;

  function handleAddToCart () {
      if (count === 0) {
          return false;
      }
      if(typeof onAddToCart === 'function') {
          onAddToCart({id, title, imgSrc, imgAlt, price, count});
          setCount(1);
      }
  }

  const recommendations = products
  .filter(p =>
    p.category &&
    product.category &&
    p.category.name === product.category.name &&
    p.id !== product.id 
  ).slice(0, 4); 


  if (!product) return <div className={styles.notFound}>Product not found.</div>;
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.backToShop}><Link to='/shop'>Back to Shop</Link></div>
      <div className={styles.productDetailsContainer}>
        <div className={styles.gallerySection}>
          <img className={styles.mainImage} src={selectedImage} alt={product.title} />
          <div className={styles.thumbnailsRow}>
            {product.images.map((img, idx) => (
              <img
                key={img}
                className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumb : ''}`}
                src={img}
                alt={`${product.title} thumbnail ${idx+1}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div className={styles.detailsSection}>
          <h1 className={styles.detailsTitle}>{product.title}</h1>
          <div className={styles.detailsPrice}>${product.price}</div>
          <p className={styles.detailsDescription}>{product.description}</p>
          <div className={styles.cartControlsRow}>
            <button onClick={() => setCount(c => Math.max(1, c - 1))}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(c => c + 1)}>+</button>
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>
      <div className={styles.recommendSection}>
        <h2>You might also like</h2>
        <div className={styles.recommendCardsGrid}>
          {recommendations.length === 0 ? (
            <div className={styles.noRecommendations}>No related products found!</div>
          ) : (
            recommendations.map(item => (
              <Link
                className={styles.recommendCard}
                key={item.id}
                to={`/product/${item.id}`}
              >
                <img src={item.images[0]} alt={item.title} />
                <div className={styles.recommendCardTitle}>{item.title}</div>
                <div className={styles.recommendCardPrice}>${item.price}</div>
              </Link>
            ))
          )}
        </div>

      </div>
      
    </div>
  );
}
