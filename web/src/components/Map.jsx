import { useState, useEffect } from 'react'
import citiesData from '../data/cities.json'

function Map({ selectedCity, selectedPlace }) {
  const [mapCenter, setMapCenter] = useState({ lat: 41.3775, lng: 64.5853 }) // O'zbekiston markazi

  useEffect(() => {
    if (selectedPlace) {
      setMapCenter(selectedPlace.coordinates)
    } else if (selectedCity) {
      setMapCenter(selectedCity.coordinates)
    }
  }, [selectedCity, selectedPlace])

  const allCities = citiesData

  return (
    <div className="map">
      <div className="map-header">
        <h3>🗺️ O'zbekiston xaritasi</h3>
        {selectedCity && (
          <div className="selected-info">
            <span>📍 {selectedCity.name}</span>
            {selectedPlace && <span> → {selectedPlace.name}</span>}
          </div>
        )}
      </div>

      <div className="map-container-inner">
        <svg viewBox="0 0 800 600" className="map-svg">
          {/* O'zbekiston haqiqiy xarita konturi */}
          <defs>
            <linearGradient id="countryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8f5e8" />
              <stop offset="50%" stopColor="#f0f8ff" />
              <stop offset="100%" stopColor="#fff5f5" />
            </linearGradient>
            <linearGradient id="cityHalo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.2" />
            </linearGradient>
            <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.15)"/>
            </filter>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <pattern id="mapPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="20" cy="20" r="1" fill="rgba(102, 126, 234, 0.1)"/>
            </pattern>
          </defs>

          {/* O'zbekiston asosiy konturi */}
          <path
            d="M 120 250
               L 180 230
               Q 220 225 260 235
               L 320 240
               Q 380 235 420 245
               L 480 250
               Q 520 255 560 265
               L 600 275
               Q 630 285 650 305
               L 665 340
               Q 670 380 660 420
               L 650 450
               Q 640 480 620 500
               L 580 515
               Q 540 520 500 515
               L 460 510
               Q 420 505 380 495
               L 340 485
               Q 300 475 260 465
               L 220 450
               Q 180 435 150 415
               L 130 390
               Q 115 365 118 340
               L 120 315
               Q 118 285 120 250 Z"
            className="country-border"
            fill="url(#countryGradient)"
            stroke="#667eea"
            strokeWidth="3"
            filter="url(#mapShadow)"
          />

          {/* Qorakalpog'iston (shimoli-g'arbiy qism) */}
          <path
            d="M 130 250
               Q 150 240 180 245
               L 220 250
               Q 240 255 250 275
               L 245 300
               Q 240 320 225 335
               L 200 350
               Q 175 355 155 350
               L 135 340
               Q 125 325 130 305
               L 130 275
               Q 128 260 130 250 Z"
            fill="rgba(102, 126, 234, 0.1)"
            stroke="rgba(102, 126, 234, 0.3)"
            strokeWidth="1"
          />

          {/* Orol dengizi hududi */}
          <ellipse
            cx="200" cy="280"
            rx="25" ry="15"
            fill="rgba(59, 130, 246, 0.2)"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          {/* Geografik detallar */}
          <path
            d="M 300 350 Q 320 345 340 350 L 360 355 Q 380 360 395 375 L 405 390 Q 400 405 385 415 L 365 420 Q 345 415 325 410 L 305 400 Q 295 385 300 360 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="1"
          />

          {/* Background pattern */}
          <rect x="120" y="230" width="550" height="290" fill="url(#mapPattern)" opacity="0.3"/>


          {/* Tarixiy shaharlar */}
          {allCities.map(city => {
            // Haqiqiy koordinatalar asosida xaritadagi pozitsiyani hisoblash
            let x, y;

            switch(city.name) {
              case 'Toshkent':
                x = 450; y = 340;
                break;
              case 'Samarqand':
                x = 420; y = 380;
                break;
              case 'Buxoro':
                x = 380; y = 390;
                break;
              case 'Xiva':
                x = 200; y = 330;
                break;
              case 'Shahrisabz':
                x = 430; y = 420;
                break;
              case 'Farg\'ona':
                x = 540; y = 340;
                break;
              default:
                x = 400; y = 350;
            }

            const isSelected = selectedCity?.id === city.id
            const isHistorical = ['Samarqand', 'Buxoro', 'Xiva', 'Shahrisabz'].includes(city.name)

            return (
              <g key={city.id} className="city-group">
                {/* Halo effect for historical cities */}
                {isHistorical && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 25 : 20}
                    fill="none"
                    stroke="url(#cityHalo)"
                    strokeWidth="2"
                    opacity="0.6"
                    className="city-halo"
                  />
                )}

                {/* Pulse animation for historical cities */}
                {isHistorical && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 18 : 15}
                    fill="none"
                    stroke={isSelected ? "#f59e0b" : "#8b5cf6"}
                    strokeWidth="1"
                    opacity="0.8"
                    className="city-pulse"
                  />
                )}

                {/* Main city marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 14 : (isHistorical ? 12 : 10)}
                  fill={isSelected ? "#f59e0b" : (isHistorical ? "#8b5cf6" : "#3b82f6")}
                  stroke="white"
                  strokeWidth="3"
                  className="city-marker"
                  filter="url(#mapShadow)"
                />

                {/* Inner marker for historical cities */}
                {isHistorical && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 6}
                    fill="white"
                    opacity="0.9"
                  />
                )}

                {/* Historical city icon */}
                {isHistorical && (
                  <text
                    x={x}
                    y={y + 2}
                    textAnchor="middle"
                    className="city-icon"
                    fontSize={isSelected ? "10" : "8"}
                    fill={isSelected ? "#f59e0b" : "#8b5cf6"}
                    fontWeight="bold"
                  >
                    🏛️
                  </text>
                )}

                {/* City name label */}
                <text
                  x={x}
                  y={y - (isSelected ? 25 : (isHistorical ? 22 : 18))}
                  textAnchor="middle"
                  className="city-label"
                  fontSize={isSelected ? "14" : "12"}
                  fontWeight={isSelected ? "bold" : (isHistorical ? "600" : "normal")}
                  fill={isHistorical ? "#7c3aed" : "#1e40af"}
                >
                  {city.name}
                </text>

                {/* Historical badge */}
                {isHistorical && (
                  <rect
                    x={x - 25}
                    y={y + 15}
                    width="50"
                    height="12"
                    rx="6"
                    fill="rgba(139, 92, 246, 0.9)"
                    opacity={isSelected ? "1" : "0.8"}
                  />
                )}

                {isHistorical && (
                  <text
                    x={x}
                    y={y + 23}
                    textAnchor="middle"
                    className="historical-badge"
                    fontSize="8"
                    fill="white"
                    fontWeight="600"
                  >
                    Tarixiy
                  </text>
                )}

                {/* Tarixiy joylar */}
                {isSelected && city.historicalPlaces.map(place => {
                  const placeX = ((place.coordinates.lng - 55) / 20) * 600 + 100
                  const placeY = ((place.coordinates.lat - 37) / 8) * 400 + 100
                  const isPlaceSelected = selectedPlace?.id === place.id

                  return (
                    <g key={place.id}>
                      <circle
                        cx={placeX}
                        cy={placeY}
                        r={isPlaceSelected ? 8 : 5}
                        fill={isPlaceSelected ? "#ff9800" : "#ffd54f"}
                        stroke="white"
                        strokeWidth="1"
                        className="place-marker"
                      />
                      <text
                        x={placeX}
                        y={placeY - 10}
                        textAnchor="middle"
                        className="place-label"
                        fontSize="10"
                        fill="#333"
                      >
                        {place.name}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>

        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-marker city"></div>
            <span>Shaharlar</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker place"></div>
            <span>Tarixiy joylar</span>
          </div>
        </div>
      </div>

      {selectedPlace && (
        <div className="place-info-popup">
          <img src={selectedPlace.image} alt={selectedPlace.name} />
          <div className="popup-content">
            <h4>{selectedPlace.name}</h4>
            <p>{selectedPlace.description}</p>
            <div className="popup-meta">
              <span>📅 {selectedPlace.yearBuilt}</span>
              <span>🏷️ {selectedPlace.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Map