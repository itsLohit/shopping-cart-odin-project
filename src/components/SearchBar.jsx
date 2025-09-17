export default function SearchBar({onSearchChange, onFilterChange}) {

    return (
        <>
          <div className="filter-section">
            <div className="search-bar">
              <label htmlFor="search">Search products</label>
              <input type="search" id="search" placeholder="Search for products..." onChange={e => onSearchChange(e.target.value)}/>
            </div>
            <div className="filter-buttons" data-testid = 'filter-buttons'>
              <button onClick={() => onFilterChange('All')}>All</button>
              <button onClick={() => onFilterChange('Clothes')}>Clothes</button>
              <button onClick={() => onFilterChange('Mobiles')}>Mobiles</button>
              <button onClick={() => onFilterChange('Laptops')}>Laptops</button>
              <button onClick={() => onFilterChange('Electronics')}>Electronics</button>
              <button onClick={() => onFilterChange('Shoes')}>Shoes</button>
              <button onClick={() => onFilterChange('Others')}>Others</button>
            </div>
          </div>
        </>
    )
}