export default function SearchBar({onSearchChange, onFilterChange, activeCategory}) {

    return (
        <>
          <div className="filter-section">
            <div className="search-bar">
              <label htmlFor="search">Search products</label>
              <input type="search" id="search" placeholder="Search for products..." onChange={e => onSearchChange(e.target.value)}/>
            </div>
            <div className="filter-buttons" data-testid = 'filter-buttons'>
              <button className={'All' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('All')}>All</button>
              <button className={'Clothes' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('Clothes')}>Clothes</button>
              <button className={'Mobiles' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('Mobiles')}>Mobiles</button>
              <button className={'Laptops' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('Laptops')}>Laptops</button>
              <button className={'Electronics' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('Electronics')}>Electronics</button>
              <button className={'Shoes' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('Shoes')}>Shoes</button>
              <button className={'Others' === activeCategory ? "active-category" : ""} onClick={() => onFilterChange('Others')}>Others</button>
            </div>
          </div>
        </>
    )
}