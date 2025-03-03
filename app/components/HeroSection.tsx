'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef(null)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animate on scroll
  useEffect(() => {
    // Make sure component is mounted before setting up observer
    let observer: IntersectionObserver;
    
    // Small timeout to ensure component is fully rendered
    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start('visible')
          }
        },
        { threshold: 0.1 }
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observer) {
        observer.disconnect();
      }
    }
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  // More natural floating animation for ingredients
  const floatingVariants = (index :any) => ({
    animate: {
      y: [0, -10, 0],
      rotate: [0, index % 2 === 0 ? 5 : -5, 0],
      transition: {
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  })

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden pt-24 md:pt-32 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 via-orange-100 to-red-50"
    >
      {/* Floating ingredients with improved animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          '/cheese.svg',
          '/garlic.svg',
          '/jalapeno.svg',
          '/ol.svg',
          '/olive.svg',
          '/cheese.svg',
          '/pepper.svg',
        ].map((src, index) => (
          <motion.div
            key={index}
            className={`absolute ${[
              'top-[15%] left-[10%]',
              'top-[20%] right-[15%]',
              'top-[40%] left-[15%]',
              'top-[45%] right-[10%]',
              'bottom-[20%] left-[20%]',
              'bottom-[25%] right-[20%]',
              'top-[30%] left-[50%]'
            ][index]}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <motion.div
              variants={floatingVariants(index)}
              animate="animate"
            >
              <Image
                src={src}
                alt={`Pizza topping ${index + 1}`}
                width={isMobile ? 40 : 60}
                height={isMobile ? 40 : 60}
                loading={index < 3 ? "eager" : "lazy"}
                className="drop-shadow-md"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <motion.h1
            className="font-pizza text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Hot & Ready Pizza Awaits!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 md:mb-8 text-orange-800"
            variants={itemVariants}
          >
            Experience the taste of PNE Pizza, your local Little Caesars franchise. Quality ingredients, fast service, and unbeatable prices!
          </motion.p>
          
          {/* Removed CTA buttons as they're now in the navbar */}
        </div>

        <motion.div
          className="relative w-full max-w-2xl mx-auto h-64 overflow-visible -mt-4 md:-mt-8"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full h-[18rem] md:h-[22rem] transform -translate-y-1/4"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear",
              type: "tween",
            }}
          >
            <Image
              src="/pizza.png"
              alt="Delicious Pizza Slice"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              priority
              className="scale-100 -translate-y-4 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
              style={{ 
                objectFit: 'contain',
                transform: isMobile ? 'scale(0.95)' : 'scale(1.05)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

