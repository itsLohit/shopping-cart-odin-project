import { Link } from "react-router";

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
        <div className="cart-item">
          <div className="item-img">
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className="item-info-container">
            <div className="item-heading"><Link to = {`/product/${id}`}><h2>{title}</h2></Link></div>
            <div className="item-price-container">
                <div className="item-price" data-testid = 'item-price'>{price}</div>
                <div className="item-subtotal" data-testid="item-subtotal">{itemSubTotal}</div>
            </div>
          </div>
          <div className="quantity-container">
            <button onClick={handleClickDecrementBtn}>-</button>
            <div className="count-display" data-testid = 'count-display'>{quantity}</div>
            <button onClick={handleClickIncrementBtn}>+</button>
          </div>
          <button className="delete-button" data-testid='delete-item' onClick={() => onDelete && onDelete(id)}>Delete</button>
        </div>
    )
}