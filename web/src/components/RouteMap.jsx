import React, { useState } from 'react'
import './RouteMap.css'

const RouteMap = ({ days, selectedDay }) => {
  const [mapView, setMapView] = useState('route') // 'route' or 'satellite'
  const [showAllDays, setShowAllDays] = useState(false)

  const currentDay = days.find(day => day.day === selectedDay)
  const displayDays = showAllDays ? days : [currentDay]

  // Color scheme for different days
  const dayColors = {
    1: '#667eea',
    2: '#f56565',
    3: '#48bb78'
  }

  const getRouteStyle = (dayNumber) => ({
    stroke: dayColors[dayNumber],
    strokeWidth: 3,
    strokeDasharray: dayNumber === selectedDay ? 'none' : '5,5',
    opacity: showAllDays ? (dayNumber === selectedDay ? 1 : 0.6) : 1
  })

  return (
    <div className="route-map">
      <div className="map-header">
        <h3>Marshrut xaritasi</h3>
        <div className="map-controls">
          <div className="view-toggle">
            <button
              className={mapView === 'route' ? 'active' : ''}
              onClick={() => setMapView('route')}
            >
              🗺️ Marshrut
            </button>
            <button
              className={mapView === 'satellite' ? 'active' : ''}
              onClick={() => setMapView('satellite')}
            >
              🛰️ Satellit
            </button>
          </div>
          <button
            className={`show-all-btn ${showAllDays ? 'active' : ''}`}
            onClick={() => setShowAllDays(!showAllDays)}
          >
            {showAllDays ? 'Faqat bugun' : 'Barcha kunlar'}
          </button>
        </div>
      </div>

      <div className="map-container">
        <div className={`map-background ${mapView}`}>
          {/* Background map image */}
          <img
            src={mapView === 'satellite'
              ? "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              : "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
            alt="Samarqand xaritasi"
          />
          <div className="map-overlay"></div>
        </div>

        {/* Route lines and markers */}
        <svg className="route-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
          {displayDays.map(day => (
            <g key={day.day}>
              {/* Route path */}
              <path
                d={`M ${15 + (day.day - 1) * 25} 20
                   Q ${25 + (day.day - 1) * 25} 35 ${35 + (day.day - 1) * 25} 45
                   Q ${45 + (day.day - 1) * 25} 55 ${55 + (day.day - 1) * 25} 70
                   Q ${65 + (day.day - 1) * 25} 80 ${75 + (day.day - 1) * 25} 85`}
                fill="none"
                {...getRouteStyle(day.day)}
                className="route-path"
              />
            </g>
          ))}
        </svg>

        {/* Place markers */}
        <div className="markers-container">
          {displayDays.map(day =>
            day.places.map((place, index) => (
              <div
                key={`${day.day}-${place.id}`}
                className={`place-marker ${day.day === selectedDay ? 'active-day' : ''}`}
                style={{
                  left: `${20 + (day.day - 1) * 20 + index * 12}%`,
                  top: `${25 + index * 15}%`,
                  '--marker-color': dayColors[day.day]
                }}
              >
                <div className="marker-pin" style={{ background: dayColors[day.day] }}>
                  <span>{index + 1}</span>
                </div>
                <div className="marker-popup">
                  <img src={place.image} alt={place.name} />
                  <div className="popup-content">
                    <h4>{place.name}</h4>
                    <p>{place.time}</p>
                    <span className="day-badge" style={{ background: dayColors[day.day] }}>
                      {day.day}-kun
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Distance indicators */}
        <div className="distance-indicators">
          {currentDay && currentDay.places.map((place, index) => (
            index < currentDay.places.length - 1 && (
              <div
                key={`distance-${index}`}
                className="distance-line"
                style={{
                  left: `${22 + index * 12}%`,
                  top: `${30 + index * 15}%`,
                }}
              >
                <span className="distance-text">
                  {Math.floor(Math.random() * 5 + 1)} km
                </span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Day legend */}
      <div className="day-legend">
        <h4>Kunlar bo'yicha belgilar</h4>
        <div className="legend-items">
          {days.map(day => (
            <div
              key={day.day}
              className={`legend-item ${day.day === selectedDay ? 'active' : ''}`}
            >
              <div
                className="legend-color"
                style={{ background: dayColors[day.day] }}
              ></div>
              <div className="legend-info">
                <span className="legend-day">{day.day}-kun</span>
                <span className="legend-title">{day.title}</span>
                <span className="legend-count">{day.places.length} joy</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Route info panel */}
      <div className="route-info">
        <div className="route-stats">
          <div className="stat-item">
            <span className="stat-icon">🚶</span>
            <div className="stat-details">
              <span className="stat-value">
                {currentDay?.places.length || 0}
              </span>
              <span className="stat-label">joylar</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <div className="stat-details">
              <span className="stat-value">
                {currentDay?.duration || '0 soat'}
              </span>
              <span className="stat-label">vaqt</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📍</span>
            <div className="stat-details">
              <span className="stat-value">
                {Math.floor(Math.random() * 15 + 5)} km
              </span>
              <span className="stat-label">masofa</span>
            </div>
          </div>
        </div>

        <div className="route-actions">
          <button className="action-btn primary">
            <span>🧭</span>
            Navigatsiya
          </button>
          <button className="action-btn secondary">
            <span>📤</span>
            Ulashish
          </button>
        </div>
      </div>
    </div>
  )
}

export default RouteMap