import React, { useState, useEffect } from 'react'
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