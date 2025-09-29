import { Link } from 'react-router-dom'
import citiesData from '../data/cities.json'

function PopularCities() {
  const popularCities = citiesData.filter(city =>
    ['Samarqand', 'Toshkent', 'Buxoro'].includes(city.name)
  )

  return (
    <section className="popular-cities-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gradient-text">Mashhur shaharlar</h2>
          <p className="section-subtitle">
            O'zbekistonning eng go'zal va tarixiy shaharlarini kashf eting
          </p>
        </div>

        <div className="cities-grid-modern">
          {popularCities.map((city, index) => (
            <Link
              key={city.id}
              to={`/city/${city.id}`}
              className="city-card-modern animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="city-image-wrapper">
                <img
                  src={city.image}
                  alt={city.name}
                  className="city-image-modern"
                />
                <div className="city-gradient-overlay"></div>
              </div>

              <div className="city-content">
                <h3 className="city-title-modern">{city.name}</h3>
                <p className="city-description-modern">{city.description}</p>
                <div className="city-bottom-section">
                  <div className="city-badge">
                    📍 {city.historicalPlaces.length} ta tarixiy joy
                  </div>
                  <div className="city-action">
                    <span className="action-text">
                      Batafsil ko'rish
                      <svg className="action-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="view-all-section">
          <Link to="/explore" className="view-all-btn">
            <span>Barcha shaharlarni ko'rish</span>
            <svg className="view-all-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PopularCities