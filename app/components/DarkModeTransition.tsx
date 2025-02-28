'use client'

import { motion } from 'framer-motion'

export function DarkModeTransition({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isDarkMode ? 1 : 0,
        transition: { duration: 0.5 }
      }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    />
  )
}

