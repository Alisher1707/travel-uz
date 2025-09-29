function CityDetails({ city, onPlaceSelect }) {
  if (!city) return null

  return (
    <div className="city-details">
      <div className="city-header">
        <img src={city.image} alt={city.name} className="city-banner" />
        <div className="city-title">
          <h3>{city.name}</h3>
          <p>{city.description}</p>
        </div>
      </div>

      <div className="historical-places">
        <h4>🏛️ Tarixiy joylar</h4>
        <div className="places-list">
          {city.historicalPlaces.map(place => (
            <div
              key={place.id}
              className="place-card"
              onClick={() => onPlaceSelect(place)}
            >
              <img src={place.image} alt={place.name} className="place-image" />
              <div className="place-info">
                <h5>{place.name}</h5>
                <p className="place-description">{place.description}</p>
                <div className="place-meta">
                  <span className="year">📅 {place.yearBuilt}</span>
                  <span className="category">🏷️ {place.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CityDetails