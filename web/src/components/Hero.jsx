import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero-modern">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-floating-elements">
        <div className="floating-element floating-1 animate-float"></div>
        <div className="floating-element floating-2 animate-float"></div>
        <div className="floating-element floating-3 animate-float"></div>
        <div className="floating-element floating-4 animate-float"></div>
        <div className="floating-element floating-5 animate-float"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text animate-fade-in">
          <h1 className="hero-title">
            <span className="hero-title-line-1">O'zbekiston tarixiy shaharlarini kashf eting</span>
          </h1>

          <div className="hero-buttons animate-slide-up">
            <Link to="/explore" className="hero-btn-primary">
              <span>🚀 Sayohatni boshlash</span>
            </Link>

            <Link to="/route" className="hero-btn-secondary">
              📝 Marshrut tuzish
            </Link>
          </div>
        </div>

        <div className="hero-stats animate-fade-in">
          <div className="stat-item">
            <div className="stat-number">6+</div>
            <div className="stat-label">Shahar</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Tarixiy joy</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Bepul</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator animate-bounce">
        <div className="scroll-wheel">
          <div className="scroll-dot animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero