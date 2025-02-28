'use client'

import { useState, useEffect } from "react"
import { PizzaLoadingSpinner } from "./PizzaLoadingSpinner"

export default function ClientLayout({
  children,
  className
}: {
  children: React.ReactNode
  className: string
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <PizzaLoadingSpinner />}
      {children}
    </>
  )
}