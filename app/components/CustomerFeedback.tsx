import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, CheckCircle } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"



interface Feedback {
  customer_name: string
  rating: number
  comment: string
  email: string
}

export function CustomerFeedback({ className }: { className?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/feedback`)
      const data = await response.json()
      const filteredFeedbacks = data
        .filter((feedback: Feedback) => feedback.rating >= 4)
        .slice(0, 3)
      setFeedbacks(filteredFeedbacks)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
        },
        credentials: 'include',
        body: JSON.stringify({
          customer_name: name,
          rating,
          comment,
          email
        })
      })

      if (response.ok) {
        setName('')
        setEmail('')
        setRating(5)
        setComment('')
        fetchFeedbacks()
        
        // Show success message
        setShowSuccess(true)
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        console.error('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add this helper function at the top of your component
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return null
  }

  // In your JSX, remove the duplicate button and update the remaining one
  // Replace the existing button in the form with:
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit Feedback'
                )}
              </Button>

  // And remove the duplicate button that was outside the form

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
        <motion.h2 variants={itemVariants} className="text-4xl font-pizza font-bold mb-8 text-center text-primary">Customer Feedback</motion.h2>
        
        <motion.div className="grid md:grid-cols-2 gap-12" variants={itemVariants}>
          <div>
            <h3 className="text-2xl font-pizza font-bold mb-4">Leave a Review</h3>
            
            {showSuccess && (
              <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Thank you for your feedback! We appreciate you taking the time to share your thoughts.
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </div>
          
          <div>
            <h3 className="text-2xl font-pizza font-bold mb-4">What Our Customers Say</h3>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>
              ) : feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{feedback.customer_name}</span>
                          <span className="flex">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{feedback.comment}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">No feedbacks available yet.</p>
              )}
            </div>
          </div>

        
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

