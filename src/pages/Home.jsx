import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function Home() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo"><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div className="nav-links">
                  <a href="#" className="active">Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('search') }}>Search Donor</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('donor-stock') }}>Blood Groups</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('about') }}>About</a>
              </div>
              <div className="nav-btns">
                  <button className="btn btn-outline btn-sm" onClick={() => go('login')}>Login</button>
                  <button className="btn btn-primary btn-sm" onClick={() => go('register')}>Register as Donor</button>
              </div>
          </nav>
          <div className="hero">
              <div className="hero-badge">Emergency Blood Donation Platform</div>
              <h1>Save a Life,<br /><span>Donate Blood</span> Today</h1>
              <p>Find compatible blood donors instantly in your area during emergencies. Connect with 500+ registered donors across Bangladesh.</p>
              <div className="hero-btns">
                  <button className="btn btn-white btn-lg" onClick={() => go('search')}>Find Blood Donor</button>
                  <button className="btn btn-ghost btn-lg" onClick={() => go('register')}>Become a Donor</button>
              </div>
          </div>
          <div className="stats-bar">
              <div className="stat-item"><div className="stat-num">512</div><div className="stat-label">Registered Donors</div></div>
              <div className="stat-divider"></div>
              <div className="stat-item"><div className="stat-num">8</div><div className="stat-label">Blood Groups Available</div></div>
              <div className="stat-divider"></div>
              <div className="stat-item"><div className="stat-num">247</div><div className="stat-label">Lives Saved</div></div>
              <div className="stat-divider"></div>
              <div className="stat-item"><div className="stat-num">24/7</div><div className="stat-label">Emergency Support</div></div>
          </div>
          <div className="section">
              <div className="section-title">How <span>Life Saver</span> Works</div>
              <div className="section-sub">Three simple steps to find blood during any emergency</div>
              <div className="features-grid">
                  <div className="feature-card"><div className="feature-icon">1</div><div className="feature-title">Register as Donor</div><div className="feature-desc">Create your profile with blood group, contact info, and location. Be discoverable by thousands of patients who need your help.</div></div>
                  <div className="feature-card"><div className="feature-icon">2</div><div className="feature-title">Search by Blood Group</div><div className="feature-desc">Filter donors by blood group and city. Get instant results with contact information — no waiting, no middlemen.</div></div>
                  <div className="feature-card"><div className="feature-icon">3</div><div className="feature-title">Connect &amp; Save a Life</div><div className="feature-desc">Contact the donor directly using their phone number. Simple, fast, and direct — because every second counts in an emergency.</div></div>
              </div>
          </div>
          <div className="blood-groups-section">
              <div className="section-title">All Blood Groups Available</div>
              <div className="section-sub">Click any blood group to find available donors instantly</div>
              <div className="blood-groups-grid">
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">A+</div><div className="bg-label">142 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">A−</div><div className="bg-label">28 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">B+</div><div className="bg-label">98 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">B−</div><div className="bg-label">19 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">O+</div><div className="bg-label">167 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">O−</div><div className="bg-label">31 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">AB+</div><div className="bg-label">22 donors</div></div>
                  <div className="blood-group-card" onClick={() => go('search')}><div className="bg-type">AB−</div><div className="bg-label">5 donors</div></div>
              </div>
          </div>
          <div className="emergency-banner">
              <div><h3>Need Blood Urgently Right Now?</h3><p>Submit an emergency blood request — we'll show you matching donors in your area immediately.</p></div>
              <button className="btn btn-white btn-lg" onClick={() => go('emergency')}>Submit Emergency Request</button>
          </div>
          <div className="footer">
              <div><div className="footer-brand"><span>Life</span>Saver</div><div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '2px' }}>Emergency Blood Donation Platform — Bangladesh</div></div>
              <div className="footer-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); go('home') }}>Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('search') }}>Search Donor</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('register') }}>Register</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('about') }}>About</a>
              </div>
              <div className="footer-copy">© 2026 Life Saver · CSE-3108 Group-3</div>
          </div>
      </div>
    </div>
  )
}
