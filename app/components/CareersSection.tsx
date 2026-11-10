import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, DollarSign, Heart, Zap } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { JobApplicationForm } from './JobApplicationForm'

const benefits = [
  { icon: <DollarSign className="h-6 w-6" />, title: "Competitive Pay", description: "We offer above-industry standard wages to all our team members." },
  { icon: <Zap className="h-6 w-6" />, title: "Immediate Pay", description: "Access your earnings when you need them with our immediate pay option." },
  { icon: <Heart className="h-6 w-6" />, title: "Comprehensive Benefits", description: "Health, dental, and vision insurance for eligible employees." },
  { icon: <BadgeCheck className="h-6 w-6" />, title: "Growth Opportunities", description: "Clear path for advancement and professional development." },
]

export function CareersSection({ id, className }: { id?: string, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 } 
    }
  }

  return (
    <motion.section 
      ref={ref}
      id={id} 
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
        <motion.h2 className="text-4xl font-pizza font-bold mb-8 text-center text-primary" variants={itemVariants}>Join Our Team</motion.h2>
        
        <motion.div className="grid md:grid-cols-2 gap-12" variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <JobApplicationForm />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-pizza font-bold mb-4">Why Join PNE Pizza?</h3>
            <motion.p className="mb-6" variants={itemVariants}>At PNE Pizza, we're more than just a workplace - we're a family. We're committed to creating an environment where our employees can thrive, grow, and enjoy their work.</motion.p>
            <motion.div className="grid gap-6" variants={itemVariants}>
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {benefit.icon}
                        <span className="ml-2">{benefit.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="mt-8" variants={itemVariants}>
              <h4 className="text-xl font-bold mb-4">Employee-Obsessed Culture</h4>
              <p>We believe that happy employees make for happy customers. That's why we've implemented a scorecard system to ensure fair evaluations and reward exceptional performance. Join a team that truly values your contributions!</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

