'use client'

import { motion } from 'framer-motion'

export function PizzaLoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-50 bg-opacity-75 z-50">
      <motion.div
        className="relative w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 border-8 border-orange-500 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 border-8 border-red-500 rounded-full"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>
      <motion.p
        className="mt-4 text-xl font-bold text-orange-600"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  )
}

