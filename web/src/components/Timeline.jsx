import React from 'react'
import './Timeline.css'

const Timeline = ({ days = [], selectedDay = 1, onDaySelect = () => {} }) => {
  return (
    <div id="marshrutlar" className="timeline">
      <div className="timeline-header">
        <h2>Marshrut dasturi</h2>
        <p>Har bir kunning batafsil rejasi</p>
      </div>

      <div className="timeline-nav">
        {days.map((day) => (
          <button
            key={day.day}
            className={`day-nav-btn ${selectedDay === day.day ? 'active' : ''}`}
            onClick={() => onDaySelect(day.day)}
          >
            <span className="day-number">{day.day}</span>
            <span className="day-label">Kun</span>
          </button>
        ))}
      </div>

      <div className="timeline-content">
        {days.map((day) => (
          <div
            key={day.day}
            className={`day-timeline ${selectedDay === day.day ? 'active' : ''}`}
          >
            <div className="day-header">
              <div className="day-badge">
                <span className="day-number-large">{day.day}</span>
                <span className="day-text">kun</span>
              </div>
              <div className="day-info">
                <h3>{day.title}</h3>
                <p>{day.description}</p>
                <div className="day-meta">
                  <span className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    {day.duration}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">🚶</span>
                    {day.walkingTime} yurish
                  </span>
                </div>
              </div>
            </div>

            <div className="places-timeline">
              {day.places.map((place, index) => (
                <div key={place.id} className="place-item">
                  <div className="timeline-line">
                    <div className="timeline-dot">
                      <span>{index + 1}</span>
                    </div>
                    {index < day.places.length - 1 && (
                      <div className="timeline-connector"></div>
                    )}
                  </div>

                  <div className="place-content">
                    <div className="place-time">
                      <span className="time-badge">{place.time}</span>
                      <span className="duration-text">{place.duration}</span>
                    </div>

                    <div className="place-card">
                      <div className="place-image">
                        <img src={place.image} alt={place.name} />
                        <div className="entrance-badge">
                          {place.entrance}
                        </div>
                      </div>

                      <div className="place-details">
                        <h4>{place.name}</h4>
                        <p className="place-description">{place.description}</p>

                        <div className="place-tip">
                          <span className="tip-icon">💡</span>
                          <span className="tip-text">{place.tips}</span>
                        </div>

                        <div className="place-actions">
                          <button className="action-btn location-btn">
                            <span>📍</span>
                            Xaritada ko'rish
                          </button>
                          <button className="action-btn info-btn">
                            <span>ℹ️</span>
                            Batafsil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="day-summary">
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-icon">📍</span>
                  <div className="summary-info">
                    <span className="summary-number">{day.places.length}</span>
                    <span className="summary-label">joy</span>
                  </div>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">⏰</span>
                  <div className="summary-info">
                    <span className="summary-number">{day.duration}</span>
                    <span className="summary-label">jami vaqt</span>
                  </div>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">💰</span>
                  <div className="summary-info">
                    <span className="summary-number">
                      {(day.places || []).reduce((total, place) => {
                        const price = (place.entrance || '0').replace(/[^\d]/g, '')
                        return total + (parseInt(price) || 0)
                      }, 0).toLocaleString()}
                    </span>
                    <span className="summary-label">so'm</span>
                  </div>
                </div>
              </div>

              <button className="complete-day-btn">
                <span>✅</span>
                {day.day}-kunni yakunlash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline