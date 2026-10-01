import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function AddDonor() {
  const navigate = useNavigate()
  const { showToast, addDonor } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [form, setForm] = useState({
    name: '', email: '', father: '', mother: '', blood: '', antigen: '',
    antibody: '', contact: '', city: '', address: '', password: '', passwordConfirm: '',
  })
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleAddDonor = () => {
    if (!form.name.trim()) return showToast("Please enter the donor's full name", 'error')
    if (!form.email.trim()) return showToast('Please enter the email address', 'error')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return showToast('Please enter a valid email address', 'error')
    if (!form.blood) return showToast('Please select a blood group', 'error')
    if (!form.contact.trim()) return showToast('Please enter the contact number', 'error')
    if (!form.city.trim()) return showToast('Please enter the city', 'error')
    if (!form.password) return showToast('Please set a password', 'error')
    if (form.password !== form.passwordConfirm) return showToast('Passwords do not match', 'error')

    addDonor({
      name: form.name.trim(),
      blood: form.blood,
      contact: form.contact.trim(),
      city: form.city.trim(),
      status: 'Available',
    })
    showToast(`New donor "${form.name.trim()}" added successfully`, 'success')
    setForm({
      name: '', email: '', father: '', mother: '', blood: '', antigen: '',
      antibody: '', contact: '', city: '', address: '', password: '', passwordConfirm: '',
    })
    setTimeout(() => go('donor-mgmt'), 800)
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
                  <div className="sidebar-item" data-page="donor-mgmt" onClick={() => go('donor-mgmt')}><span className="sidebar-icon">•</span> All Donors</div>
                  <div className="sidebar-item active" data-page="add-donor"><span className="sidebar-icon">•</span> Add New Donor</div>
                  <div className="sidebar-item" data-page="stock" onClick={() => go('stock')}><span className="sidebar-icon">•</span> Blood Stock</div>
                  <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Requests</div>
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>System</div>
                  <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                  <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">
                  <div className="dash-header">
                      <h2>➕ Add New Donor</h2>
                      <p>Register a new blood donor into the system</p>
                  </div>
                  <div className="register-card" style={{ maxWidth: '100%', margin: '0' }}>
                      <div className="register-header">
                          <h2>New Donor Registration</h2>
                          <p>All fields marked with <span style={{ color: '#FECACA' }}>*</span> are required</p>
                      </div>
                      <div className="register-body">
                          <div className="form-row" style={{ marginBottom: '16px' }}>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Full Name <span className="required">*</span></label>
                                  <input className="form-input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Enter full name" />
                              </div>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Email Address <span className="required">*</span></label>
                                  <input className="form-input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" />
                              </div>
                          </div>
                          <div className="form-row" style={{ marginBottom: '16px' }}>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Father's Name</label>
                                  <input className="form-input" value={form.father} onChange={(e) => set("father", e.target.value)} placeholder="Father's full name" />
                              </div>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Mother's Name</label>
                                  <input className="form-input" value={form.mother} onChange={(e) => set("mother", e.target.value)} placeholder="Mother's full name" />
                              </div>
                          </div>
                          <div className="form-row-3" style={{ marginBottom: '16px' }}>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Blood Group <span className="required">*</span></label>
                                  <select className="form-select" value={form.blood} onChange={(e) => set("blood", e.target.value)}>
                                      <option value="">Select group</option>
                                      <option>A+</option><option>A−</option>
                                      <option>B+</option><option>B−</option>
                                      <option>O+</option><option>O−</option>
                                      <option>AB+</option><option>AB−</option>
                                  </select>
                              </div>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Antigen</label>
                                  <input className="form-input" value={form.antigen} onChange={(e) => set("antigen", e.target.value)} placeholder="e.g. Positive" />
                              </div>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Antibody</label>
                                  <input className="form-input" value={form.antibody} onChange={(e) => set("antibody", e.target.value)} placeholder="e.g. Anti-B" />
                              </div>
                          </div>
                          <div className="form-row" style={{ marginBottom: '16px' }}>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Contact Number <span className="required">*</span></label>
                                  <input className="form-input" value={form.contact} onChange={(e) => set("contact", e.target.value)} placeholder="01XXXXXXXXX" />
                              </div>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">City / District <span className="required">*</span></label>
                                  <input className="form-input" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Khulna" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="form-label">Full Address</label>
                              <input className="form-input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="House no, Road, Area, District" />
                          </div>
                          <div className="form-row" style={{ marginBottom: '0' }}>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Temporary Password <span className="required">*</span></label>
                                  <input type="password" className="form-input" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Create a strong password" />
                              </div>
                              <div className="form-group" style={{ margin: '0' }}>
                                  <label className="form-label">Confirm Password <span className="required">*</span></label>
                                  <input type="password" className="form-input" value={form.passwordConfirm} onChange={(e) => set("passwordConfirm", e.target.value)} placeholder="Repeat password" />
                              </div>
                          </div>
                          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                              <button className="btn btn-gray" style={{ flex: '1' }} onClick={() => go('donor-mgmt')}>Cancel</button>
                              <button className="btn btn-primary" style={{ flex: '2' }} onClick={handleAddDonor}>➕ Add Donor</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
