import React from 'react'
import './ItineraryHeader.css'

const ItineraryHeader = ({ itinerary }) => {
  return (
    <section className="itinerary-header">
      <div className="header-background">
        <img
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Samarqand marshruti"
        />
        <div className="header-overlay"></div>
      </div>

      <div className="header-content">
        <div className="header-info">
          <h1>{itinerary.title}</h1>

          <div className="itinerary-stats">
            <div className="stat-item">
              <span className="stat-icon">📅</span>
              <div className="stat-info">
                <span className="stat-label">Davomiyligi</span>
                <span className="stat-value">{itinerary.duration}</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">🚶</span>
              <div className="stat-info">
                <span className="stat-label">Masofa</span>
                <span className="stat-value">{itinerary.totalDistance}</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <span className="stat-label">Qiyinlik</span>
                <span className="stat-value">{itinerary.difficulty}</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">🌤️</span>
              <div className="stat-info">
                <span className="stat-label">Eng yaxshi vaqt</span>
                <span className="stat-value">{itinerary.bestTime}</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button className="primary-btn">
              <span>📋</span>
              Marshrutni saqlash
            </button>
            <button className="secondary-btn">
              <span>📤</span>
              Ulashish
            </button>
            <button className="secondary-btn">
              <span>🖨️</span>
              Chop etish
            </button>
          </div>
        </div>

        <div className="route-preview">
          <div className="preview-card">
            <h3>Marshrut haqida</h3>
            <p>
              Samarqandning eng mashhur tarixiy yodgorliklarini 3 kun ichida
              to'liq ko'rib chiqish imkoniyati. Har bir kun alohida mavzu va
              tajribaga bag'ishlangan.
            </p>
            <div className="preview-highlights">
              <div className="highlight">
                <span>🏛️</span>
                <span>12+ tarixiy joy</span>
              </div>
              <div className="highlight">
                <span>🎨</span>
                <span>Hunarmandchilik</span>
              </div>
              <div className="highlight">
                <span>📸</span>
                <span>Instagram joylar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ItineraryHeader