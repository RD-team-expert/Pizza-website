'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import { motion, useInView } from 'framer-motion'
import { Loader2, MapPin } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface Location {
  name: string
  image_url: string
  street: string
  city: string
  longitude: string
  latitude: string
  state: string
  zip: string
  description: string
  status: boolean
  lc_number?: string  // Added lc_number as optional property
}

export function LocationsSection({ id, className }: { id?: string, className?: string }) {
  const ref = useRef(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<any[]>([])
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const pathname = usePathname()
  const isMounted = useRef(false)
  
  // Define libraries as a memoized value
  const libraries = useMemo(() => ['places', 'geometry', 'marker'], []);
  
  // Use the useJsApiLoader hook instead of LoadScript component
  const { isLoaded: isScriptLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    mapIds: [process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''], 
    libraries: libraries as any,
  })

  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.4173, lng: -82.9071 })
  const [mapZoom, setMapZoom] = useState(4)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [shouldFetchData, setShouldFetchData] = useState(true)

  // Data fetching effect
  useEffect(() => {
    if (isScriptLoaded && shouldFetchData) {
      const fetchData = async () => {
        setIsMapLoading(true)
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/locations`)
          const data = await response.json()
          
          if (isMounted.current) {
            setLocations(data)
            if (data.length > 0 && typeof google !== 'undefined') {
              const bounds = new google.maps.LatLngBounds()
              data.forEach((location: Location) => {
                bounds.extend({
                  lat: parseFloat(location.latitude),
                  lng: parseFloat(location.longitude)
                })
              })
              setMapCenter({
                lat: bounds.getCenter().lat(),
                lng: bounds.getCenter().lng()
              })
              setMapZoom(6)
            }
          }
        } catch (error) {
          console.error('Error fetching locations:', error)
        } finally {
          if (isMounted.current) {
            setIsMapLoading(false)
            setShouldFetchData(false)
          }
        }
      }
      
      fetchData()
    }
  }, [isScriptLoaded, shouldFetchData])

  // Mount effect
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      setIsMapLoaded(false)
      setIsMapLoading(true)
      setShouldFetchData(true)
      // Clear any markers to prevent memory leaks
      clearMarkers()
    }
  }, [])

  // Navigation effect
  useEffect(() => {
    if (isMounted.current) {
      setShouldFetchData(true)
      setIsMapLoading(true)
      // Clear existing markers on navigation
      clearMarkers()
    }
  }, [pathname])

  // Add markers effect
  useEffect(() => {
    if (isMapLoaded && mapRef.current && locations.length > 0) {
      // Clear any existing markers
      clearMarkers()
      
      // Create new markers
      locations.forEach((location) => {
        createAdvancedMarker(location)
      })
    }
  }, [isMapLoaded, locations])

  // Function to create a marker element
  const createMarkerElement = (location: Location) => {
    const markerElement = document.createElement('div')
    markerElement.className = 'cursor-pointer'
    markerElement.innerHTML = `
      <div class="bg-primary rounded-full p-2 shadow-lg transform transition-transform hover:scale-110">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `
    markerElement.addEventListener('click', () => {
      setSelectedLocation(location)
      setMapCenter({
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      })
    })
    return markerElement
  }
  
  // Function to create an advanced marker
  const createAdvancedMarker = (location: Location) => {
    if (!mapRef.current || typeof google === 'undefined') return

    const position = {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    }
    
    try {
      // Only create the marker if the AdvancedMarkerElement exists
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        const content = createMarkerElement(location)
        
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position,
          title: location.name,
          content
        })
        
        markersRef.current.push(marker)
      }
    } catch (error) {
      console.error("Error creating advanced marker:", error)
    }
  }

  // Cleanup function for markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker && marker.map) {
        marker.map = null
      }
    })
    markersRef.current = []
  }

  const mapStyles = {
    height: '100%',
    width: '100%',
    borderRadius: '0.5rem'
  }
  
  const mapOptions = {
    // Remove the styles array since we're using Map ID
    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    gestureHandling: 'cooperative',
    scrollwheel: true,
    disableDefaultUI: false
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
      <motion.div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-pizza font-bold mb-8 text-center text-primary">Our Locations</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2 relative w-full min-h-[400px]">
            {(!isScriptLoaded || isMapLoading) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 rounded-lg z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            )}
            
            {isScriptLoaded && (
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={mapZoom}
                center={mapCenter}
                options={mapOptions}
                onLoad={(map) => {
                  mapRef.current = map
                  setIsMapLoaded(true)
                  setIsMapLoading(false)
                }}
                onUnmount={() => {
                  clearMarkers()
                  mapRef.current = null
                  setIsMapLoaded(false)
                }}
                mapContainerClassName="shadow-xl rounded-lg w-full h-full"
                onClick={() => setSelectedLocation(null)}
              >
                {/* InfoWindow for selected location */}
                {selectedLocation && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(selectedLocation.latitude),
                      lng: parseFloat(selectedLocation.longitude)
                    }}
                    onCloseClick={() => setSelectedLocation(null)}
                  >
                    <div className="p-2">
                      <h4 className="font-bold text-lg mb-1">{selectedLocation.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedLocation.street}<br />
                        {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zip}
                      </p>
                      <img
                        src={selectedLocation.image_url}
                        alt={selectedLocation.name}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm mb-3">{selectedLocation.description}</p>
                      
                      {selectedLocation.lc_number && (
                        <a 
                          href={`https://littlecaesars.com/en-us/order/pickup/stores/${selectedLocation.lc_number}/order-time/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded text-center transition-colors"
                        >
                          Order Now
                        </a>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </motion.div>
          
          <motion.div className="bg-gray-100 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-pizza font-bold text-primary">Franchise Locations</h3>
              <span className="text-lg font-pizza text-primary/80">
                {locations.length} {locations.length === 1 ? 'Store' : 'Stores'}
              </span>
            </div>
            <div className="h-[320px] overflow-y-auto pr-2 fancy-scrollbar">
              <ul className="space-y-4">
                {locations.map((location, index) => (
                  <motion.li
                    key={index}
                    initial={index < 4 ? { opacity: 1 } : { opacity: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.02 }}
                    className="flex items-start cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors"
                    onClick={() => {
                      setSelectedLocation(location)
                      setMapCenter({
                        lat: parseFloat(location.latitude),
                        lng: parseFloat(location.longitude)
                      })
                      setMapZoom(15)
                    }}
                  >
                    <MapPin
                      className="text-primary mr-2 mt-1 flex-shrink-0"
                      size={24}
                      strokeWidth={2.5}
                      fill="#fff"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold">{location.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {location.street}, {location.city}, {location.state} {location.zip}
                      </p>
                      {location.lc_number && (
                        <a 
                          href={`https://littlecaesars.com/en-us/order/pickup/stores/${location.lc_number}/order-time/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block mt-1 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                        >
                          Order Online
                        </a>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}