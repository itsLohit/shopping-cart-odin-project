export default function SearchBar() {
    return (
        <>
          <div className="filter-section">
            <div className="search-bar">
              <label htmlFor="search">Search products</label>
              <input type="search" id="search" placeholder="Search for products..." />
            </div>
            <div className="filter-buttons" data-testid = 'filter-buttons'>
              <button>All</button>
              <button>Clothes</button>
              <button>Mobiles</button>
              <button>Laptops</button>
              <button>Electronics</button>
              <button>Shoes</button>
              <button>Others</button>
            </div>
          </div>
        </>
    )
}