import Header from "../components/Header";
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
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  

    return (
        <>
          <Header />
          <SearchBar 
            onSearchChange={handleSearchTermChange}
            onFilterChange={handleFilterChange}
            activeCategory = {activeCategory}
          />

          {displayedProducts.length === 0 ? (
            <div role="status">No products found</div>
          ) : (
            displayedProducts.map(product => (
              <Products
                key={product.id}
                id={product.id}
                title={product.title}
                imgSrc={product.imgSrc}
                imgAlt={product.imgAlt}
                price={product.price}
                onAddToCart = {onAddToCart}
              />
            ))
          )}

        </>
    )
}