import styles from '../styles/ErrorPage.module.css';
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorHeading}>
        Oh no, this route does not exist!
      </h1>
      <Link className={styles.errorLink} to="/">
        Go to Home
      </Link>
    </div>
  );
}
