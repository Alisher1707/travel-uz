import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import citiesData from '../data/cities.json'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icon for historical places
const placeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Highlighted place icon
const highlightedPlaceIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -40],
  shadowSize: [48, 48]
})

function CityPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [city, setCity] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const foundCity = citiesData.find(c => c.id === parseInt(id))
    if (foundCity) {
      setCity(foundCity)
    } else {
      navigate('/')
    }
  }, [id, navigate])

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place)
    // Center map on selected place
    if (mapRef.current) {
      mapRef.current.setView([place.coordinates.lat, place.coordinates.lng], 15)
    }
  }

  const addToRoute = (place) => {
    // TODO: Implement route functionality
    console.log('Adding to route:', place.name)
  }

  if (!city) {
    return <div className="loading">Yuklanmoqda...</div>
  }

  return (
    <div className="city-page">
      {/* City Banner */}
      <div className="city-banner">
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Orqaga
        </button>

        <img src={city.image} alt={city.name} className="city-banner-image" />
        <div className="city-banner-overlay">
          <div className="city-banner-content">
            <h1 className="city-banner-title">{city.name} – Tarixiy shahar</h1>
            <p className="city-banner-subtitle">{city.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="city-main-content">
        {/* Map Section - Left */}
        <div className="city-map-section">
          <h2>🗺️ Interaktiv xarita</h2>
          <div className="map-container-leaflet">
            <MapContainer
              center={[city.coordinates.lat, city.coordinates.lng]}
              zoom={12}
              style={{ height: '600px', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* City center marker */}
              <Marker position={[city.coordinates.lat, city.coordinates.lng]}>
                <Popup>
                  <div className="popup-content">
                    <h3>{city.name}</h3>
                    <p>{city.description}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Historical places markers */}
              {city.historicalPlaces.map(place => (
                <Marker
                  key={place.id}
                  position={[place.coordinates.lat, place.coordinates.lng]}
                  icon={selectedPlace?.id === place.id ? highlightedPlaceIcon : placeIcon}
                >
                  <Popup>
                    <div className="popup-content">
                      <img src={place.image} alt={place.name} style={{width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px'}} />
                      <h3>{place.name}</h3>
                      <p>{place.description}</p>
                      <div className="popup-meta">
                        <span>📅 {place.yearBuilt}</span>
                        <span>🏷️ {place.category}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Places List - Right */}
        <div className="city-places-section">
          <h2>🏛️ Tarixiy joylar ({city.historicalPlaces.length})</h2>
          <div className="places-list-container">
            {city.historicalPlaces.map(place => (
              <div
                key={place.id}
                className={`place-card-compact ${selectedPlace?.id === place.id ? 'selected' : ''}`}
                onClick={() => handlePlaceSelect(place)}
              >
                <div className="place-card-image-container">
                  <img src={place.image} alt={place.name} className="place-card-image-compact" />
                </div>

                <div className="place-card-info">
                  <h3 className="place-card-title">{place.name}</h3>
                  <p className="place-card-description">{place.description}</p>

                  <div className="place-card-meta">
                    <span className="place-meta-item">📅 {place.yearBuilt}</span>
                    <span className="place-meta-item">🏷️ {place.category}</span>
                  </div>

                  <button
                    className="add-to-route-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/route/${city.id}`)
                    }}
                  >
                    📋 Marshrut ko'rish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityPage