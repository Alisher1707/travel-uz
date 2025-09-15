import React from 'react'
import { motion } from 'framer-motion'

const AnimatedCard = ({
  children,
  className = '',
  hoverScale = 1.05,
  hoverY = -10,
  tapScale = 0.98,
  transition = { type: "spring", stiffness: 300, damping: 30 },
  onClick = null,
  ...props
}) => {
  return (
    <motion.div
      className={`animated-card ${className}`}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: tapScale }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard