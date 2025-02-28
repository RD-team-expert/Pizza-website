import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ContactUs({ id, className }: { id?: string, className?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      })

      if (response.ok) {
        // Reset form
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        // Show success message
        setShowSuccess(true)
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        console.error('Failed to submit contact form')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  }

  return (
    <motion.section 
      ref={ref}
      id={id} 
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-pizza font-bold mb-8 text-center text-primary">Contact Us</motion.h2>
        
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <motion.h3 variants={itemVariants} className="text-2xl font-pizza font-bold mb-4">Send Us a Message</motion.h3>
            
            {showSuccess && (
              <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Thank you for contacting us! We'll get back to you as soon as possible.
                </AlertDescription>
              </Alert>
            )}
            
            <motion.form onSubmit={handleSubmit} variants={itemVariants} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </motion.form>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.h3 variants={itemVariants} className="text-2xl font-pizza font-bold mb-4">Department Contacts</motion.h3>
            <motion.div variants={itemVariants} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2" />
                    Specific Store Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Call your local store directly. Find store numbers on our Locations page.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2" />
                    General Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Email: support@pnepizza.com</p>
                  <p>Phone: (555) 123-4567</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2" />
                    Complaints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Email: complaints@pnepizza.com</p>
                  <p>Phone: (555) 987-6543</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

