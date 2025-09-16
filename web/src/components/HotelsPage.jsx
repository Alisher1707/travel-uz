import React, { useState } from 'react'
import AnimatedCard from './AnimatedCard'
import './HotelsPage.css'

const HotelsPage = ({ hotels = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'Barchasi', icon: '🏨' },
    { id: 'luxury', name: '5 Yulduzli', icon: '⭐' },
    { id: 'business', name: 'Biznes', icon: '💼' },
    { id: 'budget', name: 'Arzon', icon: '💰' },
    { id: 'boutique', name: 'Boutique', icon: '🎨' }
  ]

  const priceRanges = [
    { id: 'all', name: 'Barcha narxlar' },
    { id: 'budget', name: '100,000 - 300,000 so\'m', min: 100000, max: 300000 },
    { id: 'medium', name: '300,000 - 600,000 so\'m', min: 300000, max: 600000 },
    { id: 'luxury', name: '600,000+ so\'m', min: 600000, max: Infinity }
  ]

  // Extended hotel data
  const allHotels = [
    {
      id: 3,
      name: 'Grand Samarkand Superior',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '750,000',
      rating: 4.9,
      location: 'Registon ko\'chasi',
      category: 'luxury',
      amenities: ['WiFi', 'Spa', 'Pool', 'Restaurant', 'Gym', 'Parking', 'Room Service']
    },
    {
      id: 4,
      name: 'Hotel Dilshoda',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '180,000',
      rating: 4.2,
      location: 'Shohimardon ko\'chasi',
      category: 'budget',
      amenities: ['WiFi', 'Restoran', 'Konditsioner']
    },
    {
      id: 5,
      name: 'Samarkand Palace',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '650,000',
      rating: 4.7,
      location: 'Universitetskaya ko\'chasi',
      category: 'luxury',
      amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Conference Hall', 'Parking']
    },
    {
      id: 6,
      name: 'Business Hotel Tashkent',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '420,000',
      rating: 4.4,
      location: 'Mustaqillik ko\'chasi',
      category: 'business',
      amenities: ['WiFi', 'Business Center', 'Conference Room', 'Parking', 'Restaurant']
    },
    {
      id: 7,
      name: 'Boutique Heritage',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '380,000',
      rating: 4.6,
      location: 'Eski shahar',
      category: 'boutique',
      amenities: ['WiFi', 'Traditional Decor', 'Garden', 'Restaurant', 'Cultural Tours']
    },
    {
      id: 8,
      name: 'Hotel Shodlik Palace',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '850,000',
      rating: 4.8,
      location: 'Amir Temur ko\'chasi',
      category: 'luxury',
      amenities: ['WiFi', 'Spa', 'Pool', 'Multiple Restaurants', 'Gym', 'Valet Parking', 'Concierge']
    },
    {
      id: 9,
      name: 'Orient Star Hotel',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '320,000',
      rating: 4.3,
      location: 'Siab bozori yaqinida',
      category: 'business',
      amenities: ['WiFi', 'Restaurant', 'Meeting Room', 'Airport Transfer']
    },
    {
      id: 10,
      name: 'Malika Prime Hotel',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '280,000',
      rating: 4.4,
      location: 'Shahar markazi',
      category: 'boutique',
      amenities: ['WiFi', 'Traditional Restaurant', 'Garden View', 'Cultural Programs']
    }
  ]

  const filteredHotels = allHotels.filter(hotel => {
    const matchesCategory = selectedCategory === 'all' || hotel.category === selectedCategory
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesPrice = true
    if (selectedPriceRange !== 'all') {
      const range = priceRanges.find(r => r.id === selectedPriceRange)
      const price = parseInt(hotel.price.replace(/[^0-9]/g, ''))
      matchesPrice = price >= range.min && price <= range.max
    }

    return matchesCategory && matchesSearch && matchesPrice
  })

  return (
    <div className="hotels-page">
      <div className="hotels-header">
        <div className="header-content">
          <h1>Mehmonxonalar</h1>
          <p>Samarqandda eng yaxshi mehmonxonalarni kashf eting</p>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Mehmonxona nomi bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="filter-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="price-filters">
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="price-select"
          >
            {priceRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="hotels-grid">
        {filteredHotels.map(hotel => (
          <AnimatedCard key={hotel.id} className="hotel-card-full">
            <div className="hotel-image-wrapper">
              <img src={hotel.image} alt={hotel.name} />
              <div className="hotel-overlay">
                <div className="hotel-rating">
                  ⭐ {hotel.rating}
                </div>
                <div className="hotel-price">
                  {hotel.price} so'm/kecha
                </div>
              </div>
            </div>

            <div className="hotel-details">
              <h3>{hotel.name}</h3>
              <p className="location">📍 {hotel.location}</p>

              <div className="amenities-list">
                {(hotel.amenities || []).slice(0, 4).map((amenity, idx) => (
                  <span key={idx} className="amenity-chip">
                    {amenity}
                  </span>
                ))}
                {(hotel.amenities || []).length > 4 && (
                  <span className="more-amenities">
                    +{(hotel.amenities || []).length - 4} boshqa
                  </span>
                )}
              </div>

              <div className="hotel-actions">
                <button className="view-details-btn">
                  Batafsil ko'rish
                </button>
                <button className="book-now-btn">
                  Hozir bron qilish
                </button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🏨</div>
          <h3>Hech qanday mehmonxona topilmadi</h3>
          <p>Qidiruv shartlarini o'zgartirib ko'ring</p>
        </div>
      )}

      <div className="booking-benefits">
        <h2>Nima uchun bizdan bron qilish kerak?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">💰</div>
            <h4>Eng arzon narxlar</h4>
            <p>Boshqa saytlardagi narxlarni taqqoslang - biz har doim arzonroq</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔒</div>
            <h4>Xavfsiz to'lov</h4>
            <p>Barcha to'lovlar SSL shifrlash orqali himoyalangan</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">📞</div>
            <h4>24/7 yordam</h4>
            <p>Har qanday savol yoki muammo bo'yicha yordam olasiz</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🚫</div>
            <h4>Bekor qilish bepul</h4>
            <p>Ko'pgina mehmonxonalarni bepul bekor qilish mumkin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelsPage