import { useState, useEffect } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import GeoCard from '../components/GeoCard'
import HistoryPanel from '../components/HistoryPanel'
import { fetchGeoData } from '../utils/api'
import { validateIP } from '../utils/validate'
import { storage } from '../utils/storage'
import '../styles/home.css'

export default function HomePage({ user, onLogout }) {
  const [userGeo, setUserGeo]       = useState(null)
  const [currentGeo, setCurrentGeo] = useState(null)
  const [searchIP, setSearchIP]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [error, setError]           = useState('')
  const [history, setHistory]       = useState(() => storage.get('geo_history') || [])
  const [selected, setSelected]     = useState(new Set())
  const [isUserView, setIsUserView] = useState(true)

  // Fetch the user's own IP on mount
  useEffect(() => {
    setUserLoading(true)
    fetchGeoData()
      .then((data) => { setUserGeo(data); setCurrentGeo(data) })
      .catch(() => setError('Could not fetch your location.'))
      .finally(() => setUserLoading(false))
  }, [])

  const saveHistory = (geoData) => {
    const entry = { ...geoData, searchedAt: Date.now(), id: `${geoData.ip}-${Date.now()}` }
    const updated = [entry, ...history.filter((h) => h.ip !== geoData.ip)].slice(0, 50)
    setHistory(updated)
    storage.set('geo_history', updated)
  }

  const handleSearch = async () => {
    if (!searchIP.trim()) return
    if (!validateIP(searchIP.trim())) {
      setError('Invalid IP address format. Please enter a valid IPv4 or IPv6 address.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await fetchGeoData(searchIP.trim())
      setCurrentGeo(data)
      setIsUserView(false)
      saveHistory(data)
    } catch {
      setError('Failed to look up this IP. It may be private or invalid.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearchIP('')
    setError('')
    setCurrentGeo(userGeo)
    setIsUserView(true)
  }

  const handleHistoryClick = (item) => {
    setSearchIP(item.ip)
    setCurrentGeo(item)
    setIsUserView(false)
    setError('')
  }

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const deleteSelected = () => {
    const updated = history.filter((h) => !selected.has(h.id))
    setHistory(updated)
    storage.set('geo_history', updated)
    setSelected(new Set())
  }

  return (
    <div className="home-layout">
      <Header user={user} onLogout={onLogout} />

      <div className="main-content">
        {/* Left panel */}
        <div className="left-panel">
          <SearchBar
            searchIP={searchIP}
            onSearchChange={(val) => { setSearchIP(val); setError('') }}
            onSearch={handleSearch}
            onClear={handleClear}
            loading={loading}
            error={error}
            isUserView={isUserView}
          />

          <GeoCard
            data={currentGeo}
            loading={userLoading || (loading && !currentGeo)}
            isUser={isUserView}
          />
        </div>

        {/* Right panel */}
        <HistoryPanel
          history={history}
          selected={selected}
          activeIP={!isUserView ? currentGeo?.ip : null}
          onItemClick={handleHistoryClick}
          onToggleSelect={toggleSelect}
          onDeleteSelected={deleteSelected}
        />
      </div>
    </div>
  )
}