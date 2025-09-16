import { Link } from "react-router"

export default function Products () {
    return (
        <article>
            <div className="product-image">
            <img src="null" alt="product-image" />
          </div>
          <div className="heading">
            <Link to = '/shop/product'><h2>Product Title</h2></Link>
          </div>
          <div className="product-price" data-testid = 'product-price'>Price</div>
          <div className="count-container">
            <button>-</button>
            <div className="count-display" data-testid = 'count-display'>0</div>
            <button>+</button>
          </div>
          <div>
            <button>Add to cart</button>
          </div>
        </article>
    )
}