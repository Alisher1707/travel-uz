import React from 'react'
import SwipeableCards from './SwipeableCards'
import AnimatedCard from './AnimatedCard'
import './TopCities.css'

const TopCities = () => {
  const cities = [
    {
      id: 1,
      name: 'Samarqand',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Registon maydoni va ajoyib madrasalar',
      attractions: '15+ diqqatga sazovor joylar',
      rating: 4.9,
      price: 'dan 250,000 so\'m'
    },
    {
      id: 2,
      name: 'Buxoro',
      image: 'https://images.unsplash.com/photo-1591123720526-94c4002817b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Qadimiy shahar va Islom me\'morchiligi',
      attractions: '12+ diqqatga sazovor joylar',
      rating: 4.8,
      price: 'dan 200,000 so\'m'
    },
    {
      id: 3,
      name: 'Xiva',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Ichan Qal\'a va tarixiy yodgorliklar',
      attractions: '10+ diqqatga sazovor joylar',
      rating: 4.7,
      price: 'dan 180,000 so\'m'
    },
    {
      id: 4,
      name: 'Toshkent',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Zamonaviy poytaxt va madaniy markaz',
      attractions: '20+ diqqatga sazovor joylar',
      rating: 4.6,
      price: 'dan 300,000 so\'m'
    },
    {
      id: 5,
      name: 'Farg\'ona',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Hunarmandchilik va an\'anaviy san\'at',
      attractions: '8+ diqqatga sazovor joylar',
      rating: 4.5,
      price: 'dan 150,000 so\'m'
    },
    {
      id: 6,
      name: 'Nukus',
      image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Savitskiy muzeyi va Orol dengizi',
      attractions: '6+ diqqatga sazovor joylar',
      rating: 4.4,
      price: 'dan 120,000 so\'m'
    }
  ]

  return (
    <section className="top-cities">
      <div className="container">
        <div className="section-header">
          <h2>Top shaharlar</h2>
          <p>O'zbekistonning eng mashhur sayohat yo'nalishlarini kashf eting</p>
        </div>

        <SwipeableCards className="cities-swiper" itemsPerView={window.innerWidth > 768 ? 3 : 1}>
          {cities.map(city => (
            <AnimatedCard key={city.id} className="city-card card-hover">
              <div className="city-image">
                <img src={city.image} alt={city.name} />
                <div className="city-overlay">
                  <button className="view-details-btn">Batafsil ko'rish</button>
                </div>
              </div>

              <div className="city-info">
                <div className="city-header">
                  <h3>{city.name}</h3>
                  <div className="city-rating">
                    <span className="star">⭐</span>
                    <span>{city.rating}</span>
                  </div>
                </div>

                <p className="city-description">{city.description}</p>

                <div className="city-meta">
                  <span className="attractions">{city.attractions}</span>
                  <span className="price">{city.price}</span>
                </div>

                <button className="book-btn">
                  Bron qilish
                </button>
              </div>
            </AnimatedCard>
          ))}
        </SwipeableCards>

        <div className="view-all">
          <button className="view-all-btn">
            Barcha shaharlarni ko'rish
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopCities