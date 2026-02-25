import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { storage } from './utils/storage'

export default function App() {
  const [user, setUser] = useState(() => storage.get('user'))
  const [token, setToken] = useState(() => storage.get('token'))

  const handleLogin = (userData, tok) => {
    setUser(userData)
    setToken(tok)
  }

  const handleLogout = () => {
    storage.del('token')
    storage.del('user')
    setUser(null)
    setToken(null)
  }

  if (!user || !token) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <HomePage user={user} onLogout={handleLogout} />
}