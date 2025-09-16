import React, { useState } from 'react'
import './HistoricalPlaces.css'

const HistoricalPlaces = ({ places }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Barchasi', count: places.length },
    { id: 'mosque', name: 'Masjidlar', count: places.filter(p => p.category === 'mosque').length },
    { id: 'madrasah', name: 'Madrasalar', count: places.filter(p => p.category === 'madrasah').length },
    { id: 'mausoleum', name: 'Maqbaralar', count: places.filter(p => p.category === 'mausoleum').length },
    { id: 'historical', name: 'Tarixiy yodgorlik', count: places.filter(p => p.category === 'historical').length },
    { id: 'museum', name: 'Muzeylar', count: places.filter(p => p.category === 'museum').length }
  ]

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter(place => place.category === selectedCategory)

  return (
    <section id="tarixiy-joylar" className="historical-places">
      <div className="container">
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
              <div className="place-header">
                <h3>{place.name}</h3>
              </div>

              <div className="place-description">
                {place.description}
              </div>

              <div className="place-meta">
                <div className="attractions">
                  📍 Markazdan 2.5 km
                </div>
                <div className="price">
                  {place.price}
                </div>
              </div>

              <button className="visit-btn">
                Tashrif buyurish
              </button>
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
      </div>
    </section>
  )
}

export default HistoricalPlaces