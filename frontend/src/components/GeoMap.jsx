import { useEffect, useRef } from 'react'
import L from 'leaflet'
import '../styles/geomap.css'

export default function GeoMap({ lat, lon, ip }) {
  const mapRef      = useRef(null)
  const instanceRef = useRef(null)
  const markerRef   = useRef(null)

  useEffect(() => {
    if (!lat || !lon || !mapRef.current) return

    // Initialize map once
    if (!instanceRef.current) {
      instanceRef.current = L.map(mapRef.current, { zoomControl: true }).setView([lat, lon], 10)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(instanceRef.current)
    }

    // Remove old marker
    if (markerRef.current) markerRef.current.remove()

    const icon = L.divIcon({
      className: '',
      html: `<div class="map-pin"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })

    markerRef.current = L.marker([lat, lon], { icon })
      .addTo(instanceRef.current)
      .bindPopup(`<b style="font-family:monospace">${ip}</b><br>${lat}, ${lon}`)

    instanceRef.current.flyTo([lat, lon], 10, { animate: true, duration: 1 })
  }, [lat, lon, ip])

  return <div ref={mapRef} className="leaflet-map" />
}