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
              <button className={`${styles.filterButton} ${activeCategory==='Clothes Updated' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Clothes Updated')}>Clothes</button>
              <button className={`${styles.filterButton} ${activeCategory==='Furniture' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Furniture')}>Furniture</button>
              <button className={`${styles.filterButton} ${activeCategory==='Electronics' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Electronics')}>Electronics</button>
              <button className={`${styles.filterButton} ${activeCategory==='Shoes' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Shoes')}>Shoes</button>
              <button className={`${styles.filterButton} ${activeCategory==='Miscellaneous' ? styles.activeCategory : ''}`} onClick={() => onFilterChange('Miscellaneous')}>Miscellaneous</button>
            </div>
          </div>
        </>
    )
}