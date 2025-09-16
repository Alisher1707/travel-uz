import React, { useState, useEffect } from 'react'
import SwipeableCards from './SwipeableCards'
import AnimatedCard from './AnimatedCard'
import './HotelsSlider.css'

const HotelsSlider = ({ hotels = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hotels.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [hotels.length, isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % hotels.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + hotels.length) % hotels.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const getVisibleHotels = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % hotels.length
      visible.push(hotels[index])
    }
    return visible
  }

  return (
    <section id="mehmonxonalar" className="hotels-slider">
      <div className="section-header">
        <h2>Mehmonxonalar</h2>
        <p>Samarqandda eng yaxshi mehmonxonalarni toping</p>
      </div>

      <SwipeableCards className="hotels-swiper" itemsPerView={window.innerWidth > 768 ? 3 : 1}>
        {hotels.map((hotel, index) => (
          <AnimatedCard
            key={hotel.id}
            className="hotel-card card-hover"
          >
            <div className="hotel-image">
              <img src={hotel.image} alt={hotel.name} />
              <div className="hotel-badge">
                <span>⭐ {hotel.rating}</span>
              </div>
              <div className="price-badge">
                {hotel.price} so'm/kecha
              </div>
            </div>

            <div className="hotel-info">
              <h3>{hotel.name}</h3>

              <div className="amenities">
                {(hotel.amenities || []).slice(0, 3).map((amenity, idx) => (
                  <span key={idx} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
                {(hotel.amenities || []).length > 3 && (
                  <span className="more-amenities">
                    +{(hotel.amenities || []).length - 3}
                  </span>
                )}
              </div>

              <div className="hotel-actions">
                <button className="book-btn">
                  Bron qilish
                </button>
                <button className="details-btn">
                  Batafsil
                </button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </SwipeableCards>


      <div className="hotels-features">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🏨</div>
            <h4>Luxury mehmonxonalar</h4>
            <p>5 yulduzli xizmat va qulayliklar</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📍</div>
            <h4>Markaziy joylashuv</h4>
            <p>Barcha diqqatga sazovor joylar yaqinida</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💳</div>
            <h4>Eng yaxshi narxlar</h4>
            <p>Kafolatli eng arzon narxlar</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h4>Xavfsiz to'lov</h4>
            <p>100% xavfsiz onlayn to'lov tizimi</p>
          </div>
        </div>
      </div>

      <div className="booking-help">
        <div className="help-content">
          <div className="help-text">
            <h3>Mehmonxona tanlashda yordam kerakmi?</h3>
            <p>Bizning mutaxassislarimiz sizga eng mos mehmonxonani tanlashda yordam berishadi</p>
          </div>
          <button className="help-btn">
            Maslahat olish
            <span>📞</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HotelsSlider