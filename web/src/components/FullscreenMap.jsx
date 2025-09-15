import React, { useState, useEffect } from 'react'
import './FullscreenMap.css'

const FullscreenMap = ({ isOpen, onClose, children, title = "Xarita" }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={`fullscreen-map-overlay ${isAnimating && isOpen ? 'open' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="fullscreen-map-container">
        <div className="fullscreen-map-header">
          <h3>{title}</h3>
          <div className="map-controls">
            <button className="map-control-btn" title="Zoom In">
              <span>+</span>
            </button>
            <button className="map-control-btn" title="Zoom Out">
              <span>-</span>
            </button>
            <button className="map-control-btn" title="My Location">
              <span>📍</span>
            </button>
            <button className="close-btn" onClick={handleClose}>
              <span>✕</span>
            </button>
          </div>
        </div>

        <div className="fullscreen-map-content">
          {children}
        </div>

        <div className="fullscreen-map-footer">
          <div className="map-info">
            <span className="map-attribution">© TravelUz Maps</span>
            <span className="map-scale">1:50,000</span>
          </div>

          <div className="map-actions">
            <button className="map-action-btn">
              <span>📤</span>
              Ulashish
            </button>
            <button className="map-action-btn">
              <span>📍</span>
              Marker qo'shish
            </button>
            <button className="map-action-btn">
              <span>🧭</span>
              Navigatsiya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullscreenMap