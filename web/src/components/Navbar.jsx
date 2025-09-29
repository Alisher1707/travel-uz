import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import citiesData from '../data/cities.json'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredCities = citiesData.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredCities)
      setIsSearchOpen(true)
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleCitySelect = (city) => {
    setSearchQuery('')
    setIsSearchOpen(false)
    navigate(`/city/${city.id}`)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      handleCitySelect(searchResults[0])
    }
  }

  return (
    <nav className="navbar modern-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <span className="logo-text gradient-text">TravelUz</span>
          </Link>
        </div>

        <div className="navbar-search" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Shahar qidirish..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          {isSearchOpen && searchResults.length > 0 && (
            <div className="search-dropdown animate-slide-down">
              {searchResults.map(city => (
                <div
                  key={city.id}
                  className="search-result-item"
                  onClick={() => handleCitySelect(city)}
                >
                  <img src={city.image} alt={city.name} className="search-result-image" />
                  <div className="search-result-info">
                    <h4>{city.name}</h4>
                    <p>{city.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isSearchOpen && searchQuery && searchResults.length === 0 && (
            <div className="search-dropdown animate-slide-down">
              <div className="search-no-results">
                Shahar topilmadi
              </div>
            </div>
          )}
        </div>

        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Bosh sahifa
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className={`navbar-link ${location.pathname === '/explore' ? 'active' : ''}`}
            >
              Shaharlar
            </Link>
          </li>
          <li>
            <Link
              to="/route"
              className={`navbar-link ${location.pathname === '/route' ? 'active' : ''}`}
            >
              Marshrut
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar