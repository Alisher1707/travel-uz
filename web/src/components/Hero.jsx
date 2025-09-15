import React, { useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [searchData, setSearchData] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    budget: ''
  })

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = () => {
    // Qidiruv funksiyasi
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1>O'zbekistonning eng go'zal joylarini kashf eting</h1>
          <p>Tarixiy shaharlar, ajoyib me'morchilik va noyob madaniyat dunyosiga sayohat qiling</p>
        </div>

        <div className="search-panel">
          <div className="search-row">
            <div className="search-field">
              <label>Shahar</label>
              <select
                name="city"
                value={searchData.city}
                onChange={handleInputChange}
                className="search-input"
              >
                <option value="">Shaharni tanlang</option>
                <option value="toshkent">Toshkent</option>
                <option value="samarqand">Samarqand</option>
                <option value="buxoro">Buxoro</option>
                <option value="xiva">Xiva</option>
                <option value="fargona">Farg'ona</option>
                <option value="namangan">Namangan</option>
                <option value="andijon">Andijon</option>
                <option value="nukus">Nukus</option>
              </select>
            </div>

            <div className="search-field">
              <label>Kelish sanasi</label>
              <input
                type="date"
                name="checkIn"
                value={searchData.checkIn}
                onChange={handleInputChange}
                className="search-input"
              />
            </div>

            <div className="search-field">
              <label>Ketish sanasi</label>
              <input
                type="date"
                name="checkOut"
                value={searchData.checkOut}
                onChange={handleInputChange}
                className="search-input"
              />
            </div>

            <div className="search-field">
              <label>Byudjet</label>
              <select
                name="budget"
                value={searchData.budget}
                onChange={handleInputChange}
                className="search-input"
              >
                <option value="">Byudjetni tanlang</option>
                <option value="100-300">100,000 - 300,000 so'm</option>
                <option value="300-500">300,000 - 500,000 so'm</option>
                <option value="500-1000">500,000 - 1,000,000 so'm</option>
                <option value="1000+">1,000,000+ so'm</option>
              </select>
            </div>

            <button className="search-button" onClick={handleSearch}>
              <span>Qidirish</span>
              <span>🔍</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero