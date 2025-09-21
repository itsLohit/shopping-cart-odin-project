import styles from '../styles/Products.module.css';
import { useState } from "react"
import { Link } from "react-router"

export default function Products ({title, imgSrc, imgAlt, price, onAddToCart, id}) {

    const[count, setCount] = useState(1);

    function handleClickIncrementBtn() {
        setCount(count+1);
    }

    function handleClickDecrementBtn() {
        if(count>0) {
            setCount(count-1);
        }
        
    }

    function handleAddToCart () {
        if (count === 0) {
            return false;
        }
        if(typeof onAddToCart === 'function') {
            onAddToCart({ id, title, imgSrc, imgAlt, price, count });
            setCount(1);
        }
    }

    return (
        <article className={styles.productCard}>
            <div className={styles.productImage}>
            <Link to = {`/product/${id}`}><img src={imgSrc} alt={imgAlt} /></Link>
          </div>
          <div className={styles.cardInfo}>
              <div className={styles.heading}>
                <Link to = {`/product/${id}`}><h2>{title}</h2></Link>
              </div>
              <div className={styles.productPrice} data-testid = 'product-price'>${price}</div>
              <div className={styles.addCartContainer}>
                  <div className={styles.countContainer}>
                    <button onClick={handleClickDecrementBtn}>-</button>
                    <div className={styles.countDisplay} data-testid = 'count-display'>{count}</div>
                    <button onClick={handleClickIncrementBtn}>+</button>
                  </div>
                  <div>
                    <button className={styles.addToCartButton} onClick={handleAddToCart}>Add</button>
                  </div>
              </div>
          </div>
        </article>
    )
}