import styles from '../styles/ShopPage.module.css';
import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import { useState } from "react";


export default function ShopPage ({products = [], onAddToCart}) {

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchTermChange (value) {
    setSearchTerm(value);
  }

  function handleFilterChange (category) {
    setActiveCategory(category);
  }
  
  const displayedProducts = products.filter(product => {
    const matchesCategory =
      activeCategory === 'All' ||
      (product.category && product.category.name === activeCategory);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  

    return (
        <div className={styles.shopContainer}>
          <h1 className={styles.shopHeading}>All Your Essentials, In One Place</h1>
          <div className={styles.shopSubtitle}>
            Handpicked products with honest pricing, trusted by thousands of happy customers.
          </div>
          <div className={styles.filterSection}>
            <SearchBar
              onSearchChange={handleSearchTermChange}
              onFilterChange={handleFilterChange}
              activeCategory = {activeCategory}
            />
          </div>

          <div className={styles.productsGrid}>
            {displayedProducts.length === 0 ? (
              <div role="status" className={styles.noProductsMessage}>No products found</div>
            ) : (
              displayedProducts.map(product => (
                <Products
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imgSrc={product.images[0]}
                  imgAlt={product.title}
                  price={product.price}
                  onAddToCart = {onAddToCart}
                />
              ))
            )}
          </div>

        </div>
    )
}