import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function Register() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div className="nav-btns"><button className="btn btn-outline btn-sm" onClick={() => go('login')}>Login</button></div>
          </nav>
          <div className="register-page">
              <div className="register-card">
                  <button className="register-back" onClick={() => go('home')}>←</button>
                  <div className="register-header"><h2>Register as Blood Donor</h2><p>Fill in your details to join the Life Saver donor community</p></div>
                  <div className="register-body">
                      <div className="step-indicator">
                          <div className="step"><div className="step-num done">✔</div><div className="step-label">Personal Info</div></div>
                          <div className="step-line done"></div>
                          <div className="step"><div className="step-num">2</div><div className="step-label">Blood Info</div></div>
                          <div className="step-line"></div>
                          <div className="step"><div className="step-num inactive">3</div><div className="step-label inactive">Contact</div></div>
                      </div>
                      <div className="form-row" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Full Name <span className="required">*</span></label><input className="form-input" placeholder="Your full name" /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Email Address <span className="required">*</span></label><input className="form-input" type="email" placeholder="email@example.com" /></div>
                      </div>
                      <div className="form-row" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Father's Name</label><input className="form-input" placeholder="Father's full name" /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Mother's Name</label><input className="form-input" placeholder="Mother's full name" /></div>
                      </div>
                      <div className="form-row-3" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Blood Group <span className="required">*</span></label>
                              <select className="form-select"><option>Select group</option><option>A+</option><option>A−</option><option>B+</option><option>B−</option><option>O+</option><option>O−</option><option>AB+</option><option>AB−</option></select>
                          </div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Antigen</label><input className="form-input" placeholder="e.g. Positive" /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Antibody</label><input className="form-input" placeholder="e.g. Anti-B" /></div>
                      </div>
                      <div className="form-row" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Contact Number <span className="required">*</span></label><input className="form-input" placeholder="01XXXXXXXXX" /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">City / District <span className="required">*</span></label><input className="form-input" placeholder="e.g. Khulna" /></div>
                      </div>
                      <div className="form-group"><label className="form-label">Full Address</label><input className="form-input" placeholder="House no, Road, Area, District" /></div>
                      <div className="form-row" style={{ marginBottom: '0' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Password <span className="required">*</span></label><input type="password" className="form-input" placeholder="Create a strong password" /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Confirm Password <span className="required">*</span></label><input type="password" className="form-input" placeholder="Repeat your password" /></div>
                      </div>
                      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <button className="btn btn-gray" style={{ flex: '1' }}>Back</button>
                          <button className="btn btn-primary" style={{ flex: '2' }} onClick={() => go('donor-dash')}>Complete Registration</button>
                      </div>
                      <div className="auth-footer" style={{ marginTop: '16px' }}>Already a donor? <a href="#" onClick={(e) => { e.preventDefault(); go('login') }}>Login here</a></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
