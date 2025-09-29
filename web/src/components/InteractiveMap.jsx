import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import citiesData from '../data/cities.json'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icons
const createCustomIcon = (color, isHistorical = false) => {
  const iconHtml = isHistorical
    ? `<div style="
        background: linear-gradient(135deg, ${color}, #8b5cf6);
        width: 25px; height: 25px; border-radius: 50%;
        border: 3px solid white;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        position: relative;
      ">
        <span style="font-size: 12px;">🏛️</span>
        <div style="
          position: absolute; top: -8px; right: -8px;
          background: #8b5cf6; color: white; font-size: 8px;
          padding: 1px 4px; border-radius: 6px; font-weight: bold;
        ">T</div>
      </div>`
    : `<div style="
        background: ${color};
        width: 20px; height: 20px; border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
      "></div>`

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
  })
}

const selectedIcon = createCustomIcon('#f59e0b', true)
const historicalIcon = createCustomIcon('#8b5cf6', true)
const normalIcon = createCustomIcon('#3b82f6', false)

// Component to handle map updates
function MapUpdater({ selectedCity, selectedPlace }) {
  const map = useMap()

  useEffect(() => {
    if (selectedPlace) {
      map.setView([selectedPlace.coordinates.lat, selectedPlace.coordinates.lng], 14)
    } else if (selectedCity) {
      map.setView([selectedCity.coordinates.lat, selectedCity.coordinates.lng], 11)
    }
  }, [selectedCity, selectedPlace, map])

  return null
}

function InteractiveMap({ selectedCity, selectedPlace, onCitySelect }) {
  const [map, setMap] = useState(null)

  const uzbekistanCenter = [41.377491, 64.585262]
  const historicalCities = ['Samarqand', 'Buxoro', 'Xiva', 'Shahrisabz']

  const getMarkerIcon = (city) => {
    if (selectedCity?.id === city.id) return selectedIcon
    if (historicalCities.includes(city.name)) return historicalIcon
    return normalIcon
  }

  const handleCityClick = (city) => {
    if (onCitySelect) {
      onCitySelect(city)
    }
  }

  return (
    <div className="interactive-map-container">
      <div className="map-header">
        <h3>🗺️ O'zbekiston interaktiv xaritasi</h3>
        {selectedCity && (
          <div className="selected-info">
            <span>📍 {selectedCity.name}</span>
            {selectedPlace && <span> → {selectedPlace.name}</span>}
          </div>
        )}
      </div>

      <MapContainer
        center={uzbekistanCenter}
        zoom={6}
        style={{ height: '500px', width: '100%', borderRadius: '15px' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater selectedCity={selectedCity} selectedPlace={selectedPlace} />

        {/* City markers */}
        {citiesData.map(city => (
          <Marker
            key={city.id}
            position={[city.coordinates.lat, city.coordinates.lng]}
            icon={getMarkerIcon(city)}
            eventHandlers={{
              click: () => handleCityClick(city)
            }}
          >
            <Popup>
              <div className="map-popup">
                <img
                  src={city.image}
                  alt={city.name}
                  style={{
                    width: '200px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}
                />
                <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>
                  {city.name}
                  {historicalCities.includes(city.name) && (
                    <span style={{
                      background: '#8b5cf6',
                      color: 'white',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      marginLeft: '8px'
                    }}>
                      Tarixiy
                    </span>
                  )}
                </h4>
                <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
                  {city.description}
                </p>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  📍 {city.historicalPlaces.length} ta tarixiy joy
                </div>
                <button
                  onClick={() => handleCityClick(city)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    marginTop: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Batafsil ko'rish
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Historical places markers */}
        {selectedCity && selectedCity.historicalPlaces.map(place => (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lng]}
            icon={L.divIcon({
              html: `<div style="
                background: #f59e0b;
                width: 15px; height: 15px; border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              "></div>`,
              className: 'place-marker',
              iconSize: [15, 15],
              iconAnchor: [7, 7]
            })}
          >
            <Popup>
              <div className="place-popup">
                <img
                  src={place.image}
                  alt={place.name}
                  style={{
                    width: '180px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '6px'
                  }}
                />
                <h5 style={{ margin: '0 0 6px 0', color: '#2c3e50', fontSize: '14px' }}>
                  {place.name}
                </h5>
                <p style={{ margin: '0 0 6px 0', color: '#64748b', fontSize: '12px' }}>
                  {place.description}
                </p>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    color: '#6b7280'
                  }}>
                    📅 {place.yearBuilt}
                  </span>
                  <span style={{
                    background: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    color: '#6b7280'
                  }}>
                    🏷️ {place.category}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-marker historical"></div>
          <span>Tarixiy shaharlar</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker city"></div>
          <span>Oddiy shaharlar</span>
        </div>
        <div className="legend-item">
          <div style={{
            width: '12px',
            height: '12px',
            background: '#f59e0b',
            borderRadius: '50%',
            border: '2px solid white'
          }}></div>
          <span>Tarixiy joylar</span>
        </div>
      </div>
    </div>
  )
}

export default InteractiveMap