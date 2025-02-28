'use client'

import { motion } from 'framer-motion'

export function PageLoadingSpinner() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm dark:bg-gray-900/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-primary/30 rounded-full"
        />
        <motion.div
          className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Loading...
      </motion.p>
    </motion.div>
  )
}

