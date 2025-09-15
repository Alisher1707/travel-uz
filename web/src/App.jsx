import React, { useState } from 'react'
import Navbar from './components/Navbar'
import BottomNavigation from './components/BottomNavigation'
import PageTransition from './components/PageTransition'
import Hero from './components/Hero'
import TopCities from './components/TopCities'
import CityPage from './components/CityPage'
import ItineraryPage from './components/ItineraryPage'
import AIRecommendationPage from './components/AIRecommendationPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCity, setSelectedCity] = useState('samarqand')

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

      {/* Demo navigation buttons for desktop */}
      <div className="demo-nav">
        <button
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => setCurrentPage('home')}
        >
          Home
        </button>
        <button
          className={currentPage === 'city' ? 'active' : ''}
          onClick={() => setCurrentPage('city')}
        >
          Samarqand
        </button>
        <button
          className={currentPage === 'itinerary' ? 'active' : ''}
          onClick={() => setCurrentPage('itinerary')}
        >
          Marshrut
        </button>
        <button
          className={currentPage === 'ai' ? 'active' : ''}
          onClick={() => setCurrentPage('ai')}
        >
          AI Tavsiya
        </button>
      </div>
    </div>
  )
}

export default App