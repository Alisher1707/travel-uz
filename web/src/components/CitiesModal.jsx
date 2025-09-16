import React from 'react'
import './CitiesModal.css'

const CitiesModal = ({ isOpen, onClose, cities }) => {
  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="cities-modal-overlay" onClick={handleOverlayClick}>
      <div className="cities-modal-content">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2>Barcha shaharlar</h2>
        </div>

        <div className="cities-grid">
          {cities.map(city => (
            <div key={city.id} className="city-modal-card">
              <div className="city-modal-image">
                <img src={city.image} alt={city.name} />
                <div className="city-modal-overlay">
                  <button className="view-city-btn">Ko'rish</button>
                </div>
              </div>

              <div className="city-modal-info">
                <div className="city-modal-header">
                  <h3>{city.name}</h3>
                  <div className="city-modal-rating">
                    <span className="star">⭐</span>
                    <span>{city.rating}</span>
                  </div>
                </div>

                <p className="city-modal-description">{city.description}</p>

                <div className="city-modal-meta">
                  <span className="attractions">{city.attractions}</span>
                  <span className="price">{city.price}</span>
                </div>

                <button className="book-modal-btn">
                  Bron qilish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CitiesModal