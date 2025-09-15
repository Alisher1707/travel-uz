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
          <a href="#marshrutlar" className="nav-link">Marshrutlar</a>
          <a href="#mehmonxonalar" className="nav-link">Mehmonxonalar</a>
          <a href="#ai-tavsiya" className="nav-link">AI tavsiya</a>
        </div>

        {/* Right Side - Search & Profile */}
        <div className="navbar-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Qidirish..."
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <button className="profile-btn">👤</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar