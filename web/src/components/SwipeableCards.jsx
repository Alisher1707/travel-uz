import React, { useState, useRef, useEffect } from 'react'
import './SwipeableCards.css'

const SwipeableCards = ({ children, className = '', itemsPerView = 1, autoPlay = true, autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)
  const autoPlayRef = useRef(null)

  const totalItems = React.Children.count(children)
  // Desktop da 3 tadan ko'rsatganda 3 ta page bor: 0,1,2 (0-2, 3-5, 6-8)
  const maxIndex = isDesktop && itemsPerView === 3 ? 2 : Math.max(0, totalItems - itemsPerView)

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
      } else if (diff > 0 && currentIndex === 0) {
        // Swipe right at first slide - go to last slide
        setCurrentIndex(maxIndex)
      } else if (diff < 0 && currentIndex < maxIndex) {
        // Swipe left - go to next
        setCurrentIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex === maxIndex) {
        // Swipe left at last slide - go to first slide
        setCurrentIndex(0)
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
      } else if (diff > 0 && currentIndex === 0) {
        // Mouse right at first slide - go to last slide
        setCurrentIndex(maxIndex)
      } else if (diff < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex === maxIndex) {
        // Mouse left at last slide - go to first slide
        setCurrentIndex(0)
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
      // Desktop da har bir page uchun 3 ta item ko'rsatish
      let translateX
      if (isDesktop && itemsPerView === 3) {
        translateX = -currentIndex * (100 / 3) // Har bir page 3 ta element
      } else {
        translateX = -currentIndex * (100 / itemsPerView)
      }
      containerRef.current.style.transform = `translateX(${translateX}%)`
    }
  }

  useEffect(() => {
    updateTransform()
  }, [currentIndex, itemsPerView])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && !isDragging.current) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex >= maxIndex) {
            return 0 // Boshiga qayt
          }
          return prevIndex + 1
        })
      }, autoPlayInterval)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, isHovered, maxIndex])

  // Clear auto-play when dragging
  useEffect(() => {
    if (isDragging.current && autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }, [isDragging.current])

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
    // Har bir nuqta 3 ta rasmni ko'rsatadi
    const targetIndex = index * 3
    setCurrentIndex(Math.min(targetIndex, maxIndex))
  }

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Oxirgi pozitsiyada bo'lsa, boshiga qayt
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(maxIndex) // Birinchi pozitsiyada bo'lsa, oxirigiga o't
    }
  }

  return (
    <div
      className={`swipeable-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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


    </div>
  )
}

export default SwipeableCards