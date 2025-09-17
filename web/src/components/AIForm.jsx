import React, { useState } from 'react'
import EnhancedButton from './EnhancedButton'
import './AIForm.css'

const AIForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    days: '',
    budget: '',
    season: '',
    interests: [],
    groupSize: '1-2'
  })

  const [errors, setErrors] = useState({})

  const interests = [
    { id: 'tarix', label: 'Tarix va me\'morchilik', icon: '🏛️' },
    { id: 'madaniyat', label: 'Madaniyat va san\'at', icon: '🎨' },
    { id: 'hunarmandchilik', label: 'Hunarmandchilik', icon: '🏺' },
    { id: 'tabiat', label: 'Tabiat va landshaft', icon: '🌄' },
    { id: 'fotografiya', label: 'Fotografiya', icon: '📸' },
    { id: 'oziq-ovqat', label: 'Mahalliy taomlar', icon: '🍽️' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.days) newErrors.days = 'Kunlar sonini tanlang'
    if (!formData.budget) newErrors.budget = 'Byudjetni tanlang'
    if (!formData.season) newErrors.season = 'Mavsumni tanlang'
    if (formData.interests.length === 0) newErrors.interests = 'Kamida bitta qiziqishni tanlang'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="ai-form-container">
      <div className="form-header">
        <h2>Sayohat parametrlarini kiriting</h2>
        <p>AI sizning afzalliklaringizga mos marshrutni tayyorlab beradi</p>
      </div>

      <form className="ai-form" onSubmit={handleSubmit}>
        {/* Days Selection */}
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">📅</span>
            Qancha kun sayohat qilmoqchisiz?
          </label>
          <div className="radio-grid">
            {[1, 2, 3, 4, 5].map(day => (
              <button
                key={day}
                type="button"
                className={`radio-card ${formData.days === day ? 'active' : ''}`}
                onClick={() => handleInputChange('days', day)}
              >
                <span className="card-number">{day}</span>
                <span className="card-label">kun</span>
              </button>
            ))}
          </div>
          {errors.days && <span className="error-message">{errors.days}</span>}
        </div>

        {/* Budget Selection */}
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">💰</span>
            Byudjetingiz qancha?
          </label>
          <div className="budget-options">
            <button
              type="button"
              className={`budget-card ${formData.budget === 'past' ? 'active' : ''}`}
              onClick={() => handleInputChange('budget', 'past')}
            >
              <div className="budget-icon">💸</div>
              <div className="budget-info">
                <h3>Past byudjet</h3>
                <p>100,000 - 250,000 so'm</p>
                <span className="budget-features">Asosiy joylar</span>
              </div>
            </button>

            <button
              type="button"
              className={`budget-card ${formData.budget === 'orta' ? 'active' : ''}`}
              onClick={() => handleInputChange('budget', 'orta')}
            >
              <div className="budget-icon">💳</div>
              <div className="budget-info">
                <h3>O'rta byudjet</h3>
                <p>250,000 - 500,000 so'm</p>
                <span className="budget-features">Kengaytirilgan dastur</span>
              </div>
            </button>

            <button
              type="button"
              className={`budget-card ${formData.budget === 'yuqori' ? 'active' : ''}`}
              onClick={() => handleInputChange('budget', 'yuqori')}
            >
              <div className="budget-icon">💎</div>
              <div className="budget-info">
                <h3>Yuqori byudjet</h3>
                <p>500,000+ so'm</p>
                <span className="budget-features">Premium xizmat</span>
              </div>
            </button>
          </div>
          {errors.budget && <span className="error-message">{errors.budget}</span>}
        </div>

        {/* Season Selection */}
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">🌤️</span>
            Qaysi mavsumda sayohat qilasiz?
          </label>
          <div className="season-options">
            {[
              { id: 'bahor', label: 'Bahor', icon: '🌸', desc: 'Mart-May' },
              { id: 'yoz', label: 'Yoz', icon: '☀️', desc: 'Iyun-Avgust' },
              { id: 'kuz', label: 'Kuz', icon: '🍂', desc: 'Sentabr-Noyabr' },
              { id: 'qish', label: 'Qish', icon: '❄️', desc: 'Dekabr-Fevral' }
            ].map(season => (
              <button
                key={season.id}
                type="button"
                className={`season-card ${formData.season === season.id ? 'active' : ''}`}
                onClick={() => handleInputChange('season', season.id)}
              >
                <span className="season-icon">{season.icon}</span>
                <span className="season-label">{season.label}</span>
                <span className="season-desc">{season.desc}</span>
              </button>
            ))}
          </div>
          {errors.season && <span className="error-message">{errors.season}</span>}
        </div>

        {/* Interests Selection */}
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">❤️</span>
            Nimalar sizni qiziqtiradi? (bir nechtasini tanlang)
          </label>
          <div className="interests-grid">
            {interests.map(interest => (
              <button
                key={interest.id}
                type="button"
                className={`interest-card ${formData.interests.includes(interest.id) ? 'active' : ''}`}
                onClick={() => handleInterestToggle(interest.id)}
              >
                <span className="interest-icon">{interest.icon}</span>
                <span className="interest-label">{interest.label}</span>
              </button>
            ))}
          </div>
          {errors.interests && <span className="error-message">{errors.interests}</span>}
        </div>

        {/* Group Size */}
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">👥</span>
            Guruh hajmi
          </label>
          <select
            className="form-select"
            value={formData.groupSize}
            onChange={(e) => handleInputChange('groupSize', e.target.value)}
          >
            <option value="1-2">1-2 kishi</option>
            <option value="3-5">3-5 kishi</option>
            <option value="6-10">6-10 kishi</option>
            <option value="10+">10+ kishi</option>
          </select>
        </div>

        {/* Submit Button */}
        <EnhancedButton
          type="submit"
          disabled={isLoading}
          icon={isLoading ? null : "🚀"}
          className="w-full mt-5"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              <span>AI marshrut tayyorlamoqda...</span>
            </>
          ) : (
            "AI tavsiyasini olish"
          )}
        </EnhancedButton>
      </form>

      {isLoading && (
        <div className="ai-processing">
          <motion.div
            className="processing-animation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="ai-brain"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🤖
            </motion.div>
            <div className="processing-dots">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            AI sizning ma'lumotlaringizni tahlil qilmoqda va eng mos marshrutni tanlmoqda...
          </motion.p>
        </div>
      )}
    </div>
  )
}

export default AIForm