import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
import { Link } from "react-router";
import heroImage from '../assets/images/hero-image.png';
import logo1 from '../assets/images/forbes-logo.png';
import logo2 from '../assets/images/the-hindu-logo.png';


function useCountdown(endTime) {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.max(0, Math.floor((endTime - Date.now()) / 1000))
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [endTime, secondsLeft]);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return secondsLeft > 0 ? `${hours}:${minutes}:${seconds}` : "Sale ended!";
}

export default function HomePage({ products = [] }) {
  const cardCount = Math.min(4, products.length);
  const totalGroups = Math.ceil(products.length / cardCount); 
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [saleEndTime] = useState(Date.now() + 24 * 60 * 60 * 1000);
  const countdown = useCountdown(saleEndTime);


  function handlePrevClick() {
    setCarouselIndex((index) =>
      totalGroups <= 1 ? 0 : (index - 1 + totalGroups) % totalGroups
    );
  }

  function handleNextClick() {
    setCarouselIndex((index) =>
      totalGroups <= 1 ? 0 : (index + 1) % totalGroups
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCarouselIndex((index) =>
        totalGroups <= 1 ? 0 : (index + 1) % totalGroups
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, [totalGroups]);

  return (
    <main className={styles.homeHero}>
      <div className={styles.topContainer}>
        <div className={styles.heroTopLeft}>
          <div className= {styles.heroTopContent}>
            <h1 className={styles.mainHeading}>
              Transform Your Everyday with Sippy Stores - Shop Premium, Handpicked Collection.
            </h1>
            <div className={styles.homeDescription} data-testid="home-description">
              Discover the best deals on Clothes, Electronics, Accessories with guaranteed quality and fast delivery.
            </div>
            <div className={styles.homeBadge} data-testid="home-badge">
              Loved by 5000+ customers.
            </div>
          </div>
          
          <Link to="/shop">
            <button className={styles.ctaButton}>Shop Now</button>
          </Link>
        </div>
        <img src= {heroImage} alt="Combined images of different products" />
      </div>
      
      <div className={styles.subText}>Find your next favorite thing.</div>

      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${carouselIndex * 100}%)`,
            transition: "transform 0.5s ease", 
          }}
        >
          {products.map((product) => (
            <div
              data-testid="product-preview-card"
              key={product.id}
              
              style={{ flex: `0 0 calc(100% / ${cardCount})` }}
            >
              <Link key={product.id} to={`/product/${product.id}`} className={styles.previewCard}>
                <img src={product.images[0]} alt={product.title} className={styles.previewImg} />
                <div className={styles.previewTitle}>{product.title}</div>
                <div className={styles.previewPrice}>${product.price}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselButtonsContainer}>
        <button onClick={handlePrevClick}>prev</button>
        <button onClick={handleNextClick}>next</button>
      </div>

      <div className={styles.promoBanner}>
        <span className={styles.promoTitle}>
          Flash Sale – Limited Time Offers! <span className={styles.promoHighlight}>Save up to 50%.</span>
        </span>
        <div className={styles.countdownRow}>
          <span className={styles.countdownTimer} data-testid="countdown-timer">{countdown}</span>
          <Link to = '/shop'><button className={styles.promoCta}>Get My Deal</button></Link>
        </div>
      </div>
      <div className={styles.shippingBanner}>
        Free shipping on orders above <span className={styles.promoHighlight}>₹999!</span>
      </div>

      <section className={styles.socialProofSection}>
        <h2 className={styles.socialProofHeading}>What Customers Are Saying</h2>
        <div className={styles.reviewGrid}>
          <blockquote className={styles.reviewCard}>
            “Best experience with Sippy Stores! Super fast delivery.”
            <br />
            <span className={styles.reviewerName}>– Priya, Bangalore</span>
          </blockquote>
          <blockquote className={styles.reviewCard}>
            “Good quality. Will buy again. 5/5.”
            <br />
            <span className={styles.reviewerName}>– Rahul, Delhi</span>
          </blockquote>
          <blockquote className={styles.reviewCard}>
            “Products exactly as described and support was quick!”
            <br />
            <span className={styles.reviewerName}>– Ashwini, Hyderabad</span>
          </blockquote>
        </div>
        <div className={styles.urgencyNotification}>
          <span className={styles.urgencyHighlight}>27 customers</span> bought in last 24 hours!
        </div>
        <div className={styles.mediaMentions}>
          <span className={styles.asFeatured}>As featured in</span>
          <img className={styles.mediaLogo} src={logo1} alt="Forbes logo" />
          <img className={styles.mediaLogo} src={logo2} alt="The Hindu logo" />
        </div>
      </section>


    </main>
  );
}
