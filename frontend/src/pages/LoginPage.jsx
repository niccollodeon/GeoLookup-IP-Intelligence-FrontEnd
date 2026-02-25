import { useState } from 'react'
import { loginUser } from '../utils/api'
import { storage } from '../utils/storage'
import '../styles/login.css'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    try {
      const data = await loginUser(email, password)
      storage.set('token', data.token)
      storage.set('user', data.user)
      onLogin(data.user, data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="brand-mark">
          <div className="brand-icon">🌐</div>
          <div className="brand-name">Geo<span>Lookup</span></div>
        </div>
        <h1 className="login-title">Sign in</h1>
        <p className="login-sub">// IP intelligence platform</p>

        {error && <div className="error-msg">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoFocus
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading
              ? <><div className="spinner" /> Authenticating...</>
              : '→ Sign In'
            }
          </button>
        </form>

        <div className="demo-creds">
          <p><strong>// Demo credentials</strong></p>
          <p>Demo Acc can be seen inside the README file</p>
        </div>
      </div>
    </div>
  )
}