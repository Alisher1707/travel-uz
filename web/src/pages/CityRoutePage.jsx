import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import citiesData from '../data/cities.json'

function CityRoutePage() {
  const { cityId } = useParams()
  const navigate = useNavigate()
  const [city, setCity] = useState(null)
  const [routePlan, setRoutePlan] = useState([])

  useEffect(() => {
    const foundCity = citiesData.find(c => c.id === parseInt(cityId))
    if (foundCity) {
      setCity(foundCity)
      generateRoutePlan(foundCity)
    } else {
      navigate('/')
    }
  }, [cityId, navigate])

  const generateRoutePlan = (city) => {
    const places = city.historicalPlaces
    const plan = []

    places.forEach((place, index) => {
      plan.push({
        day: index + 1,
        place: place,
        activities: [
          'Tarixiy joy bilan tanishish',
          'Foto suratga olish',
          'Mahalliy gid bilan suhbat',
          'Atrofdagi joylarni ko\'rish'
        ],
        tips: [
          'Ertalab tashrif buyuring',
          'Qulay kiyim kiyib boring',
          'Suv va gazaklar olib keling'
        ]
      })
    })

    setRoutePlan(plan)
  }

  if (!city) {
    return <div className="loading">Yuklanmoqda...</div>
  }

  return (
    <div className="city-route-page">
      {/* Header */}
      <div className="route-header">
        <button
          className="back-button"
          onClick={() => navigate(`/city/${cityId}`)}
        >
          ← Shahar sahifasiga qaytish
        </button>

        <div className="route-hero">
          <h1 className="route-title">{city.name} uchun sayohat marshruti</h1>
          <p className="route-subtitle">
            {city.historicalPlaces.length} kun davomida {city.name}ning eng go'zal joylarini kashf eting
          </p>
          <div className="route-stats">
            <span className="route-stat">📅 {city.historicalPlaces.length} kun</span>
            <span className="route-stat">🏛️ {city.historicalPlaces.length} ta joy</span>
            <span className="route-stat">⭐ Professional marshrut</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="route-timeline-container">
        <div className="timeline-line"></div>

        {routePlan.map((dayPlan, index) => (
          <div
            key={dayPlan.day}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-marker">
              <span className="day-number">{dayPlan.day}</span>
            </div>

            <div className="timeline-card">
              <div className="timeline-card-header">
                <h3 className="timeline-day">Kun {dayPlan.day}</h3>
                <h4 className="timeline-place-name">{dayPlan.place.name}</h4>
              </div>

              <div className="timeline-card-content">
                <div className="timeline-image-section">
                  <img
                    src={dayPlan.place.image}
                    alt={dayPlan.place.name}
                    className="timeline-image"
                  />
                  <div className="timeline-place-info">
                    <p className="timeline-description">{dayPlan.place.description}</p>
                    <div className="timeline-meta">
                      <span className="timeline-year">📅 {dayPlan.place.yearBuilt}</span>
                      <span className="timeline-category">🏷️ {dayPlan.place.category}</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-details">
                  <div className="timeline-section">
                    <h5>📋 Kun davomidagi faoliyatlar:</h5>
                    <ul className="timeline-activities">
                      {dayPlan.activities.map((activity, actIndex) => (
                        <li key={actIndex}>{activity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="timeline-section">
                    <h5>💡 Foydali maslahatlar:</h5>
                    <ul className="timeline-tips">
                      {dayPlan.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="route-actions">
        <button
          className="route-action-btn primary"
          onClick={() => {
            // TODO: Implement download functionality
            console.log('Download route plan')
          }}
        >
          📥 Marshrutni yuklab olish
        </button>
        <button
          className="route-action-btn secondary"
          onClick={() => navigate('/route')}
        >
          📝 Boshqa marshrut tuzish
        </button>
      </div>
    </div>
  )
}

export default CityRoutePage