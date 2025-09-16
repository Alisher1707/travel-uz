import React, { useState } from 'react'
import AnimatedCard from './AnimatedCard'
import './RoutesPage.css'

const RoutesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')

  const categories = [
    { id: 'all', name: 'Barchasi', icon: '🌍' },
    { id: 'historical', name: 'Tarixiy', icon: '🏛️' },
    { id: 'cultural', name: 'Madaniy', icon: '🎭' },
    { id: 'adventure', name: 'Sarguzasht', icon: '🎒' },
    { id: 'family', name: 'Oilaviy', icon: '👨‍👩‍👧‍👦' },
    { id: 'romantic', name: 'Romantik', icon: '💑' }
  ]

  const routes = [
    {
      id: 1,
      name: 'Klassik Samarqand Safari',
      description: 'Registon, Bibihanim, Shohizinda - barcha asosiy diqqatga sazovor joylar',
      duration: '1 kun',
      difficulty: 'Oson',
      price: '150,000 so\'m',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Registon maydoni', 'Gur-Emir maqbarasi', 'Bibihanim masjidi', 'Afrosiyob muzeyi'],
      rating: 4.8,
      reviews: 1245
    },
    {
      id: 2,
      name: 'Temuriylar merosi',
      description: 'Amir Temur va uning avlodlari yaratgan me\'moriy yodgorliklarni kashf eting',
      duration: '2 kun',
      difficulty: 'O\'rtacha',
      price: '280,000 so\'m',
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1570789210967-2cff88c7ee8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Gur-Emir', 'Ruhobod', 'Oqsaroy', 'Ulug\'bek rasadxonasi', 'Ishrotxona'],
      rating: 4.9,
      reviews: 856
    },
    {
      id: 3,
      name: 'Islom madaniyati sayohati',
      description: 'Muqaddas ziyoratgohlar va diniy yodgorliklarni ziyorat qiling',
      duration: '1 kun',
      difficulty: 'Oson',
      price: '120,000 so\'m',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1590759668628-05b2fc5c0fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Shohizinda', 'Hazrati Xizr', 'Doniyor payg\'ambar maqbarasi', 'Xoja Doniyor masjidi'],
      rating: 4.7,
      reviews: 642
    },
    {
      id: 4,
      name: 'Oilaviy dam olish',
      description: 'Bolalar bilan birga zavqli va ta\'limli sayohat',
      duration: '3 soat',
      difficulty: 'Oson',
      price: '80,000 so\'m',
      category: 'family',
      image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Afrosiyob muzeyi', 'Samarqand shahar muzeyi', 'Chorsu bozori', 'Siob bozori'],
      rating: 4.5,
      reviews: 423
    },
    {
      id: 5,
      name: 'Romantik kechqurun',
      description: 'Sevgilisiz birga o\'tkazish uchun maxsus marshrutlar',
      duration: '4 soat',
      difficulty: 'Oson',
      price: '200,000 so\'m',
      category: 'romantic',
      image: 'https://images.unsplash.com/photo-1585858229071-d59c854c2d7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Registon (kechqurun)', 'Hazrati Xizr', 'Samarqand restoranlari', 'Panorama nuqtalar'],
      rating: 4.6,
      reviews: 789
    },
    {
      id: 6,
      name: 'Fotografiya safari',
      description: 'Professional fotograf bilan eng go\'zal joylarni suratga oling',
      duration: '6 soat',
      difficulty: 'O\'rtacha',
      price: '350,000 so\'m',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Registon', 'Shohizinda', 'Bibihanim', 'Afrosiyob tepaligi', 'Eski shahar ko\'chalari'],
      rating: 4.8,
      reviews: 567
    },
    {
      id: 7,
      name: 'Gastrotourism - ta\'m safari',
      description: 'O\'zbek oshpazligini tatib ko\'ring va pishirishni o\'rganing',
      duration: '5 soat',
      difficulty: 'Oson',
      price: '180,000 so\'m',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Siob bozori', 'Oshpazlik masterklassi', 'Milliy oshxona', 'Choyxonalar'],
      rating: 4.7,
      reviews: 934
    },
    {
      id: 8,
      name: 'Keng qamrovli safari',
      description: 'Samarqandning barcha jihatlari - 3 kunlik to\'liq sayohat',
      duration: '3 kun',
      difficulty: 'Qiyin',
      price: '450,000 so\'m',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      places: ['Barcha tarixiy joylar', 'Muzeylar', 'Bozorlar', 'Hunarmandchilik ustaxonalari', 'Atrofdagi qishloqlar'],
      rating: 4.9,
      reviews: 345
    }
  ]

  const filteredRoutes = routes.filter(route => {
    const matchesCategory = selectedCategory === 'all' || route.category === selectedCategory
    const matchesDuration = selectedDuration === 'all' || route.duration.includes(selectedDuration)
    return matchesCategory && matchesDuration
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Oson': return '#10b981'
      case 'O\'rtacha': return '#f59e0b'
      case 'Qiyin': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className="routes-page">
      <div className="routes-header">
        <div className="header-content">
          <h1>Marshrutlar</h1>
          <p>Samarqandda unutilmas sayohatlar uchun eng yaxshi yo\'nalishlar</p>
        </div>
      </div>

      <div className="filters-section">
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

        <div className="duration-filters">
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="duration-select"
          >
            <option value="all">Barcha davomiylik</option>
            <option value="soat">Bir necha soat</option>
            <option value="1 kun">1 kun</option>
            <option value="2">2+ kun</option>
          </select>
        </div>
      </div>

      <div className="routes-grid">
        {filteredRoutes.map(route => (
          <AnimatedCard key={route.id} className="route-card">
            <div className="route-image">
              <img src={route.image} alt={route.name} />
              <div className="route-overlay">
                <div className="route-badges">
                  <span className="duration-badge">{route.duration}</span>
                  <span
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(route.difficulty) }}
                  >
                    {route.difficulty}
                  </span>
                </div>
                <div className="route-price">{route.price}</div>
              </div>
            </div>

            <div className="route-details">
              <h3>{route.name}</h3>
              <p className="route-description">{route.description}</p>

              <div className="route-rating">
                <div className="stars">
                  ⭐ {route.rating}
                </div>
                <span className="reviews">({route.reviews} sharh)</span>
              </div>

              <div className="route-places">
                <h4>Asosiy joylar:</h4>
                <div className="places-list">
                  {route.places.slice(0, 3).map((place, idx) => (
                    <span key={idx} className="place-tag">
                      {place}
                    </span>
                  ))}
                  {route.places.length > 3 && (
                    <span className="more-places">
                      +{route.places.length - 3} boshqa
                    </span>
                  )}
                </div>
              </div>

              <div className="route-actions">
                <button className="details-btn">
                  Batafsil ma'lumot
                </button>
                <button className="book-btn">
                  Bron qilish
                </button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🗺️</div>
          <h3>Hech qanday marshrut topilmadi</h3>
          <p>Filter shartlarini o'zgartirib ko'ring</p>
        </div>
      )}

      <div className="route-benefits">
        <h2>Bizning marshrutlarimizning afzalliklari</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">👨‍🏫</div>
            <h4>Professional gidlar</h4>
            <p>Har bir marshrut uchun tajribali va bilimli gidlar</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🚐</div>
            <h4>Qulay transport</h4>
            <p>Zamonaviy va xavfsiz transport vositalari</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🎫</div>
            <h4>Kirish chiptalar</h4>
            <p>Barcha muzey va yodgorliklarga kirish chiptalar dahil</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">📱</div>
            <h4>Mobil qo'llab-quvvatlash</h4>
            <p>Sayohat davomida 24/7 onlayn yordam</p>
          </div>
        </div>
      </div>

      <div className="custom-route">
        <div className="custom-content">
          <h3>Shaxsiy marshrut yaratmoqchimisiz?</h3>
          <p>Bizning mutaxassislarimiz sizning xohishingiz bo'yicha individual marshrutlar tuzishadi</p>
          <button className="custom-btn">
            Maxsus marshrut buyurtma berish
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoutesPage