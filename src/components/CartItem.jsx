import styles from '../styles/CartItem.module.css';
import { Link } from "react-router";
import PropTypes from "prop-types";

export default function CartItem ({id, title, imgSrc, imgAlt, price, quantity, onIncrement, onDecrement, onDelete}) {

      
    function handleClickIncrementBtn() {
      if (onIncrement) {
        onIncrement(id);
      }
    }
  
    function handleClickDecrementBtn() {
      if (onDecrement) {
        onDecrement(id);
      }
    }


    const itemSubTotal = price * quantity;

    return (
        <div className={styles.cartItem}>
          <div className={styles.itemImg}>
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className={styles.itemInfoContainer}>
            <div className={styles.itemHeading}><Link to = {`/product/${id}`}><h2>{title}</h2></Link></div>
            <div className={styles.itemPriceContainer}>
                <div className={styles.itemPrice} data-testid = 'item-price'>${price}</div>
                <div className={styles.itemSubtotal} data-testid="item-subtotal">Subtotal: ${itemSubTotal}</div>
            </div>
          </div>
          <div className={styles.quantityContainer}>
            <button onClick={handleClickDecrementBtn}>-</button>
            <div className={styles.countDisplay} data-testid = 'count-display'>{quantity}</div>
            <button onClick={handleClickIncrementBtn}>+</button>
          </div>
          <button className={styles.deleteButton} data-testid='delete-item' onClick={() => onDelete && onDelete(id)}>Delete</button>
        </div>
    )
}

CartItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onDelete: PropTypes.func,
};
