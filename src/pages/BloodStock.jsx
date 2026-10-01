import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function BloodStock() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [stock, setStock] = useState([
    { group: 'A+', qty: 45 }, { group: 'A−', qty: 4 },
    { group: 'B+', qty: 32 }, { group: 'B−', qty: 3 },
    { group: 'O+', qty: 58 }, { group: 'O−', qty: 18 },
    { group: 'AB+', qty: 12 }, { group: 'AB−', qty: 7 },
  ])
  const change = (group, delta) =>
    setStock((prev) => prev.map((s) => (s.group === group ? { ...s, qty: Math.max(0, s.qty + delta) } : s)))
  const lowCount = stock.filter((s) => s.qty < 5).length

  return (
    <div className="page">
              <div className="screen">
                  <nav className="navbar">
                      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ background: '#FEF2F2', color: '#DC2626', padding: '3px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>ADMIN</span>
                      </div>
                  </nav>
                  <div className="dashboard-layout">
                      <div className="sidebar">
                          <div className="sidebar-logo"><span><b>Life</b>Saver</span><div style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: '2px' }}>Admin Panel</div></div>
                          <div className="sidebar-section-label">Dashboard</div>
                          <div className="sidebar-item" data-page="admin-dash" onClick={() => go('admin-dash')}><span className="sidebar-icon">•</span> Dashboard</div>
                          <div className="sidebar-section-label">Manage</div>
                          <div className="sidebar-item" data-page="donor-mgmt" onClick={() => go('donor-mgmt')}><span className="sidebar-icon">•</span> All Donors</div>
                          <div className="sidebar-item" data-page="add-donor" onClick={() => go('add-donor')}><span className="sidebar-icon">•</span> Add New Donor</div>
                          <div className="sidebar-item active" data-page="stock"><span className="sidebar-icon">•</span> Blood Stock</div>
                          <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Requests</div>
                          <div className="sidebar-section-label" style={{ marginTop: '20px' }}>System</div>
                          <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                          <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
                      </div>
                      <div className="dashboard-main">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                              <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>Blood Stock Management</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Last updated: Today at 10:30 AM · <strong style={{ color: 'var(--red)' }}>Admin edit mode</strong></p></div>
                              <span className={"toast " + (lowCount > 0 ? "error" : "success")}>{lowCount} groups low on stock</span>
                          </div>
                          <div className="stock-grid">
      {stock.map((s) => {
        const low = s.qty < 5
        return (
          <div className={'stock-card ' + (low ? 'low' : 'ok')} key={s.group}>
            <div className="stock-group">{s.group}</div>
            <div className="stock-label">Blood Group</div>
            <div className={'stock-status ' + (low ? 'low' : 'ok')}>{low ? 'Low Stock' : 'Good Stock'}</div>
            <div className="stock-qty">{s.qty}</div>
            <div className="stock-unit">units available</div>
            <div className="stock-btns">
              <button className="stock-btn minus" onClick={() => change(s.group, -1)}>−</button>
              <button className="stock-btn plus" onClick={() => change(s.group, 1)}>+</button>
            </div>
          </div>
        )
      })}
      </div>
                      </div>
                  </div>
              </div>
    </div>
  )
}
