import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function SearchDonor() {
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
                  <a href="#" className="active">Search Donor</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('donor-stock') }}>Blood Stock</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('about') }}>About</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="badge badge-red">A+</span>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Hamlet</span>
              </div>
          </nav>
          <div style={{ background: 'var(--red)', padding: '22px 28px', color: '#fff' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '2px' }}>Search Blood Donors</h2>
              <p style={{ fontSize: '13px', opacity: '0.85' }}>Filter by blood group and city to find available donors near you</p>
          </div>
          <div className="search-filters">
              <div className="filter-group"><div className="filter-label">Blood Group</div>
                  <select className="form-select"><option>All Blood Groups</option><option>A+</option><option>A−</option><option>B+</option><option>B−</option><option>O+</option><option>O−</option><option>AB+</option><option>AB−</option></select>
              </div>
              <div className="filter-group"><div className="filter-label">City / Location</div><input className="form-input" placeholder="Enter city or district..." /></div>
              <button className="btn btn-primary">Search Donors</button>
              <button className="btn btn-gray">Clear Filters</button>
          </div>
          <div className="donor-list">
              <div className="results-bar"><div className="results-count"><span>4</span> donors found for A+ in Khulna</div><span className="toast success">Available: 4</span></div>
              <div className="donor-card"><div className="donor-avatar">HM</div><div className="donor-info"><div className="donor-name">Hamlet Mondal <span className="badge badge-red">A+</span></div><div className="donor-meta"><span>Sonadanga, Khulna</span><span><span className="available-dot"></span>Available</span><span>Last updated: 2 days ago</span></div></div><div className="donor-actions"><button className="btn btn-primary btn-sm" onClick={() => showToast("Connecting...", "success")}>Contact</button></div></div>
              <div className="donor-card"><div className="donor-avatar">FK</div><div className="donor-info"><div className="donor-name">Fatema Khatun <span className="badge badge-red">A+</span></div><div className="donor-meta"><span>Khalishpur, Khulna</span><span><span className="available-dot"></span>Available</span><span>Last updated: 5 days ago</span></div></div><div className="donor-actions"><button className="btn btn-primary btn-sm" onClick={() => showToast("Connecting...", "success")}>Contact</button></div></div>
              <div className="donor-card"><div className="donor-avatar">RI</div><div className="donor-info"><div className="donor-name">Rakibul Islam <span className="badge badge-red">A+</span></div><div className="donor-meta"><span>Daulatpur, Khulna</span><span><span className="available-dot"></span>Available</span><span>Last updated: 1 week ago</span></div></div><div className="donor-actions"><button className="btn btn-primary btn-sm" onClick={() => showToast("Connecting...", "success")}>Contact</button></div></div>
              <div className="donor-card" style={{ opacity: '0.65' }}><div className="donor-avatar">MH</div><div className="donor-info"><div className="donor-name">Mehedi Hasan <span className="badge badge-red">A+</span></div><div className="donor-meta"><span>Boyra, Khulna</span><span><span className="unavailable-dot"></span>Not available</span></div></div><div className="donor-actions"><button className="btn btn-gray btn-sm" disabled>Unavailable</button></div></div>
          </div>
      </div>
    </div>
  )
}
