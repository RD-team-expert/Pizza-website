import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

export function CommunityEngagement({ id, className, onInView }: { id?: string, className?: string, onInView?: (inView: boolean) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })

  useEffect(() => {
    if (onInView) {
      onInView(isInView);
    }
  }, [isInView, onInView])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.section 
      ref={ref}
      id={id} 
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${className} dark:bg-gray-900 dark:text-white`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-pizza font-bold mb-8 text-center text-primary dark:text-white">Community Engagement</motion.h2>
        
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-pizza font-bold mb-4">Local Events</h3>
            <div className="bg-orange-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-bold mb-2">Love Kitchen Event</h4>
              <p className="mb-4 dark:text-white">Our Love Kitchen program brings free pizza to people in need, serving those who are hungry, homeless, or affected by disasters.</p>
              <Image
                src="/placeholder.svg"
                alt="Love Kitchen Event"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <div className="flex justify-between items-center">
                <Button variant="outline">Learn More</Button>
                <Link href="/events">
                  <Button variant="link">Show More Events</Button>
                </Link>
              </div>
            </div>
            <p className="mb-4 dark:text-white">At PNE Pizza, we believe in giving back to our communities. We regularly participate in local events, fundraisers, and charitable initiatives to support the areas we serve.</p>
          </div>
          
          <div>
            <h3 className="text-2xl font-pizza font-bold mb-4">Partnerships</h3>
            <p className="mb-4 dark:text-white">We're proud to partner with various organizations in our community. Whether it's schools, churches, or large customers, we're here to serve!</p>
            
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2">Schools</h4>
                <p className="dark:text-white">We offer special deals for school events, fundraisers, and large orders. Let us help make your next school function a success!</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2">Churches</h4>
                <p className="dark:text-white">From youth group meetings to large congregational events, we're here to provide delicious pizza for your gatherings.</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2">Large Orders</h4>
                <p className="dark:text-white">Planning a big event? We can handle orders of any size. Contact us for custom quotes and catering options.</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">Interested in partnering with us?</h4>
              <Button>Contact Us for Partnerships</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

