import React, { useState } from 'react'
import FullscreenMap from './FullscreenMap'
import './CityMap.css'

const CityMap = ({ city }) => {
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Simplified map representation using CSS and positioning
  const handleMarkerClick = (place) => {
    setSelectedPlace(place)
  }

  return (
    <section className="city-map-section">
      <div className="section-header">
        <div className="header-content">
          <h2>Shahar xaritasi</h2>
          <p>Diqqatga sazovor joylarni xaritada ko'ring</p>
        </div>
        <button
          className="fullscreen-btn"
          onClick={() => setIsFullscreen(true)}
        >
          <span>⛶</span>
          To'liq ekran
        </button>
      </div>

      <div className="map-container">
        <div className="map-wrapper">
          {/* Background map image */}
          <div className="map-background">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Samarqand xaritasi"
            />
            <div className="map-overlay"></div>
          </div>

          {/* Interactive markers */}
          <div className="map-markers">
            {city.historicalPlaces.map((place, index) => (
              <div
                key={place.id}
                className={`map-marker ${selectedPlace?.id === place.id ? 'active' : ''}`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`
                }}
                onClick={() => handleMarkerClick(place)}
              >
                <div className="marker-pin">
                  <span>{index + 1}</span>
                </div>
                <div className="marker-pulse"></div>
              </div>
            ))}
          </div>

          {/* Info panel */}
          {selectedPlace && (
            <div className="map-info-panel">
              <button
                className="close-btn"
                onClick={() => setSelectedPlace(null)}
              >
                ×
              </button>
              <img src={selectedPlace.image} alt={selectedPlace.name} />
              <div className="info-content">
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.description}</p>
                <div className="info-rating">
                  <span>⭐ {selectedPlace.rating}</span>
                </div>
                <button className="visit-btn">
                  Tashrif buyurish
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Places list */}
        <div className="places-list">
          <h3>Barcha joylar</h3>
          <div className="places-items">
            {city.historicalPlaces.map((place, index) => (
              <div
                key={place.id}
                className={`place-item ${selectedPlace?.id === place.id ? 'active' : ''}`}
                onClick={() => handleMarkerClick(place)}
              >
                <div className="place-number">{index + 1}</div>
                <div className="place-info">
                  <h4>{place.name}</h4>
                  <span className="place-rating">⭐ {place.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Map */}
      <FullscreenMap
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        title={`${city.name} xaritasi`}
      >
        <div className="fullscreen-map-content">
          <div className="map-background">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Samarqand xaritasi"
            />
            <div className="map-overlay"></div>
          </div>

          {/* Interactive markers in fullscreen */}
          <div className="map-markers">
            {city.historicalPlaces.map((place, index) => (
              <div
                key={place.id}
                className={`map-marker ${selectedPlace?.id === place.id ? 'active' : ''}`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`
                }}
                onClick={() => handleMarkerClick(place)}
              >
                <div className="marker-pin">
                  <span>{index + 1}</span>
                </div>
                <div className="marker-pulse"></div>
              </div>
            ))}
          </div>

          {/* Info panel in fullscreen */}
          {selectedPlace && (
            <div className="fullscreen-info-panel">
              <button
                className="close-btn"
                onClick={() => setSelectedPlace(null)}
              >
                ×
              </button>
              <img src={selectedPlace.image} alt={selectedPlace.name} />
              <div className="info-content">
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.description}</p>
                <div className="info-rating">
                  <span>⭐ {selectedPlace.rating}</span>
                </div>
                <button className="visit-btn">
                  Tashrif buyurish
                </button>
              </div>
            </div>
          )}
        </div>
      </FullscreenMap>
    </section>
  )
}

export default CityMap