import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showBlood } from '../lib/utils'
import { ROUTES } from '../routes'

const MENU = [
  ['donor-dash', 'Dashboard'],
  ['my-profile', 'My Profile'],
  ['search', 'Search Donors'],
  ['donor-stock', 'Blood Stock'],
  ['emergency', 'Emergency Request'],
]

export default function DonorLayout({ active, children }) {
  const navigate = useNavigate()
  const { profile, signOut } = useAuth()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const logout = async () => { await signOut(); go('home') }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {profile && <span className="badge badge-red">{showBlood(profile.blood_group)}</span>}
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-800)' }}>{profile?.full_name ?? ''}</span>
                  <button className="btn btn-gray btn-sm" onClick={logout}>Logout</button>
              </div>
          </nav>
          <div className="dashboard-layout">
              <div className="sidebar">
                  <div className="sidebar-logo"><span><b>Life</b>Saver</span></div>
                  <div className="sidebar-section-label">Menu</div>
                  {MENU.map(([key, label]) => (
                    <div key={key} className={'sidebar-item' + (active === key ? ' active' : '')} onClick={() => go(key)}>
                        <span className="sidebar-icon">•</span> {label}
                    </div>
                  ))}
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>Account</div>
                  <div className={'sidebar-item' + (active === 'settings' ? ' active' : '')} onClick={() => go('settings')}><span className="sidebar-icon">•</span> Settings</div>
                  <div className="sidebar-item" onClick={logout}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">{children}</div>
          </div>
      </div>
    </div>
  )
}
