import React from 'react'
import './BottomNavigation.css'

const BottomNavigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    {
      id: 'home',
      label: 'Bosh sahifa',
      icon: '🏠',
      activeIcon: '🏠'
    },
    {
      id: 'city',
      label: 'Shaharlar',
      icon: '🏛️',
      activeIcon: '🏛️'
    },
    {
      id: 'itinerary',
      label: 'Marshrutlar',
      icon: '🗺️',
      activeIcon: '🗺️'
    },
    {
      id: 'ai',
      label: 'AI Tavsiya',
      icon: '🤖',
      activeIcon: '🤖'
    }
  ]

  return (
    <div className="bottom-navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">
              {currentPage === item.id ? item.activeIcon : item.icon}
            </span>
            <span className="nav-label">{item.label}</span>
            {currentPage === item.id && <div className="nav-indicator"></div>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation