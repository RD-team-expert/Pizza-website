'use client'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

export function SellYourStore() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    info: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowSuccess(false)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/acquisitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', phone: '', info: '' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto pt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-pizza font-bold mb-8 text-center text-primary">Sell Your Store to PNE Pizza LLC</h2>
        
        {showSuccess && (
          <motion.div 
            className="max-w-2xl mx-auto mb-8 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Thank you for your interest! We will contact you soon.
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="mb-6">
              PNE Pizza LLC specializes in acquiring and operating Little Caesars locations with a proven track record of success.
            </p>
            
            <h3 className="text-2xl font-pizza font-bold mb-4">Why Choose PNE Pizza LLC?</h3>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Experienced team managing multiple locations across Ohio and Indiana.</li>
              <li>Seamless and professional transition process.</li>
              <li>Commitment to maintaining the legacy and success of your store.</li>
            </ul>
            
            <h3 className="text-2xl font-pizza font-bold mb-4">Steps to Get Started</h3>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>Fill out the contact form with your store details.</li>
              <li>Our team will review your information and reach out to you.</li>
              <li>We'll schedule a call to discuss your store and potential acquisition.</li>
              <li>If both parties agree, we'll begin the due diligence process.</li>
              <li>Upon successful completion, we'll finalize the acquisition.</li>
            </ol>
            
            <h3 className="text-2xl font-pizza font-bold mb-4">Requirements</h3>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Must be an authorized Little Caesars franchise location.</li>
              <li>Minimum of 2 years in operation.</li>
              <li>Consistent sales performance.</li>
              <li>Compliance with Little Caesars brand standards.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-pizza font-bold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="info" className="block text-sm font-medium text-gray-700 mb-1">Store Information</label>
                <Textarea 
                  id="info" 
                  value={formData.info}
                  onChange={(e) => setFormData(prev => ({ ...prev, info: e.target.value }))}
                  rows={4}
                  required
                  disabled={isSubmitting}
                  placeholder="Please provide details about your store location and current operations..."
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

