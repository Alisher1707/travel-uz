import React, { useState } from 'react'
import SwipeableCards from './SwipeableCards'
import AnimatedCard from './AnimatedCard'
import TypingEffect from './TypingEffect'
import './AIResults.css'

const AIResults = ({ recommendations, formData, onNewSearch }) => {
  const [selectedRoute, setSelectedRoute] = useState(null)

  const handleSelectRoute = (route) => {
    setSelectedRoute(route)
  }

  const handleBookRoute = (route) => {
    alert(`"${route.title}" marshruti tanlandi! Bron qilish sahifasiga o'tish...`)
  }

  return (
    <div className="ai-results">
      <div className="results-header">
        <div className="header-content">
          <h2>🎯 AI tomonidan tayyorlangan marshrutlar</h2>
          <TypingEffect
            text={`Sizning parametrlaringizga mos ${recommendations.length} ta marshrut topildi`}
            speed={30}
            className="results-description"
          />

          <div className="search-summary">
            <div className="summary-item">
              <span className="summary-icon">📅</span>
              <span>{formData.days} kun</span>
            </div>
            <div className="summary-item">
              <span className="summary-icon">💰</span>
              <span>{formData.budget === 'past' ? 'Past' : formData.budget === 'orta' ? 'O\'rta' : 'Yuqori'} byudjet</span>
            </div>
            <div className="summary-item">
              <span className="summary-icon">🌤️</span>
              <span>{formData.season === 'bahor' ? 'Bahor' : formData.season === 'yoz' ? 'Yoz' : formData.season === 'kuz' ? 'Kuz' : 'Qish'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-icon">👥</span>
              <span>{formData.groupSize}</span>
            </div>
          </div>

          <button className="new-search-btn" onClick={onNewSearch}>
            <span>🔄</span>
            Yangi qidiruv
          </button>
        </div>
      </div>

      <SwipeableCards className="recommendations-swiper" itemsPerView={window.innerWidth > 768 ? 2 : 1}>
        {recommendations.map((route) => (
          <AnimatedCard
            key={route.id}
            className={`route-card card-hover ${selectedRoute?.id === route.id ? 'selected' : ''}`}
            onClick={() => handleSelectRoute(route)}
          >
            <div className="card-header">
              <img src={route.image} alt={route.title} />
              <div className="ai-badge">
                <span>🤖</span>
                AI tavsiya
              </div>
              <div className="match-score">
                {route.matchScore}% mos
              </div>
            </div>

            <div className="card-content">
              <div className="route-title">
                <h3>{route.title}</h3>
                <div className="rating">
                  <span>⭐</span>
                  <span>{route.rating}</span>
                </div>
              </div>

              <p className="route-description">{route.description}</p>

              <div className="route-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span>{route.days} kun</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span>{route.totalCost.toLocaleString()} so'm</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>{route.places.length} joy</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⭐</span>
                  <span>{route.difficulty}</span>
                </div>
              </div>

              {route.seasonBonus && (
                <div className="season-bonus">
                  <span className="bonus-icon">🎁</span>
                  <span>{route.seasonBonus}</span>
                </div>
              )}

              <div className="route-highlights">
                <h4>Asosiy xususiyatlar:</h4>
                <div className="highlights-list">
                  {route.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="route-places">
                <h4>Tashrif buyuriladigan joylar:</h4>
                <div className="places-list">
                  {route.places.slice(0, 3).map((place, index) => (
                    <span key={index} className="place-tag">
                      {place}
                    </span>
                  ))}
                  {route.places.length > 3 && (
                    <span className="more-places">
                      +{route.places.length - 3} ta yana
                    </span>
                  )}
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="select-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectRoute(route)
                  }}
                >
                  {selectedRoute?.id === route.id ? '✓ Tanlandi' : 'Tanlash'}
                </button>
                <button
                  className="book-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookRoute(route)
                  }}
                >
                  <span>🚀</span>
                  Bron qilish
                </button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </SwipeableCards>

      {selectedRoute && (
        <div className="selected-route-details">
          <div className="details-card">
            <h3>Tanlangan marshrut haqida batafsil</h3>
            <div className="detailed-info">
              <div className="info-section">
                <h4>📍 Barcha joylar:</h4>
                <ul>
                  {selectedRoute.places.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h4>💡 AI tavsiyalari:</h4>
                <ul>
                  <li>Eng yaxshi vaqt: Erta ertalab boshlash tavsiya etiladi</li>
                  <li>Kiyim: Qulay poyabzal va qopqoq kerak</li>
                  <li>Pul: Naqd pul olib yuring, ba'zi joylar karta qabul qilmaydi</li>
                  <li>Ovqat: Mahalliy oshxonani sinab ko'ring</li>
                </ul>
              </div>

              <div className="info-section">
                <h4>⚠️ Muhim eslatmalar:</h4>
                <ul>
                  <li>Kirish chiptalarini oldindan sotib olish tavsiya etiladi</li>
                  <li>Juma kuni ba'zi joylar yopiq bo'ladi</li>
                  <li>Fotografiya uchun qo'shimcha to'lov kerak bo'lishi mumkin</li>
                </ul>
              </div>
            </div>

            <div className="final-actions">
              <button
                className="final-book-btn"
                onClick={() => handleBookRoute(selectedRoute)}
              >
                <span>🎯</span>
                Bu marshrutni bron qilish
              </button>
              <button
                className="compare-btn"
                onClick={() => setSelectedRoute(null)}
              >
                <span>🔄</span>
                Boshqa variantlarni ko'rish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ai-explanation">
        <div className="explanation-card">
          <h3>🤖 AI qanday qilib bu marshrutlarni tanladi?</h3>
          <div className="explanation-grid">
            <div className="explanation-item">
              <div className="explanation-icon">📊</div>
              <div className="explanation-content">
                <h4>Ma'lumotlar tahlili</h4>
                <p>Sizning parametrlaringiz asosida minglab marshrut variantlari tahlil qilindi</p>
              </div>
            </div>
            <div className="explanation-item">
              <div className="explanation-icon">⭐</div>
              <div className="explanation-content">
                <h4>Reyting va sharh</h4>
                <p>Boshqa sayohatchilarning reytinglari va sharhlari hisobga olindi</p>
              </div>
            </div>
            <div className="explanation-item">
              <div className="explanation-icon">🌤️</div>
              <div className="explanation-content">
                <h4>Mavsum mosligi</h4>
                <p>Tanlangan mavsum uchun eng mos joylar va faoliyatlar tanlab olindi</p>
              </div>
            </div>
            <div className="explanation-item">
              <div className="explanation-icon">💰</div>
              <div className="explanation-content">
                <h4>Byudjet optimizatsiyasi</h4>
                <p>Belgilangan byudjet doirasida eng ko'p tajribani olish uchun optimallashtirdi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIResults