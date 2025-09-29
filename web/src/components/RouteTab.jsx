import { useState } from 'react'
import citiesData from '../data/cities.json'

function RouteTab() {
  const [selectedCities, setSelectedCities] = useState([])
  const [routeInfo, setRouteInfo] = useState(null)

  const addCityToRoute = (city) => {
    if (!selectedCities.find(c => c.id === city.id)) {
      const newRoute = [...selectedCities, city]
      setSelectedCities(newRoute)
      calculateRouteInfo(newRoute)
    }
  }

  const removeCityFromRoute = (cityId) => {
    const newRoute = selectedCities.filter(c => c.id !== cityId)
    setSelectedCities(newRoute)
    calculateRouteInfo(newRoute)
  }

  const calculateRouteInfo = (cities) => {
    if (cities.length < 2) {
      setRouteInfo(null)
      return
    }

    const totalPlaces = cities.reduce((sum, city) => sum + city.historicalPlaces.length, 0)
    const estimatedDays = Math.ceil(totalPlaces / 3) // 3 ta joy bir kunda

    setRouteInfo({
      totalCities: cities.length,
      totalPlaces,
      estimatedDays
    })
  }

  const clearRoute = () => {
    setSelectedCities([])
    setRouteInfo(null)
  }

  return (
    <div className="route-tab">
      <h3>🛣️ Marshrut rejalash</h3>

      <div className="route-controls">
        <div className="available-cities">
          <h4>Shaharlarni tanlang:</h4>
          <div className="city-buttons">
            {citiesData.map(city => (
              <button
                key={city.id}
                className={`city-btn ${selectedCities.find(c => c.id === city.id) ? 'selected' : ''}`}
                onClick={() => addCityToRoute(city)}
                disabled={selectedCities.find(c => c.id === city.id)}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {selectedCities.length > 0 && (
          <div className="selected-route">
            <div className="route-header">
              <h4>Sizning marshrutingiz:</h4>
              <button className="clear-btn" onClick={clearRoute}>
                Tozalash
              </button>
            </div>

            <div className="route-cities">
              {selectedCities.map((city, index) => (
                <div key={city.id} className="route-city">
                  <div className="route-step">
                    <span className="step-number">{index + 1}</span>
                    <div className="step-info">
                      <h5>{city.name}</h5>
                      <p>{city.historicalPlaces.length} ta tarixiy joy</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeCityFromRoute(city.id)}
                    >
                      ❌
                    </button>
                  </div>

                  <div className="city-places">
                    {city.historicalPlaces.map(place => (
                      <div key={place.id} className="route-place">
                        • {place.name}
                      </div>
                    ))}
                  </div>

                  {index < selectedCities.length - 1 && (
                    <div className="route-arrow">⬇️</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {routeInfo && (
          <div className="route-summary">
            <h4>📊 Marshrut ma'lumotlari</h4>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Shaharlar:</span>
                <span className="stat-value">{routeInfo.totalCities}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Tarixiy joylar:</span>
                <span className="stat-value">{routeInfo.totalPlaces}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Taxminiy muddat:</span>
                <span className="stat-value">{routeInfo.estimatedDays} kun</span>
              </div>
            </div>

            <div className="travel-tips">
              <h5>💡 Sayohat maslahatlari:</h5>
              <ul>
                <li>Har bir shahar uchun kamida 1-2 kun vaqt ajrating</li>
                <li>Tarixiy joylarni ertalab tashrif buyuring</li>
                <li>Mahalliy transport va turar joy oldindan band qiling</li>
                <li>O'zbek milliy taomlarini tatib ko'ring</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RouteTab