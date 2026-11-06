import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../routes'

const SECTIONS = [
  ['Dashboard', [['admin-dash', 'Dashboard']]],
  ['Manage', [
    ['donor-mgmt', 'All Donors'],
    ['add-donor', 'Add New Donor'],
    ['stock', 'Blood Stock'],
    ['admin-requests', 'Emergency Requests'],
  ]],
  ['System', [['search', 'Search Donors']]],
]

export default function AdminLayout({ active, children }) {
  const navigate = useNavigate()
  const { profile, signOut } = useAuth()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const logout = async () => { await signOut(); go('home') }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#FEF2F2', color: '#DC2626', padding: '3px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>ADMIN</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{profile?.full_name ?? ''}</span>
                  <button className="btn btn-gray btn-sm" onClick={logout}>Logout</button>
              </div>
          </nav>
          <div className="dashboard-layout">
              <div className="sidebar">
                  <div className="sidebar-logo"><span><b>Life</b>Saver</span><div style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: '2px' }}>Admin Panel</div></div>
                  {SECTIONS.map(([label, items]) => (
                    <div key={label}>
                        <div className="sidebar-section-label">{label}</div>
                        {items.map(([key, text]) => (
                          <div key={key} className={'sidebar-item' + (active === key ? ' active' : '')} onClick={() => go(key)}>
                              <span className="sidebar-icon">•</span> {text}
                          </div>
                        ))}
                    </div>
                  ))}
                  <div className="sidebar-item" onClick={logout}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">{children}</div>
          </div>
      </div>
    </div>
  )
}
