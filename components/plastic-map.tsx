"use client"

import { useEffect, useRef, useState } from "react"

interface PlasticItem {
  id: string
  qrCode: string
  type: string
  weight: number
  status: "collected" | "sorted" | "recycled"
  collectedAt: string
  location: {
    lat: number
    lng: number
    address: string
  }
  updatedAt: string
}

interface PlasticMapProps {
  items: PlasticItem[]
  onSelectItem?: (item: PlasticItem) => void
}

export function PlasticMap({ items, onSelectItem }: PlasticMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !mapRef.current) return

    // In a real implementation, this would use a proper map library like Google Maps or Leaflet
    // For this demo, we'll just show a placeholder
    const mapContainer = mapRef.current

    // Create a simple representation of the map
    const mapElement = document.createElement("div")
    mapElement.className = "relative w-full h-full bg-gray-100 rounded-lg overflow-hidden"

    // Add a placeholder image
    const mapImage = document.createElement("img")
    mapImage.src = "/placeholder.svg?height=400&width=800"
    mapImage.className = "w-full h-full object-cover"
    mapElement.appendChild(mapImage)

    // Add markers for each item
    items.forEach((item) => {
      const marker = document.createElement("div")
      marker.className = `absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
        item.status === "collected" ? "bg-blue-500" : item.status === "sorted" ? "bg-amber-500" : "bg-green-500"
      }`

      // Position markers randomly on the map for demo purposes
      // In a real implementation, these would be positioned based on lat/lng
      const left = Math.random() * 80 + 10 // 10-90%
      const top = Math.random() * 80 + 10 // 10-90%

      marker.style.left = `${left}%`
      marker.style.top = `${top}%`
      marker.style.transform = "translate(-50%, -50%)"

      // Add click handler
      marker.addEventListener("click", () => {
        if (onSelectItem) {
          onSelectItem(item)
        }
      })

      // Add tooltip
      marker.title = `${item.qrCode} - ${item.location.address}`

      mapElement.appendChild(marker)
    })

    // Clear and append to container
    mapContainer.innerHTML = ""
    mapContainer.appendChild(mapElement)

    return () => {
      if (mapContainer) {
        mapContainer.innerHTML = ""
      }
    }
  }, [items, isMounted, onSelectItem])

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden" ref={mapRef}>
      {!isMounted && <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading map...</div>}
    </div>
  )
}
