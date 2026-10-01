import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function Login() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div className="nav-btns"><button className="btn btn-primary btn-sm" onClick={() => go('register')}>Register as Donor</button></div>
          </nav>
          <div className="auth-page">
              <div className="auth-card">
                  <button className="auth-back" onClick={() => go('home')}>←</button>
                  <div className="auth-logo"><div className="auth-logo-icon">LS</div><div className="auth-title">Welcome Back</div><div className="auth-sub">Login to access your Life Saver account</div></div>
                  <div className="form-group"><label className="form-label">Email Address <span className="required">*</span></label><input type="email" className="form-input" placeholder="you@example.com" /></div>
                  <div className="form-group"><label className="form-label">Password <span className="required">*</span></label><input type="password" className="form-input" placeholder="Enter your password" /></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--gray-600)', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Remember me</label>
                      <a href="#" style={{ fontSize: '13px', color: 'var(--red)', textDecoration: 'none', fontWeight: '600' }}>Forgot password?</a>
                  </div>
                  <button className="btn btn-primary btn-full btn-lg" onClick={() => go('donor-dash')}>Login to Account</button>
                  <div className="divider"><hr /><span>OR</span><hr /></div>
                  <button className="btn btn-outline btn-full" onClick={() => go('admin-dash')} style={{ borderColor: 'var(--gray-300)', color: 'var(--gray-700)' }}>Continue as Admin</button>
                  <div className="auth-footer">Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); go('register') }}>Register as Donor</a></div>
              </div>
          </div>
      </div>
    </div>
  )
}
