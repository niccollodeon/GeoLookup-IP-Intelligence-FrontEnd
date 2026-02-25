import '../styles/searchbar.css'

export default function SearchBar({
  searchIP,
  onSearchChange,
  onSearch,
  onClear,
  loading,
  error,
  isUserView,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className="search-section">
      <div className="search-label">// ip address lookup</div>
      <div className="search-row">
        <input
          className={`search-input${error ? ' error-border' : ''}`}
          type="text"
          value={searchIP}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter IP address (e.g. 8.8.8.8)"
        />
        <button
          className="btn-search"
          onClick={onSearch}
          disabled={loading || !searchIP.trim()}
        >
          {loading ? '...' : 'Lookup →'}
        </button>
        {!isUserView && (
          <button className="btn-clear" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      {error && <div className="search-error">⚠ {error}</div>}
    </div>
  )
}