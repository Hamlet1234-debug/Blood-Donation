import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function Emergency() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [urgency, setUrgency] = useState('High')

  return (
    <div className="page">
              <div className="screen">
                  <nav className="navbar">
                      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
                      <div className="nav-links">
                          <a href="#" onClick={(e) => { e.preventDefault(); go('home') }}>Home</a>
                          <a href="#" onClick={(e) => { e.preventDefault(); go('search') }}>Search</a>
                          <a href="#" className="active">Emergency</a>
                          <a href="#" onClick={(e) => { e.preventDefault(); go('about') }}>About</a>
                      </div>
                  </nav>
                  <div className="emergency-page">
                      <div className="emergency-top"><h2>Emergency Blood Request</h2><p>Submit your request — we'll show matching available donors in your area immediately</p></div>
                      <div className="emergency-layout">
                          <div>
                              <div className="card">
                                  <div className="card-title">Request Details</div>
                                  <div className="form-group"><label className="form-label">Your Name <span className="required">*</span></label><input className="form-input" placeholder="Requester's full name" /></div>
                                  <div className="form-group"><label className="form-label">Contact Number <span className="required">*</span></label><input className="form-input" placeholder="01XXXXXXXXX" /></div>
                                  <div className="form-group"><label className="form-label">Required Blood Group <span className="required">*</span></label>
                                      <select className="form-select"><option>Select blood group</option><option>O+</option><option>O−</option><option>A+</option><option>A−</option><option>B+</option><option>B−</option><option>AB+</option><option>AB−</option></select>
                                  </div>
                                  <div className="form-group"><label className="form-label">City / Location <span className="required">*</span></label><input className="form-input" placeholder="Where do you need blood?" /></div>
                                  <div className="form-group"><label className="form-label">Urgency Level <span className="required">*</span></label>
                                      <div className="urgency-options">
      {['Low', 'Medium', 'High'].map((level) => {
        const cls = { Low: 'selected-low', Medium: 'selected-med', High: 'selected-high' }[level]
        return (
          <button
            key={level}
            className={'urgency-btn ' + (urgency === level ? cls : '')}
            onClick={() => setUrgency(level)}
          >
            {level}
          </button>
        )
      })}
      </div>
                                  </div>
                                  <button className="btn btn-full btn-lg" style={{ background: '#DC2626' }} onClick={() => showToast(`Searching ${urgency.toLowerCase()}-priority donors...`, 'success')}>Find Donors Now</button>
                              </div>
                          </div>
                          <div>
                              <div className="card">
                                  <div className="card-title">Matching Donors — O+ in Khulna</div>
                                  <span className="toast success" style={{ marginBottom: '16px', display: 'inline-flex' }}>3 donors found immediately</span>
                                  <div className="donor-card" style={{ borderColor: 'var(--green)', background: 'var(--green-bg)' }}><div className="donor-avatar">RI</div><div className="donor-info"><div className="donor-name">Rakibul Islam <span className="badge badge-red">O+</span></div><div className="donor-meta"><span>Sonadanga, Khulna</span><span><span className="available-dot"></span>Available Now</span></div></div><button className="btn btn-primary btn-sm" style={{ background: '#DC2626' }}>Call Now</button></div>
                                  <div className="donor-card"><div className="donor-avatar">SA</div><div className="donor-info"><div className="donor-name">Sumaiya Akter <span className="badge badge-red">O+</span></div><div className="donor-meta"><span>Boyra, Khulna</span><span><span className="available-dot"></span>Available</span></div></div><button className="btn btn-primary btn-sm" style={{ background: '#DC2626' }}>Call Now</button></div>
                                  <div className="donor-card"><div className="donor-avatar">MH</div><div className="donor-info"><div className="donor-name">Mehedi Hasan <span className="badge badge-red">O+</span></div><div className="donor-meta"><span>Khalishpur, Khulna</span><span><span className="available-dot"></span>Available</span></div></div><button className="btn btn-primary btn-sm" style={{ background: '#DC2626' }}>Call Now</button></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
    </div>
  )
}
