import { useState, useEffect } from 'react'
import citiesData from '../data/cities.json'

function CityList({ selectedCity, onCitySelect }) {
  const [cities, setCities] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setCities(citiesData)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % cities.length)
    }, 3000) // 3 soniyada yangilanadi

    return () => clearInterval(interval)
  }, [cities.length, isAutoPlaying])

  // Pause auto-play when user interacts
  const handleCityClick = (city) => {
    setIsAutoPlaying(false)
    onCitySelect(city)

    // Resume auto-play after 10 seconds
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  // Get current city for single display
  const getCurrentCity = () => {
    if (cities.length === 0) return null
    return cities[currentIndex]
  }

  const currentCity = getCurrentCity()

  return (
    <div className="city-list">
      <div className="city-list-header">
        <h3>Shaharlar</h3>
      </div>

      <div
        className="cities-carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cities-carousel-single">
          {currentCity && (
            <div
              className={`city-card-single ${selectedCity?.id === currentCity.id ? 'selected' : ''}`}
              onClick={() => handleCityClick(currentCity)}
            >
              <div className="city-card-inner-single">
                <div className="city-image-container">
                  <img
                    src={currentCity.image}
                    alt={currentCity.name}
                    className="city-image-single"
                  />
                </div>

                <div className="city-bottom-info">
                  <div className="city-name-left">
                    <h4>{currentCity.name}</h4>
                  </div>

                  <div className="historical-count-center">
                    📍 {currentCity.historicalPlaces.length} ta tarixiy joy
                  </div>

                  <div className="explore-btn-right">
                    <button
                      className="explore-btn-bottom"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCityClick(currentCity)
                      }}
                    >
                      Batafsil ko'rish →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default CityList