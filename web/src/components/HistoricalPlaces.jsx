import React, { useState } from 'react'
import './HistoricalPlaces.css'

const HistoricalPlaces = ({ places }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Barchasi', count: places.length },
    { id: 'mosque', name: 'Masjidlar', count: 2 },
    { id: 'madrasah', name: 'Madrasalar', count: 2 },
    { id: 'mausoleum', name: 'Maqbaralar', count: 2 }
  ]

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter(place => {
        if (selectedCategory === 'mosque') return place.name.includes('masjid')
        if (selectedCategory === 'madrasah') return place.name.includes('Registon') || place.name.includes('rasadxona')
        if (selectedCategory === 'mausoleum') return place.name.includes('maqbara') || place.name.includes('Gur-Emir')
        return true
      })

  return (
    <section className="historical-places">
      <div className="section-header">
        <h2>Tarixiy joylar</h2>
        <p>Samarqandning eng mashhur tarixiy yodgorliklarini kashf eting</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
            <span className="count">({category.count})</span>
          </button>
        ))}
      </div>

      <div className="places-grid">
        {filteredPlaces.map(place => (
          <div key={place.id} className="place-card">
            <div className="place-image">
              <img src={place.image} alt={place.name} />
              <div className="place-overlay">
                <button className="details-btn">
                  Batafsil ma'lumot
                </button>
              </div>
              <div className="place-rating">
                <span>⭐ {place.rating}</span>
              </div>
            </div>

            <div className="place-content">
              <h3>{place.name}</h3>
              <p>{place.description}</p>

              <div className="place-features">
                <div className="feature">
                  <span className="feature-icon">📍</span>
                  <span>Markazdan 2.5 km</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🕐</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎫</span>
                  <span>Kirish 15,000 so'm</span>
                </div>
              </div>

              <div className="place-actions">
                <button className="visit-btn">
                  Tashrif buyurish
                </button>
                <button className="favorite-btn">
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="virtual-tour">
        <div className="tour-content">
          <div className="tour-info">
            <h3>Virtual tur</h3>
            <p>Uydan chiqmasdan Samarqandning go'zal joylarini ko'ring</p>
            <button className="tour-btn">
              Virtual turni boshlash
              <span>🔗</span>
            </button>
          </div>
          <div className="tour-preview">
            <img
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Virtual tur"
            />
            <div className="play-button">
              <span>▶️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoricalPlaces