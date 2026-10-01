import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function DonorManagement() {
  const navigate = useNavigate()
  const { showToast, donors, deleteDonor, totalCount } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleDelete = (d) => {
    if (!window.confirm(`Delete donor "${d.name}"?\n\nThis action cannot be undone.`)) return
    deleteDonor(d.id)
    showToast(`Donor "${d.name}" deleted`, 'success')
  }

  return (
    <div className="page">
              <div className="screen">
                  <nav className="navbar">
                      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ background: '#FEF2F2', color: '#DC2626', padding: '3px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>ADMIN</span>
                          <span style={{ fontSize: '14px', fontWeight: '600' }}>Istyaque Ahammed</span>
                      </div>
                  </nav>
                  <div className="dashboard-layout">
                      <div className="sidebar">
                          <div className="sidebar-logo"><span><b>Life</b>Saver</span><div style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: '2px' }}>Admin Panel</div></div>
                          <div className="sidebar-section-label">Dashboard</div>
                          <div className="sidebar-item" data-page="admin-dash" onClick={() => go('admin-dash')}><span className="sidebar-icon">•</span> Dashboard</div>
                          <div className="sidebar-section-label">Manage</div>
                          <div className="sidebar-item active" data-page="donor-mgmt"><span className="sidebar-icon">•</span> All Donors</div>
                          <div className="sidebar-item" data-page="add-donor" onClick={() => go('add-donor')}><span className="sidebar-icon">•</span> Add New Donor</div>
                          <div className="sidebar-item" data-page="stock" onClick={() => go('stock')}><span className="sidebar-icon">•</span> Blood Stock</div>
                          <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Requests</div>
                          <div className="sidebar-section-label" style={{ marginTop: '20px' }}>System</div>
                          <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                          <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
                      </div>
                      <div className="dashboard-main">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                              <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>All Donors</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Manage donor records — {totalCount} total registered</p></div>
                              <button className="btn btn-primary" onClick={() => go('add-donor')}>➕ Add New Donor</button>
                          </div>
                          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                  <input className="form-input" placeholder="Search by name..." style={{ flex: '1', minWidth: '140px', margin: '0' }} />
                                  <select className="form-select" style={{ width: '150px' }}><option>All Blood Groups</option><option>A+</option><option>B+</option><option>O+</option></select>
                                  <input className="form-input" placeholder="City..." style={{ width: '130px', margin: '0' }} />
                              </div>
                              <div className="table-wrapper">
                                  <table id="donorTable">
                                      <thead><tr><th>#</th><th>Name</th><th>Blood Group</th><th>Contact</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
                                      <tbody>
      {donors.length === 0 ? (
        <tr><td colSpan="7"><div className="empty-state"><div className="empty-state-icon">📭</div><div className="empty-state-title">No donors found</div><div className="empty-state-desc">All donor records deleted.</div></div></td></tr>
      ) : (
        donors.map((d, i) => (
          <tr key={d.id}>
            <td>{String(i + 1).padStart(3, '0')}</td>
            <td className="td-name">{d.name}</td>
            <td><span className={'badge ' + (d.blood.includes('−') || d.blood.includes('-') ? 'badge-gray' : 'badge-red')}>{d.blood}</span></td>
            <td>{d.contact}</td>
            <td>{d.city}</td>
            <td><span className={'toast ' + (d.status === 'Available' ? 'success' : 'info')}>{d.status}</span></td>
            <td>
              <div className="action-btns">
                <button className="btn btn-gray btn-sm" onClick={() => showToast('Edit mode for ' + d.name, 'success')}>Edit</button>
                <button className="btn-delete-row" onClick={() => handleDelete(d)}>🗑 Delete</button>
              </div>
            </td>
          </tr>
        ))
      )}
      </tbody>
                                  </table>
                              </div>
                              <div style={{ padding: '12px 20px', borderTop: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                  <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Showing 1–{donors.length} of {totalCount}</span>
                                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                      <button className="btn btn-gray btn-sm">Previous</button>
                                      <button className="btn btn-primary btn-sm">1</button>
                                      <button className="btn btn-gray btn-sm">2</button>
                                      <button className="btn btn-gray btn-sm">3</button>
                                      <button className="btn btn-gray btn-sm">Next</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
    </div>
  )
}
