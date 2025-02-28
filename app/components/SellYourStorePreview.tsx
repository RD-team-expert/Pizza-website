import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

export function SellYourStorePreview({ className }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/sell-your-store')
    window.scrollTo(0, 0)
  }

  return (
    <motion.section
      ref={ref}
      className={`w-full py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-pizza font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Sell Your Store to PNE Pizza LLC
        </motion.h2>
        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Are you a Little Caesars franchise owner looking to sell? PNE Pizza LLC specializes in acquiring and operating Little Caesars locations with a proven track record of success.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button size="lg" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            router.push('/sell-your-store');
            window.scrollTo(0, 0);
          }}>Learn More About Selling Your Store</Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

