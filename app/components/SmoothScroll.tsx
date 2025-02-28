"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ModernNavbar } from "./ModernNavbar"

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      scrollRef.current && setScrollRange(scrollRef.current.scrollHeight)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [scrollRef, children])

  const { scrollY } = useScroll()
  const transform = useTransform(scrollY, [0, scrollRange], [0, -scrollRange])
  const physics = { damping: 15, mass: 0.2, stiffness: 55 } // Adjusted physics for smoother scrolling
  const spring = useSpring(transform, physics)

  const content = React.Children.toArray(children)
  const navbar = content.find((child) => React.isValidElement(child) && child.type === ModernNavbar)
  const otherContent = content.filter((child) => child !== navbar)

  if (isMobile) {
    return (
      <>
        {navbar}
        <div className="w-full">{otherContent}</div>
      </>
    )
  }

  return (
    <>
      <div ref={ghostRef} style={{ height: scrollRange }} className="invisible absolute w-full" />
      {navbar}
      <motion.div
        ref={scrollRef}
        style={{ y: spring }}
        className="fixed top-0 left-0 w-full h-auto will-change-transform"
      >
        {otherContent}
      </motion.div>
    </>
  )
}

