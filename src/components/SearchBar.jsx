import styles from '../styles/SearchBar.module.css';

export default function SearchBar({onSearchChange, onFilterChange, activeCategory}) {

    return (
        <>
          <div className={styles.filterSection}>
            <div className={styles.searchBar}>
              <label htmlFor="search">Search products</label>
              <input type="search" id="search" placeholder="Search for products..." onChange={e => onSearchChange(e.target.value)}/>
            </div>
            <div className={styles.filterButtons} data-testid = 'filter-buttons'>
              <button className={`${styles.filterButton} ${activeCategory==='All' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('All')}>All</button>
              <button className={`${styles.filterButton} ${activeCategory==='Clothes' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Clothes')}>Clothes</button>
              <button className={`${styles.filterButton} ${activeCategory==='Mobiles' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Mobiles')}>Mobiles</button>
              <button className={`${styles.filterButton} ${activeCategory==='Laptops' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Laptops')}>Laptops</button>
              <button className={`${styles.filterButton} ${activeCategory==='Electronics' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Electronics')}>Electronics</button>
              <button className={`${styles.filterButton} ${activeCategory==='Shoes' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Shoes')}>Shoes</button>
              <button className={`${styles.filterButton} ${activeCategory==='Others' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Others')}>Others</button>
            </div>
          </div>
        </>
    )
}