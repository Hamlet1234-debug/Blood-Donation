import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import { normalizeBlood } from '../lib/utils'
import { ROUTES } from '../routes'

const EMPTY = { name: '', email: '', father: '', mother: '', blood: '', antigen: '', antibody: '', phone: '', city: '', address: '', password: '', confirm: '' }

export default function Register() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleRegister = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.blood || !form.phone.trim() || !form.city.trim() || !form.password)
      return showToast('Required field gulo puron koro', 'error')
    if (!/^01\d{9}$/.test(form.phone.trim()))
      return showToast('Contact number 01XXXXXXXXX format e dao', 'error')
    if (form.password.length < 6)
      return showToast('Password komopokkhe 6 character', 'error')
    if (form.password !== form.confirm)
      return showToast('Password mile nai', 'error')

    setBusy(true)
    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          full_name: form.name.trim(),
          father_name: form.father.trim(),
          mother_name: form.mother.trim(),
          blood_group: normalizeBlood(form.blood),
          phone: form.phone.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
        },
      },
    })
    if (error) {
      setBusy(false)
      return showToast(error.message, 'error')
    }

    if (data.session && (form.antigen.trim() || form.antibody.trim())) {
      await supabase.from('profiles')
        .update({ antigen: form.antigen.trim(), antibody: form.antibody.trim() })
        .eq('user_id', data.user.id)
    }
    setBusy(false)

    if (data.session) {
      showToast('Registration successful!')
      go('donor-dash')
    } else {
      showToast('Email e confirmation link pathano hoyeche')
      go('login')
    }
  }

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
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Full Name <span className="required">*</span></label><input className="form-input" placeholder="Your full name" value={form.name} onChange={set('name')} /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Email Address <span className="required">*</span></label><input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={set('email')} /></div>
                      </div>
                      <div className="form-row" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Father's Name</label><input className="form-input" placeholder="Father's full name" value={form.father} onChange={set('father')} /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Mother's Name</label><input className="form-input" placeholder="Mother's full name" value={form.mother} onChange={set('mother')} /></div>
                      </div>
                      <div className="form-row-3" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Blood Group <span className="required">*</span></label>
                              <select className="form-select" value={form.blood} onChange={set('blood')}>
                                  <option value="">Select group</option>
                                  <option value="A+">A+</option><option value="A-">A−</option>
                                  <option value="B+">B+</option><option value="B-">B−</option>
                                  <option value="O+">O+</option><option value="O-">O−</option>
                                  <option value="AB+">AB+</option><option value="AB-">AB−</option>
                              </select>
                          </div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Antigen</label><input className="form-input" placeholder="e.g. Positive" value={form.antigen} onChange={set('antigen')} /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Antibody</label><input className="form-input" placeholder="e.g. Anti-B" value={form.antibody} onChange={set('antibody')} /></div>
                      </div>
                      <div className="form-row" style={{ marginBottom: '16px' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Contact Number <span className="required">*</span></label><input className="form-input" placeholder="01XXXXXXXXX" value={form.phone} onChange={set('phone')} /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">City / District <span className="required">*</span></label><input className="form-input" placeholder="e.g. Khulna" value={form.city} onChange={set('city')} /></div>
                      </div>
                      <div className="form-group"><label className="form-label">Full Address</label><input className="form-input" placeholder="House no, Road, Area, District" value={form.address} onChange={set('address')} /></div>
                      <div className="form-row" style={{ marginBottom: '0' }}>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Password <span className="required">*</span></label><input type="password" className="form-input" placeholder="Create a strong password" value={form.password} onChange={set('password')} /></div>
                          <div className="form-group" style={{ margin: '0' }}><label className="form-label">Confirm Password <span className="required">*</span></label><input type="password" className="form-input" placeholder="Repeat your password" value={form.confirm} onChange={set('confirm')} /></div>
                      </div>
                      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <button className="btn btn-gray" style={{ flex: '1' }} onClick={() => go('home')}>Back</button>
                          <button className="btn btn-primary" style={{ flex: '2' }} onClick={handleRegister} disabled={busy}>{busy ? 'Please wait...' : 'Complete Registration'}</button>
                      </div>
                      <div className="auth-footer" style={{ marginTop: '16px' }}>Already a donor? <a href="#" onClick={(e) => { e.preventDefault(); go('login') }}>Login here</a></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}