import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { showBlood } from '../lib/utils'
import { ROUTES } from '../routes'

const ORDER = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const LOW_LIMIT = 5

export default function BloodGroups() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const { profile, signOut } = useAuth()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('blood_stock').select('*').then(({ data, error }) => {
      if (error) showToast(error.message, 'error')
      setStock((data ?? []).sort((a, b) => ORDER.indexOf(a.blood_group) - ORDER.indexOf(b.blood_group)))
      setLoading(false)
    })
  }, [showToast])

  const lastUpdated = stock.length
    ? new Date(Math.max(...stock.map((s) => new Date(s.updated_at)))).toLocaleString()
    : '-'

  const logout = async () => { await signOut(); go('home') }

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
              {profile ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="badge badge-red">{showBlood(profile.blood_group)}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{profile.full_name.split(' ')[0]}</span>
                </div>
              ) : (
                <div className="nav-btns"><button className="btn btn-outline btn-sm" onClick={() => go('login')}>Login</button></div>
              )}
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
                  {profile && <div className="sidebar-item" onClick={logout}><span className="sidebar-icon">•</span> Logout</div>}
              </div>
              <div className="dashboard-main">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                      <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>Blood Stock Availability</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Last updated: {lastUpdated}</p></div>
                      <span className="toast info">ℹ️ View only · Contact admin to update</span>
                  </div>
                  {loading && <div>Loading...</div>}
                  <div className="stock-grid">
                      {stock.map((s) => {
                        const low = s.qty < LOW_LIMIT
                        const cls = low ? 'low' : 'ok'
                        return (
                          <div className={`stock-card ${cls}`} key={s.blood_group}>
                              <div className="stock-group">{showBlood(s.blood_group)}</div>
                              <div className="stock-label">Blood Group</div>
                              <div className={`stock-status ${cls}`}>{low ? 'Low Stock' : 'Good Stock'}</div>
                              <div className="stock-qty">{s.qty}</div>
                              <div className="stock-unit">units available</div>
                          </div>
                        )
                      })}
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
