import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import { Link } from "react-router";

export default function HomePage({ products = [] }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const cardCount = Math.min(3, products.length);

  function handlePrevClick() {
    setCarouselIndex((index) =>
      products.length <= 3 ? 0 : (index - 1 + products.length) % products.length
    );
  }

  function handleNextClick() {
    setCarouselIndex((index) =>
      products.length <= 3 ? 0 : (index + 1) % products.length
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCarouselIndex((index) =>
        products.length <= 3 ? 0 : (index + 1) % products.length
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, [products.length]);

  return (
    <main className={styles.homeHero}>
      <h1 className={styles.mainHeading}>
        Shop Smart.
        <br />
        Live Stylish.
      </h1>
      <div className={styles.homeDescription} data-testid="home-description">
        Welcome to <strong>Sippy Cart</strong> — where everyday essentials meet modern style.
      </div>
      <Link to="/shop">
        <button className={styles.ctaButton}>Shop Now</button>
      </Link>
      <div className={styles.subText}>Find your next favorite thing.</div>

      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${carouselIndex * (100 / cardCount)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              data-testid="product-preview-card"
              key={product.id}
              className={styles.previewCard}
              style={{ flex: `0 0 calc(100% / ${cardCount})` }}
            >
              <img src={product.imgSrc} alt={product.imgAlt} className={styles.previewImg} />
              <div className={styles.previewTitle}>{product.title}</div>
              <div className={styles.previewPrice}>${product.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselButtonsContainer}>
        <button onClick={handlePrevClick}>prev</button>
        <button onClick={handleNextClick}>next</button>
      </div>
    </main>
  );
}
