import React from 'react'
import './CityBanner.css'

const CityBanner = ({ city }) => {
  return (
    <section className="city-banner">
      <div className="banner-background">
        <img src={city.banner} alt={city.name} />
        <div className="banner-overlay"></div>
      </div>

      <div className="banner-content">
        <div className="banner-info">
          <h1>{city.name}</h1>
          <p>{city.description}</p>

          <div className="banner-stats">
            <div className="stat">
              <span className="stat-number">{city.historicalPlaces.length}</span>
              <span className="stat-label">Tarixiy joylar</span>
            </div>
            <div className="stat">
              <span className="stat-number">{city.hotels.length}</span>
              <span className="stat-label">Mehmonxonalar</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8</span>
              <span className="stat-label">O'rtacha reyting</span>
            </div>
          </div>

          <div className="banner-actions">
            <button className="primary-btn">
              Marshrutni rejalashtirish
            </button>
            <button className="secondary-btn">
              Galereyani ko'rish
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CityBanner