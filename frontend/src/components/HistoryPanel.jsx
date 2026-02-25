import { timeAgo } from '../utils/validate'
import '../styles/history.css'

export default function HistoryPanel({
  history,
  selected,
  activeIP,
  onItemClick,
  onToggleSelect,
  onDeleteSelected,
}) {
  return (
    <div className="right-panel">
      <div className="panel-header">
        <span className="panel-title">Search History</span>
        {selected.size > 0 && (
          <button className="btn-delete-selected" onClick={onDeleteSelected}>
            Delete ({selected.size})
          </button>
        )}
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <div className="history-empty">
            // no searches yet<br />
            <span>Enter an IP above to begin</span>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className={`history-item${activeIP === item.ip ? ' active-item' : ''}`}
              onClick={() => onItemClick(item)}
            >
              <input
                type="checkbox"
                className="history-checkbox"
                checked={selected.has(item.id)}
                onChange={() => onToggleSelect(item.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="history-info">
                <div className="history-ip">{item.ip}</div>
                <div className="history-meta">
                  {[item.city, item.region, item.country].filter(Boolean).join(', ') || '—'}
                </div>
              </div>
              <div className="history-time">{timeAgo(item.searchedAt)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}