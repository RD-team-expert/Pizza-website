'use client'

import { useEffect, useRef, useState } from 'react'
import { ModernNavbar } from '../components/ModernNavbar'
import { SmoothScroll } from '../components/SmoothScroll'
import { motion, useInView } from 'framer-motion'
import { PageLoadingSpinner } from '../components/PageLoadingSpinner'
import Image from 'next/image'
import { Footer } from '../components/Footer'  // Import the Footer component

interface Milestone {
  date: string
  title: string
  description: string
}

// Add this near the top with other imports
// useState is already imported in the useEffect, useRef, useState line above

// In the TeamMember interface, make profile_image optional
interface TeamMember {
  name: string
  role: string
  profile_image?: string
  description: string
}

// Add these animation variants before the AboutUs component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function AboutUs() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [milestonesRes, teamRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/milestones`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/team-members`)
        ])

        const milestonesData = await milestonesRes.json()
        const teamData = await teamRes.json()

        setMilestones(milestonesData)
        setTeamMembers(teamData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <PageLoadingSpinner />
  }

  return (
    <SmoothScroll>
      <ModernNavbar />
      <main className="flex min-h-screen flex-col">
        <motion.div 
          className="flex-grow container mx-auto px-4 py-8 mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl font-pizza font-extrabold text-primary mb-8 tracking-tight"
            variants={itemVariants}
          >
            About PNE Pizza
          </motion.h1>
          
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-pizza font-bold mb-6">Our Journey</h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    {index < milestones.length - 1 && <div className="w-1 h-16 bg-primary"></div>}
                  </div>
                  <div>
                    <p className="font-bold text-lg">
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-lg">{milestone.title}</p>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p className="mt-6" variants={itemVariants}>
              Our vision is to continue this growth trajectory, using our revenue to develop more stores and create better job opportunities in the communities we serve. We believe in reinvesting in our business and our people, fostering a cycle of growth and community development.
            </motion.p>
          </motion.section>
          
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-2xl font-pizza font-bold mb-4">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Customer Obsessed", description: "We put our customers at the heart of everything we do, striving to exceed their expectations with every pizza we serve." },
                { title: "Employee Obsessed", description: "We value our team members and are committed to their growth, well-being, and success within our organization." },
                { title: "Quality-Driven", description: "We are dedicated to maintaining the highest standards of quality in our products, service, and operations." },
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-orange-100 p-6 rounded-lg"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-pizza font-bold mb-4">Our Leadership</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="relative aspect-square w-full max-h-40">
                    <Image
                      src={member.profile_image || '/images/default-profile.jpg'}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                      priority={index < 3}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/default-profile.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold text-sm mb-1">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>

        {/* Replace the inline footer with the Footer component */}
        <Footer />
      </main>
    </SmoothScroll>
  )
}

