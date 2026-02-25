import '../styles/header.css'

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-icon">🌐</div>
        Geo<span>Lookup</span>
      </div>
      <div className="header-right">
        <div className="user-chip">
          <div className="user-avatar">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <span>{user.name}</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}