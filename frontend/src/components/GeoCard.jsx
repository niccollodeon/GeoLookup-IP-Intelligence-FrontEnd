import GeoMap from './GeoMap'
import '../styles/geocard.css'

function SkeletonCard() {
  return (
    <div className="geo-card">
      <div className="geo-card-header">
        <span className="geo-card-title">Loading...</span>
        <div className="spinner" />
      </div>
      <div style={{ padding: '1.5rem' }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="skeleton"
            style={{ marginBottom: '0.75rem', width: i % 2 ? '70%' : '50%' }}
          />
        ))}
      </div>
    </div>
  )
}

export default function GeoCard({ data, loading, isUser }) {
  if (loading) return <SkeletonCard />
  if (!data) return null

  const [lat, lon] = (data.loc || '0,0').split(',').map(Number)
  const coords = data.loc || '—'

  const fields = [
    ['City',        data.city     || '—'],
    ['Region',      data.region   || '—'],
    ['Country',     data.country  || '—'],
    ['Postal',      data.postal   || '—'],
    ['Timezone',    data.timezone || '—'],
    ['Coordinates', coords],
  ]

  return (
    <div className="geo-card">
      <div className="geo-card-header">
        <span className="geo-card-title">
          {isUser ? '// your location' : '// ip lookup result'}
        </span>
        <div className="status-dot" />
      </div>

      <div className="geo-ip">
        <span className="geo-ip-value">{data.ip}</span>
        {isUser && <span className="geo-ip-tag">You</span>}
        {data.org && (
          <span className="geo-ip-tag">
            {data.org.split(' ').slice(1).join(' ')}
          </span>
        )}
      </div>

      <div className="geo-grid">
        {fields.map(([label, value]) => (
          <div className="geo-item" key={label}>
            <div className="geo-item-label">{label}</div>
            <div className="geo-item-value">{value}</div>
          </div>
        ))}
      </div>

      <div className="map-container">
        <GeoMap lat={lat} lon={lon} ip={data.ip} />
      </div>
    </div>
  )
}