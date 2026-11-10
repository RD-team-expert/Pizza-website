'use client'

import { ModernNavbar } from '../components/ModernNavbar'
import { SmoothScroll } from '../components/SmoothScroll'
import { motion } from 'framer-motion'
import { DynamicMetadata } from '../components/DynamicMetadata'
import { JobApplicationForm } from '../components/JobApplicationForm'

export default function CareersPage() {
  return (
    <SmoothScroll>
      <DynamicMetadata page="careers" />
      <ModernNavbar />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          className="w-full max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-pizza font-bold mb-8 text-center text-primary">Join Our Team</h1>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Apply to join the PNE Pizza team. Fill out the form below and choose the location where you'd like to work.
          </p>

          <JobApplicationForm />
        </motion.div>
      </main>
    </SmoothScroll>
  )
}

