import styles from '../styles/HomePage.module.css';
import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className={styles.homeHero}>
      <h1 className={styles.mainHeading}>
        Shop Smart.
        <br />
        Live Stylish.
      </h1>
      <div className={styles.homeDescription}>
        Welcome to <strong>Sippy Cart</strong> — where everyday essentials meet modern style. Our handpicked selection means you can upgrade your routine and your wardrobe effortlessly.
      </div>
      <Link to="/shop">
        <button className={styles.ctaButton}>
          START SHOPPING →
        </button>
      </Link>
      <div className={styles.subText}>
        Find your next favorite thing.
      </div>
    </main>
)}