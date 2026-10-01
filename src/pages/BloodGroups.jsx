import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function BloodGroups() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div className="nav-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); go('home') }}>Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('search') }}>Search Donor</a>
                  <a href="#" className="active">Blood Stock</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('about') }}>About</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="badge badge-red">A+</span>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Hamlet</span>
              </div>
          </nav>
          <div style={{ background: 'var(--red)', padding: '22px 28px', color: '#fff' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '2px' }}>Blood Stock Availability</h2>
              <p style={{ fontSize: '13px', opacity: '0.85' }}>Live view of available blood units across the platform</p>
          </div>
          <div className="dashboard-layout">
              <div className="sidebar">
                  <div className="sidebar-logo"><span><b>Life</b>Saver</span></div>
                  <div className="sidebar-section-label">Menu</div>
                  <div className="sidebar-item" data-page="donor-dash" onClick={() => go('donor-dash')}><span className="sidebar-icon">•</span> Dashboard</div>
                  <div className="sidebar-item" data-page="my-profile" onClick={() => go('my-profile')}><span className="sidebar-icon">•</span> My Profile</div>
                  <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                  <div className="sidebar-item active" data-page="donor-stock"><span className="sidebar-icon">•</span> Blood Stock</div>
                  <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Request</div>
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>Account</div>
                  <div className="sidebar-item" data-page="settings" onClick={() => go('settings')}><span className="sidebar-icon">•</span> Settings</div>
                  <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                      <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>Blood Stock Availability</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Last updated: Today at 10:30 AM</p></div>
                      <span className="toast info">ℹ️ View only · Contact admin to update</span>
                  </div>
                  <div className="stock-grid">
                      <div className="stock-card ok"><div className="stock-group">A+</div><div className="stock-label">Blood Group</div><div className="stock-status ok">Good Stock</div><div className="stock-qty">45</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card low"><div className="stock-group">A−</div><div className="stock-label">Blood Group</div><div className="stock-status low">Low Stock</div><div className="stock-qty">4</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card ok"><div className="stock-group">B+</div><div className="stock-label">Blood Group</div><div className="stock-status ok">Good Stock</div><div className="stock-qty">32</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card low"><div className="stock-group">B−</div><div className="stock-label">Blood Group</div><div className="stock-status low">Low Stock</div><div className="stock-qty">3</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card ok"><div className="stock-group">O+</div><div className="stock-label">Blood Group</div><div className="stock-status ok">Good Stock</div><div className="stock-qty">58</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card ok"><div className="stock-group">O−</div><div className="stock-label">Blood Group</div><div className="stock-status ok">Good Stock</div><div className="stock-qty">18</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card ok"><div className="stock-group">AB+</div><div className="stock-label">Blood Group</div><div className="stock-status ok">Good Stock</div><div className="stock-qty">12</div><div className="stock-unit">units available</div></div>
                      <div className="stock-card ok"><div className="stock-group">AB−</div><div className="stock-label">Blood Group</div><div className="stock-status ok">Good Stock</div><div className="stock-qty">7</div><div className="stock-unit">units available</div></div>
                  </div>
                  <div className="card" style={{ marginTop: '20px', background: 'var(--blue-bg)', borderColor: '#BFDBFE' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ fontSize: '22px' }}>ℹ️</div>
                          <div>
                              <div style={{ fontWeight: '700', color: 'var(--blue)', marginBottom: '4px', fontSize: '14px' }}>Read-Only View</div>
                              <div style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6' }}>Blood stock quantities are managed exclusively by system administrators. If you notice a discrepancy or a blood group is critically low, please contact the admin team immediately.</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
