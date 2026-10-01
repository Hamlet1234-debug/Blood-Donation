import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function MyProfile() {
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
                  <div className="sidebar-item" data-page="donor-dash" onClick={() => go('donor-dash')}><span className="sidebar-icon">•</span> Dashboard</div>
                  <div className="sidebar-item active" data-page="my-profile"><span className="sidebar-icon">•</span> My Profile</div>
                  <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                  <div className="sidebar-item" data-page="donor-stock" onClick={() => go('donor-stock')}><span className="sidebar-icon">•</span> Blood Stock</div>
                  <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Request</div>
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>Account</div>
                  <div className="sidebar-item" data-page="settings" onClick={() => go('settings')}><span className="sidebar-icon">•</span> Settings</div>
                  <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">
                  <div className="profile-hero">
                      <div className="profile-avatar-large">HM</div>
                      <div className="profile-hero-info">
                          <h2>Hamlet Mondal</h2>
                          <p>Registered Blood Donor · Member since January 2024</p>
                          <div className="profile-hero-meta">
                              <span className="badge badge-red">A+ Blood Group</span>
                              <span className="badge badge-green">✓ Active Donor</span>
                              <span className="badge badge-blue">8 Donations</span>
                          </div>
                      </div>
                      <button className="btn btn-white btn-lg" onClick={() => showToast("Profile edit mode opened", "success")}>✏️ Edit Profile</button>
                  </div>
                  <div className="card">
                      <div className="card-title">Personal Information <span className="action-link" onClick={() => showToast("Edit personal info", "success")}>Edit</span></div>
                      <div className="info-grid">
                          <div className="info-block"><div className="info-block-label">Full Name</div><div className="info-block-value">Hamlet Mondal</div></div>
                          <div className="info-block"><div className="info-block-label">Father's Name</div><div className="info-block-value">Md. Abdul Mondal</div></div>
                          <div className="info-block"><div className="info-block-label">Mother's Name</div><div className="info-block-value">Mrs. Rahima Khatun</div></div>
                          <div className="info-block"><div className="info-block-label">Date of Birth</div><div className="info-block-value">15 March 2003</div></div>
                          <div className="info-block"><div className="info-block-label">Gender</div><div className="info-block-value">Male</div></div>
                          <div className="info-block"><div className="info-block-label">National ID</div><div className="info-block-value">•••• •••• 5678</div></div>
                      </div>
                  </div>
                  <div className="card">
                      <div className="card-title">Blood &amp; Medical Information <span className="action-link" onClick={() => showToast("Edit medical info", "success")}>Edit</span></div>
                      <div className="info-grid">
                          <div className="info-block"><div className="info-block-label">Blood Group</div><div className="info-block-value"><span className="badge badge-red">A+</span></div></div>
                          <div className="info-block"><div className="info-block-label">Antigen</div><div className="info-block-value">Positive</div></div>
                          <div className="info-block"><div className="info-block-label">Antibody</div><div className="info-block-value">Anti-B</div></div>
                          <div className="info-block"><div className="info-block-label">Weight</div><div className="info-block-value">72 kg</div></div>
                          <div className="info-block"><div className="info-block-label">Last Donation Date</div><div className="info-block-value">18 August 2026</div></div>
                          <div className="info-block"><div className="info-block-label">Next Eligible Date</div><div className="info-block-value" style={{ color: 'var(--green)' }}>18 October 2026</div></div>
                      </div>
                  </div>
                  <div className="card">
                      <div className="card-title">Contact Information <span className="action-link" onClick={() => showToast("Edit contact info", "success")}>Edit</span></div>
                      <div className="info-grid">
                          <div className="info-block"><div className="info-block-label">Email Address</div><div className="info-block-value">hamlet.mondal@gmail.com</div></div>
                          <div className="info-block"><div className="info-block-label">Phone Number</div><div className="info-block-value">01712345678</div></div>
                          <div className="info-block"><div className="info-block-label">Alternative Phone</div><div className="info-block-value">01987654321</div></div>
                          <div className="info-block"><div className="info-block-label">City / District</div><div className="info-block-value">Khulna</div></div>
                          <div className="info-block"><div className="info-block-label">Area / Upazila</div><div className="info-block-value">Sonadanga</div></div>
                          <div className="info-block"><div className="info-block-label">Postal Code</div><div className="info-block-value">9100</div></div>
                          <div className="info-block" style={{ gridColumn: '1/-1' }}><div className="info-block-label">Full Address</div><div className="info-block-value">House 12, Road 5, Sonadanga, Khulna - 9100</div></div>
                      </div>
                  </div>
                  <div className="card">
                      <div className="card-title">Complete Donation History</div>
                      <div className="donation-list">
                          <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Khulna Medical College Hospital</div><div className="donation-meta">18 Aug 2026 · 1 unit · Emergency Response</div></div><span className="donation-badge">Completed</span></div>
                          <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Life Saver Central Blood Bank</div><div className="donation-meta">12 Jun 2026 · 1 unit · Routine Donation</div></div><span className="donation-badge">Completed</span></div>
                          <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Sonadanga Blood Center</div><div className="donation-meta">05 Apr 2026 · 1 unit · Routine Donation</div></div><span className="donation-badge">Completed</span></div>
                          <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Gazi Medical Hospital</div><div className="donation-meta">20 Jan 2026 · 1 unit · Emergency Response</div></div><span className="donation-badge">Completed</span></div>
                          <div className="donation-item"><div className="donation-icon">❤</div><div className="donation-details"><div className="donation-title">Khulna Red Crescent</div><div className="donation-meta">14 Nov 2025 · 1 unit · Routine Donation</div></div><span className="donation-badge">Completed</span></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
