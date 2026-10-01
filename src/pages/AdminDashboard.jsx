import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#FEF2F2', color: '#DC2626', padding: '3px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>ADMIN</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>Istyaque Ahammed</span>
                  <button className="btn btn-gray btn-sm" onClick={() => go('home')}>Logout</button>
              </div>
          </nav>
          <div className="dashboard-layout">
              <div className="sidebar">
                  <div className="sidebar-logo"><span><b>Life</b>Saver</span><div style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: '2px' }}>Admin Panel</div></div>
                  <div className="sidebar-section-label">Dashboard</div>
                  <div className="sidebar-item active" data-page="admin-dash"><span className="sidebar-icon">•</span> Dashboard</div>
                  <div className="sidebar-section-label">Manage</div>
                  <div className="sidebar-item" data-page="donor-mgmt" onClick={() => go('donor-mgmt')}><span className="sidebar-icon">•</span> All Donors</div>
                  <div className="sidebar-item" data-page="add-donor" onClick={() => go('add-donor')}><span className="sidebar-icon">•</span> Add New Donor</div>
                  <div className="sidebar-item" data-page="stock" onClick={() => go('stock')}><span className="sidebar-icon">•</span> Blood Stock</div>
                  <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Requests</div>
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>System</div>
                  <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                  <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">
                  <div className="dash-header"><h2>Admin Dashboard</h2><p>Overview of the Life Saver blood donation system</p></div>
                  <div className="admin-stat-cards">
                      <div className="admin-stat"><div className="admin-stat-label">Total Donors</div><div className="admin-stat-val red">512</div><div className="admin-stat-trend up">↑ +12 this week</div></div>
                      <div className="admin-stat"><div className="admin-stat-label">Available Now</div><div className="admin-stat-val green">438</div><div className="admin-stat-trend">85% of total</div></div>
                      <div className="admin-stat"><div className="admin-stat-label">Open Requests</div><div className="admin-stat-val orange">7</div><div className="admin-stat-trend" style={{ color: '#D97706' }}>Needs attention</div></div>
                      <div className="admin-stat"><div className="admin-stat-label">Blood Groups</div><div className="admin-stat-val blue">8</div><div className="admin-stat-trend">All types covered</div></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="card">
                          <div className="card-title">Blood Group Distribution</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '30px', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>O+</span><div style={{ flex: '1', height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '32%', height: '100%', background: 'var(--red)', borderRadius: '4px' }}></div></div><span style={{ fontSize: '12px', color: 'var(--gray-600)', width: '30px' }}>167</span></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '30px', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>A+</span><div style={{ flex: '1', height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '28%', height: '100%', background: '#EF4444', borderRadius: '4px' }}></div></div><span style={{ fontSize: '12px', color: 'var(--gray-600)', width: '30px' }}>142</span></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '30px', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>B+</span><div style={{ flex: '1', height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}><div style={{ width: '19%', height: '100%', background: '#F87171', borderRadius: '4px' }}></div></div><span style={{ fontSize: '12px', color: 'var(--gray-600)', width: '30px' }}>98</span></div>
                          </div>
                      </div>
                      <div className="card">
                          <div className="card-title">Recent Registrations</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '32px', height: '32px', background: 'var(--red-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>MR</div><div style={{ flex: '1' }}><div style={{ fontSize: '13px', fontWeight: '600' }}>Maksudur Rahman</div><div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>B+ • Khulna • 2 hrs ago</div></div><span className="badge badge-red" style={{ fontSize: '11px' }}>B+</span></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '32px', height: '32px', background: 'var(--red-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>SR</div><div style={{ flex: '1' }}><div style={{ fontSize: '13px', fontWeight: '600' }}>Sk. Fuadur Rahman</div><div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>O+ • Khulna • 5 hrs ago</div></div><span className="badge badge-red" style={{ fontSize: '11px' }}>O+</span></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
