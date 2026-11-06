export default function Modal({ title, onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}
    >
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '460px', maxHeight: '90vh', overflowY: 'auto', margin: 0 }}>
          <div className="card-title">{title} <span className="action-link" onClick={onClose}>Close</span></div>
          {children}
      </div>
    </div>
  )
}
