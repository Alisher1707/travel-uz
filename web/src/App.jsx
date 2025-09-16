import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import BottomNavigation from './components/BottomNavigation'
import PageTransition from './components/PageTransition'
import Hero from './components/Hero'
import TopCities from './components/TopCities'
import HistoricalPlaces from './components/HistoricalPlaces'
import HotelsSlider from './components/HotelsSlider'
import Timeline from './components/Timeline'
import CityPage from './components/CityPage'
import ItineraryPage from './components/ItineraryPage'
import AIRecommendationPage from './components/AIRecommendationPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCity, setSelectedCity] = useState('samarqand')

  // Sample data for components
  const samplePlaces = [
    {
      id: 1,
      name: 'Registon maydoni',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Ulug\'bek, Sherdor va Tillakori madrasalari',
      category: 'madrasah',
      rating: 4.9,
      price: '30,000 so\'m'
    },
    {
      id: 13,
      name: 'Ulug\'bek madrasasi',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'XV asrning eng qadimiy madrasasi',
      category: 'madrasah',
      rating: 4.8,
      price: '20,000 so\'m'
    },
    {
      id: 14,
      name: 'Tillakori madrasasi',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Oltin bilan bezatilgan madrasa',
      category: 'madrasah',
      rating: 4.7,
      price: '25,000 so\'m'
    },
    {
      id: 2,
      name: 'Bibixonim masjidi',
      image: 'https://images.unsplash.com/photo-1585858229071-d59c854c2d7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'XV asrning eng katta masjidi',
      category: 'mosque',
      rating: 4.7,
      price: '20,000 so\'m'
    },
    {
      id: 3,
      name: 'Gur-Emir maqbarasi',
      image: 'https://images.unsplash.com/photo-1570789210967-2cff88c7ee8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Amir Temur maqbarasi',
      category: 'mausoleum',
      rating: 4.8,
      price: '15,000 so\'m'
    },
    {
      id: 4,
      name: 'Shoxizinda maqbarasi',
      image: 'https://images.unsplash.com/photo-1590759668628-05b2fc5c0fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Muqaddas maqbaralar majmuasi',
      category: 'mausoleum',
      rating: 4.9,
      price: '25,000 so\'m'
    },
    {
      id: 5,
      name: 'Ulug\'bek rasadxonasi',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'XV asr astronomiya yodgorligi',
      category: 'historical',
      rating: 4.6,
      price: '18,000 so\'m'
    },
    {
      id: 15,
      name: 'Chorsu savdo gumbazi',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'XV asr savdo binosi',
      category: 'historical',
      rating: 4.4,
      price: '12,000 so\'m'
    },
    {
      id: 16,
      name: 'Amir Temur maqbarasi atrofi',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Tarixiy bog\' va arxitektura',
      category: 'historical',
      rating: 4.5,
      price: '10,000 so\'m'
    },
    {
      id: 6,
      name: 'Hazrati Xizr masjidi',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Afrosiyob tepasidagi muqaddas joy',
      category: 'mosque',
      rating: 4.5,
      price: '10,000 so\'m'
    },
    {
      id: 7,
      name: 'Ruhobod maqbarasi',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'XIV asr me\'morchilik yodgorligi',
      category: 'mausoleum',
      rating: 4.4,
      price: '12,000 so\'m'
    },
    {
      id: 8,
      name: 'Ishrotxona maqbarasi',
      image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Temuriylar davri maqbarasi',
      category: 'mausoleum',
      rating: 4.3,
      price: '15,000 so\'m'
    },
    {
      id: 9,
      name: 'Oqsaroy',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Amir Temur saroyi xarobasi',
      category: 'historical',
      rating: 4.2,
      price: '20,000 so\'m'
    },
    {
      id: 10,
      name: 'Doniyor payg\'ambar maqbarasi',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Muqaddas ziyoratgoh',
      category: 'mausoleum',
      rating: 4.7,
      price: '5,000 so\'m'
    },
    {
      id: 11,
      name: 'Afrosiyob muzeyи',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Qadimiy Samarqand tarixi',
      category: 'museum',
      rating: 4.6,
      price: '25,000 so\'m'
    },
    {
      id: 17,
      name: 'Samarqand shahar muzeyi',
      image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Shahar tarixi va madaniyati',
      category: 'museum',
      rating: 4.4,
      price: '20,000 so\'m'
    },
    {
      id: 18,
      name: 'Ruhoniy san\'at muzeyi',
      image: 'https://images.unsplash.com/photo-1590759668628-05b2fc5c0fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Islom san\'ati va qo\'lyozmalari',
      category: 'museum',
      rating: 4.5,
      price: '18,000 so\'m'
    },
    {
      id: 12,
      name: 'Xoja Doniyor masjidi',
      image: 'https://images.unsplash.com/photo-1585858229071-d59c854c2d7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Zamonaviy me\'morchilik namunasi',
      category: 'mosque',
      rating: 4.5,
      price: 'Bepul'
    }
  ]

  const sampleHotels = [
    {
      id: 1,
      name: 'Registon Plaza',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '500,000',
      rating: 4.8,
      location: 'Registon yaqinida',
      amenities: ['WiFi', 'Restoran', 'Spa', 'Parking', 'Fitness']
    },
    {
      id: 2,
      name: 'Samarkand Hotel',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: '300,000',
      rating: 4.5,
      location: 'Shahar markazi',
      amenities: ['WiFi', 'Restoran', 'Konditsioner']
    }
  ]

  const sampleDays = [
    {
      day: 1,
      title: 'Tarixiy markazni kashf etish',
      duration: '8 soat',
      walkingTime: '2 soat',
      places: [
        {
          id: 1,
          name: 'Registon maydoni',
          time: '09:00-11:30',
          duration: '2.5 soat',
          entrance: '30,000 so\'m',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          description: 'Ulug\'bek, Sherdor va Tillakori madrasalari',
          tips: 'Erta borib, fotografiya uchun eng yaxshi vaqt'
        },
        {
          id: 2,
          name: 'Gur-Emir maqbarasi',
          time: '12:00-13:30',
          duration: '1.5 soat',
          entrance: '15,000 so\'m',
          image: 'https://images.unsplash.com/photo-1570789210967-2cff88c7ee8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          description: 'Amir Temur maqbarasi',
          tips: 'Ichkaridagi me\'morchiligiga e\'tibor bering'
        }
      ]
    },
    {
      day: 2,
      title: 'Din va madaniyat',
      duration: '7 soat',
      walkingTime: '1.5 soat',
      places: [
        {
          id: 3,
          name: 'Bibixonim masjidi',
          time: '10:00-12:00',
          duration: '2 soat',
          entrance: '20,000 so\'m',
          image: 'https://images.unsplash.com/photo-1585858229071-d59c854c2d7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          description: 'XV asrning eng katta masjidi',
          tips: 'Qubba ostidagi akustikani sinab ko\'ring'
        },
        {
          id: 4,
          name: 'Shaxi Zinda',
          time: '14:00-16:00',
          duration: '2 soat',
          entrance: '25,000 so\'m',
          image: 'https://images.unsplash.com/photo-1590759668628-05b2fc5c0fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          description: 'Maqbaralar majmuasi',
          tips: 'Zinapoyada ehtiyot bo\'ling'
        }
      ]
    }
  ]

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault()
      return false
    }

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
        (e.ctrlKey && (e.key === 'a' || e.key === 'A')) ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'v' || e.key === 'V')) ||
        (e.ctrlKey && (e.key === 'x' || e.key === 'X'))
      ) {
        e.preventDefault()
        return false
      }
    }

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault()
      return false
    }

    // Disable drag
    const handleDragStart = (e) => {
      e.preventDefault()
      return false
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)

    // Block developer tools detection
    let devtools = {open: false, orientation: null}
    const threshold = 160

    const check = () => {
      if (window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true
          console.clear()
          window.location.reload()
        }
      } else {
        devtools.open = false
      }
    }

    const interval = setInterval(check, 500)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
      clearInterval(interval)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'city':
        return <CityPage cityName={selectedCity} />
      case 'itinerary':
        return <ItineraryPage />
      case 'ai':
        return <AIRecommendationPage />
      case 'home':
      default:
        return (
          <>
            <Hero />
            <TopCities />
            <HistoricalPlaces places={samplePlaces} />
            <HotelsSlider hotels={sampleHotels} />
            <Timeline days={sampleDays} selectedDay={1} onDaySelect={() => {}} />
          </>
        )
    }
  }

  return (
    <div className="App">
      <Navbar />
      <PageTransition pageKey={currentPage}>
        {renderPage()}
      </PageTransition>

      {/* Mobile bottom navigation */}
      <BottomNavigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

    </div>
  )
}

export default App