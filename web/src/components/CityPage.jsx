import React from 'react'
import CityBanner from './CityBanner'
import CityMap from './CityMap'
import HistoricalPlaces from './HistoricalPlaces'
import HotelsSlider from './HotelsSlider'
import './CityPage.css'

const CityPage = ({ cityName = 'Samarqand' }) => {
  const cityData = {
    samarqand: {
      name: 'Samarqand',
      banner: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      description: 'Ulug\'bek va Amir Temur davridagi buyuk shahar',
      coordinates: { lat: 39.6542, lng: 66.9597 },
      historicalPlaces: [
        {
          id: 1,
          name: 'Registon maydoni',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Dunyoning eng go\'zal madrasalar majmuasi',
          rating: 4.9,
          coordinates: { lat: 39.6547, lng: 66.9750 }
        },
        {
          id: 2,
          name: 'Gur-Emir maqbarasi',
          image: 'https://images.unsplash.com/photo-1591123720526-94c4002817b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Amir Temur va uning avlodlarining qabristan',
          rating: 4.8,
          coordinates: { lat: 39.6484, lng: 66.9631 }
        },
        {
          id: 3,
          name: 'Bibixonim masjidi',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'O\'rta Osiyoning eng katta masjidi',
          rating: 4.7,
          coordinates: { lat: 39.6549, lng: 66.9794 }
        },
        {
          id: 4,
          name: 'Ulug\'bek rasadxonasi',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'XV asrdagi astronomiya markazi',
          rating: 4.6,
          coordinates: { lat: 39.6751, lng: 66.9053 }
        },
        {
          id: 5,
          name: 'Shohizinda maqbarasi',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Muqaddas ziyoratgoh va nekropol',
          rating: 4.8,
          coordinates: { lat: 39.6660, lng: 66.9876 }
        },
        {
          id: 6,
          name: 'Afrosiyob muzey',
          image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: 'Qadimgi Samarqand tarixi',
          rating: 4.5,
          coordinates: { lat: 39.6798, lng: 66.9570 }
        }
      ],
      hotels: [
        {
          id: 1,
          name: 'Registon Hotel',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          price: '350,000',
          amenities: ['Wi-Fi', 'Restoran', 'Konditsioner', 'Parking']
        },
        {
          id: 2,
          name: 'Samarkand Plaza',
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          price: '280,000',
          amenities: ['Spa', 'Suzish havzasi', 'Gym', 'Restoran']
        },
        {
          id: 3,
          name: 'Bakhtiyor Hotel',
          image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.4,
          price: '180,000',
          amenities: ['Wi-Fi', 'Nonushta', 'Transfer']
        },
        {
          id: 4,
          name: 'Dilshoda Hotel',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.2,
          price: '120,000',
          amenities: ['Wi-Fi', 'Konditsioner', 'Parking']
        },
        {
          id: 5,
          name: 'Grand Samarkand',
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          price: '450,000',
          amenities: ['Luxury Suite', 'Spa', 'Restoran', 'Concierge']
        }
      ]
    }
  }

  const city = cityData[cityName.toLowerCase()] || cityData.samarqand

  return (
    <div className="city-page">
      <CityBanner city={city} />
      <div className="city-content">
        <CityMap city={city} />
        <HistoricalPlaces places={city.historicalPlaces} />
        <HotelsSlider hotels={city.hotels} />
      </div>
    </div>
  )
}

export default CityPage