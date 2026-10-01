import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function DonorDashboard() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span className="badge badge-red">A+</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-800)' }}>Hamlet Mondal</span>
                  <button className="btn btn-gray btn-sm" onClick={() => go('home')}>Logout</button>
              </div>
          </nav>
          <div className="dashboard-layout">
              <div className="sidebar">
                  <div className="sidebar-logo"><span><b>Life</b>Saver</span></div>
                  <div className="sidebar-section-label">Menu</div>
                  <div className="sidebar-item active" data-page="donor-dash" onClick={() => go('donor-dash')}><span className="sidebar-icon">•</span> Dashboard</div>
                  <div className="sidebar-item" data-page="my-profile" onClick={() => go('my-profile')}><span className="sidebar-icon">•</span> My Profile</div>
                  <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                  <div className="sidebar-item" data-page="donor-stock" onClick={() => go('donor-stock')}><span className="sidebar-icon">•</span> Blood Stock</div>
                  <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Request</div>
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>Account</div>
                  <div className="sidebar-item" data-page="settings" onClick={() => go('settings')}><span className="sidebar-icon">•</span> Settings</div>
                  <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">
                  <div className="dash-header">
                      <h2>Welcome back, Hamlet 👋</h2>
                      <p>Here's an overview of your donor activity and nearby emergency requests.</p>
                  </div>
                  <div className="stat-cards">
                      <div className="stat-card"><div className="stat-card-label">Your Blood Group</div><div className="stat-card-val red">A+</div><div className="stat-card-sub">Positive antigen</div></div>
                      <div className="stat-card"><div className="stat-card-label">Availability Status</div><div className="stat-card-val green">Active</div><div className="stat-card-sub">Visible to patients</div></div>
                      <div className="stat-card"><div className="stat-card-label">Total Donations</div><div className="stat-card-val">8</div><div className="stat-card-sub">Since registration</div></div>
                      <div className="stat-card"><div className="stat-card-label">Next Eligible</div><div className="stat-card-val blue">42d</div><div className="stat-card-sub">Last: 18 Aug 2026</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="card">
                          <div className="card-title">Recent Donation History <span className="action-link" onClick={() => go('my-profile')}>View All</span></div>
                          <div className="donation-list">
                              <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Khulna Medical College Hospital</div><div className="donation-meta">18 Aug 2026 · 1 unit · Emergency</div></div><span className="donation-badge">Completed</span></div>
                              <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Life Saver Central Blood Bank</div><div className="donation-meta">12 Jun 2026 · 1 unit · Routine</div></div><span className="donation-badge">Completed</span></div>
                              <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Sonadanga Blood Center</div><div className="donation-meta">05 Apr 2026 · 1 unit · Scheduled</div></div><span className="donation-badge">Completed</span></div>
                          </div>
                      </div>
                      <div className="card">
                          <div className="card-title">Nearby Emergency Requests <span className="action-link" onClick={() => go('emergency')}>Respond</span></div>
                          <div className="emergency-list">
                              <div className="emergency-item"><div className="emergency-blood">A+</div><div className="emergency-info"><div className="emergency-title">Khulna Medical College</div><div className="emergency-location">Sonadanga, Khulna · 2.3 km away</div></div><span className="badge badge-red" style={{ fontSize: '10px' }}>HIGH</span></div>
                              <div className="emergency-item"><div className="emergency-blood">O-</div><div className="emergency-info"><div className="emergency-title">Gazi Medical Hospital</div><div className="emergency-location">Boyra, Khulna · 5.1 km away</div></div><span className="badge badge-orange" style={{ fontSize: '10px' }}>MED</span></div>
                              <div className="emergency-item"><div className="emergency-blood">A+</div><div className="emergency-info"><div className="emergency-title">Khalishpur Clinic</div><div className="emergency-location">Khalishpur, Khulna · 7.8 km away</div></div><span className="badge badge-gray" style={{ fontSize: '10px' }}>LOW</span></div>
                          </div>
                      </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                      <div className="card">
                          <div className="card-title">Quick Actions</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                              <button className="btn btn-primary btn-full" onClick={() => go('my-profile')}>👤 My Profile</button>
                              <button className="btn btn-outline btn-full" onClick={() => go('search')}>🔍 Search Donors</button>
                              <button className="btn btn-gray btn-full" onClick={() => go('donor-stock')}>🩸 Blood Stock</button>
                              <button className="btn btn-full" style={{ background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA' }} onClick={() => go('emergency')}>🚨 Emergency</button>
                          </div>
                      </div>
                      <div className="card">
                          <div className="card-title">Recent Activity</div>
                          <div>
                              <div className="timeline-item"><div className="timeline-dot">✓</div><div className="timeline-content"><div className="timeline-title">You responded to an emergency request</div><div className="timeline-time">2 hours ago</div></div></div>
                              <div className="timeline-item"><div className="timeline-dot">🩸</div><div className="timeline-content"><div className="timeline-title">Profile verified by Admin</div><div className="timeline-time">1 day ago</div></div></div>
                              <div className="timeline-item"><div className="timeline-dot">❤</div><div className="timeline-content"><div className="timeline-title">Donation completed at KMCH</div><div className="timeline-time">3 days ago</div></div></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
