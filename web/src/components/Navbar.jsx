import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-text">Travel.uz</span>
          <span className="logo-icon">✈️</span>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#shaharlar" className="nav-link">Shaharlar</a>
          <a href="#tarixiy-joylar" className="nav-link">Tarixiy joylar</a>
          <a href="#mehmonxonalar" className="nav-link">Mehmonxonalar</a>
          <a href="#marshrutlar" className="nav-link">Marshrutlar</a>
          <a href="#ai-tavsiya" className="nav-link">AI tavsiya</a>
        </div>

        {/* AI & Search Section */}
        <div className="navbar-center">
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="profile-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Right Side - Profile */}
        <div className="navbar-right">
        </div>
      </div>
    </nav>
  )
}

export default Navbar