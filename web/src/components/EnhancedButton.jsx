import React from 'react'
import { motion } from 'framer-motion'

const EnhancedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon = null,
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent hover:bg-white/10 text-primary-400 border border-primary-400 hover:border-primary-300',
    outline: 'bg-transparent border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white'
  }

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        font-semibold rounded-full transition-all duration-300
        flex items-center justify-center gap-2
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  )
}

export default EnhancedButton