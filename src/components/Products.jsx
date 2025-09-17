import { useState } from "react"
import { Link } from "react-router"

export default function Products ({title, imgSrc, imgAlt, price, onAddToCart, id}) {

    const[count, setCount] = useState(0);

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
            setCount(0);
        }
    }

    return (
        <article>
            <div className="product-image">
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className="heading">
            <Link to = {`/product/${id}`}><h2>{title}</h2></Link>
          </div>
          <div className="product-price" data-testid = 'product-price'>{price}</div>
          <div className="count-container">
            <button onClick={handleClickDecrementBtn}>-</button>
            <div className="count-display" data-testid = 'count-display'>{count}</div>
            <button onClick={handleClickIncrementBtn}>+</button>
          </div>
          <div>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </article>
    )
}