import React, { useState } from 'react'
import ItineraryHeader from './ItineraryHeader'
import Timeline from './Timeline'
import RouteMap from './RouteMap'
import './ItineraryPage.css'

const ItineraryPage = () => {
  const [selectedDay, setSelectedDay] = useState(1)

  const itineraryData = {
    title: 'Samarqand - 3 kunlik sayohat',
    duration: '3 kun / 2 kecha',
    totalDistance: '45 km',
    difficulty: 'Oson',
    bestTime: 'Mart - Oktabr',
    days: [
      {
        day: 1,
        title: 'Tarixiy markazni kashf etish',
        description: 'Registon maydoni va atrofdagi madrasalarni ko\'rish',
        duration: '8 soat',
        walkingTime: '2 soat',
        places: [
          {
            id: 1,
            name: 'Registon maydoni',
            time: '09:00 - 11:30',
            duration: '2.5 soat',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Ulug\'bek, Sherdor va Tillakori madrasalari',
            tips: 'Erta borib, fotografiya uchun eng yaxshi vaqt',
            entrance: '30,000 so\'m',
            coordinates: { lat: 39.6547, lng: 66.9750 }
          },
          {
            id: 2,
            name: 'Gur-Emir maqbarasi',
            time: '12:00 - 13:30',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1591123720526-94c4002817b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Amir Temur va uning nasillarining maqbarasi',
            tips: 'Ichkaridagi zilzila me\'morchiligiga e\'tibor bering',
            entrance: '15,000 so\'m',
            coordinates: { lat: 39.6484, lng: 66.9631 }
          },
          {
            id: 3,
            name: 'Bibixonim masjidi',
            time: '14:30 - 16:00',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'O\'rta Osiyodagi eng katta masjid',
            tips: 'Minoraga chiqib panorama manzarasini tomosha qiling',
            entrance: '15,000 so\'m',
            coordinates: { lat: 39.6549, lng: 66.9794 }
          },
          {
            id: 4,
            name: 'Siyob bozori',
            time: '16:30 - 18:00',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'An\'anaviy mahalliy bozor va hunarmandchilik',
            tips: 'Mahalliy non va mevalarni ta\'tab ko\'ring',
            entrance: 'Bepul',
            coordinates: { lat: 39.6565, lng: 66.9745 }
          }
        ]
      },
      {
        day: 2,
        title: 'Qadimiy me\'morchilik va madaniyat',
        description: 'Afrosiyob va Ulug\'bek rasadxonasini tashrif buyurish',
        duration: '7 soat',
        walkingTime: '1.5 soat',
        places: [
          {
            id: 5,
            name: 'Afrosiyob muzey',
            time: '09:00 - 11:00',
            duration: '2 soat',
            image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Qadimgi Samarqand tarixi va arxeologiya',
            tips: 'Audio gid olishni unutmang',
            entrance: '20,000 so\'m',
            coordinates: { lat: 39.6798, lng: 66.9570 }
          },
          {
            id: 6,
            name: 'Ulug\'bek rasadxonasi',
            time: '11:30 - 13:00',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'XV asrning mashhur astronomiya markazi',
            tips: 'Sextantni ko\'rishni unutmang',
            entrance: '12,000 so\'m',
            coordinates: { lat: 39.6751, lng: 66.9053 }
          },
          {
            id: 7,
            name: 'Shohizinda maqbarasi',
            time: '14:00 - 16:30',
            duration: '2.5 soat',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Muqaddas ziyoratgoh va nekropol majmuasi',
            tips: 'Zinapoyani sanashni unutmang - 39 pog\'ona',
            entrance: '15,000 so\'m',
            coordinates: { lat: 39.6660, lng: 66.9876 }
          },
          {
            id: 8,
            name: 'Hazrat Hizr masjidi',
            time: '17:00 - 18:00',
            duration: '1 soat',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Shahar manzarasini ko\'rish uchun eng yaxshi joy',
            tips: 'Quyosh botishini tomosha qiling',
            entrance: 'Bepul',
            coordinates: { lat: 39.6634, lng: 66.9812 }
          }
        ]
      },
      {
        day: 3,
        title: 'Hunarmandchilik va xarid qilish',
        description: 'Mahalliy ustaxonalar va sovg\'a do\'konlari',
        duration: '6 soat',
        walkingTime: '1 soat',
        places: [
          {
            id: 9,
            name: 'Qog\'oz zavodi',
            time: '09:00 - 10:30',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'An\'anaviy usulda qog\'oz tayyorlash',
            tips: 'O\'zingiz qog\'oz tayyorlashga urinib ko\'ring',
            entrance: '25,000 so\'m',
            coordinates: { lat: 39.6520, lng: 66.9580 }
          },
          {
            id: 10,
            name: 'Abr fabrikasi',
            time: '11:00 - 12:30',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1591123720526-94c4002817b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Ipak to\'qish va rang berish jarayoni',
            tips: 'Mahalliy ipak mahsulotlarini xarid qiling',
            entrance: '20,000 so\'m',
            coordinates: { lat: 39.6489, lng: 66.9645 }
          },
          {
            id: 11,
            name: 'Hunarmandchilik markazi',
            time: '13:30 - 15:30',
            duration: '2 soat',
            image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Turli xil hunarmandchilik mahsulotlari',
            tips: 'Kulolchilik masterklassiga qatnashing',
            entrance: '15,000 so\'m',
            coordinates: { lat: 39.6598, lng: 66.9712 }
          },
          {
            id: 12,
            name: 'Chorsu',
            time: '16:00 - 17:30',
            duration: '1.5 soat',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Sovg\'alar va esdalik buyumlari',
            tips: 'Narxni kelishib oling',
            entrance: 'Bepul',
            coordinates: { lat: 39.6578, lng: 66.9734 }
          }
        ]
      }
    ]
  }

  return (
    <div className="itinerary-page">
      <ItineraryHeader itinerary={itineraryData} />

      <div className="itinerary-content">
        <div className="timeline-section">
          <Timeline
            days={itineraryData.days}
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />
        </div>

        <div className="map-section">
          <RouteMap
            days={itineraryData.days}
            selectedDay={selectedDay}
          />
        </div>
      </div>
    </div>
  )
}

export default ItineraryPage