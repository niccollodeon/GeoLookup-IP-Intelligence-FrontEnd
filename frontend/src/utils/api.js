const API_BASE = 'https://geolookup-ip-intelligence-backend-production.up.railway.app/api'
const GEO_API = 'https://ipinfo.io'

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data
}

export async function fetchGeoData(ip = '') {
  const url = ip ? `${GEO_API}/${ip}/geo` : `${GEO_API}/geo`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch geo data')
  return res.json()
}