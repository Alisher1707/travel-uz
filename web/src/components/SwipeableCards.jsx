import React, { useState, useRef, useEffect } from 'react'
import './SwipeableCards.css'

const SwipeableCards = ({ children, className = '', itemsPerView = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
  const containerRef = useRef(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)

  const totalItems = React.Children.count(children)
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (isDesktop) return

    startX.current = e.touches[0].clientX
    isDragging.current = true

    if (containerRef.current) {
      containerRef.current.style.transition = 'none'
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current || isDesktop) return

    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current

    if (containerRef.current) {
      const translateX = -currentIndex * (100 / itemsPerView) + (diff / containerRef.current.offsetWidth) * 100
      containerRef.current.style.transform = `translateX(${translateX}%)`
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging.current || isDesktop) return

    const diff = currentX.current - startX.current
    const threshold = 50

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.3s ease'
    }

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        setCurrentIndex(currentIndex - 1)
      } else if (diff < 0 && currentIndex < maxIndex) {
        // Swipe left - go to next
        setCurrentIndex(currentIndex + 1)
      } else {
        // Snap back
        updateTransform()
      }
    } else {
      // Snap back
      updateTransform()
    }

    isDragging.current = false
  }

  // Mouse events for desktop drag
  const handleMouseDown = (e) => {
    if (!isDesktop) return

    startX.current = e.clientX
    isDragging.current = true

    if (containerRef.current) {
      containerRef.current.style.transition = 'none'
      containerRef.current.style.cursor = 'grabbing'
    }

    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current || !isDesktop) return

    currentX.current = e.clientX
    const diff = currentX.current - startX.current

    if (containerRef.current) {
      const translateX = -currentIndex * (100 / itemsPerView) + (diff / containerRef.current.offsetWidth) * 100
      containerRef.current.style.transform = `translateX(${translateX}%)`
    }
  }

  const handleMouseUp = () => {
    if (!isDragging.current || !isDesktop) return

    const diff = currentX.current - startX.current
    const threshold = 50

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.3s ease'
      containerRef.current.style.cursor = 'grab'
    }

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (diff < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1)
      } else {
        updateTransform()
      }
    } else {
      updateTransform()
    }

    isDragging.current = false
  }

  const updateTransform = () => {
    if (containerRef.current) {
      const translateX = -currentIndex * (100 / itemsPerView)
      containerRef.current.style.transform = `translateX(${translateX}%)`
    }
  }

  useEffect(() => {
    updateTransform()
  }, [currentIndex, itemsPerView])

  useEffect(() => {
    if (isDesktop) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDesktop, currentIndex])

  const goToSlide = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className={`swipeable-container ${className}`}>
      <div className="swipeable-wrapper">
        <div
          ref={containerRef}
          className="swipeable-content"
          style={{
            width: `${(totalItems / itemsPerView) * 100}%`,
            transform: `translateX(${-currentIndex * (100 / itemsPerView)}%)`,
            cursor: isDesktop ? 'grab' : 'default'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="swipeable-item"
              style={{ width: `${100 / totalItems}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows for desktop */}
      {isDesktop && totalItems > itemsPerView && (
        <>
          <button
            className={`swipe-nav-btn prev ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <button
            className={`swipe-nav-btn next ${currentIndex === maxIndex ? 'disabled' : ''}`}
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            ›
          </button>
        </>
      )}

      {/* Dots indicator */}
      {totalItems > itemsPerView && (
        <div className="swipe-indicators">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`swipe-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SwipeableCards