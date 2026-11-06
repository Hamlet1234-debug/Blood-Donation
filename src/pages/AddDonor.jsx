import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AdminLayout from '../components/AdminLayout'
import { ROUTES } from '../routes'

const EMPTY = { name: '', email: '', father: '', mother: '', blood: '', antigen: '', antibody: '', contact: '', city: '', address: '' }

export default function AddDonor() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleAddDonor = async () => {
    if (!form.name.trim()) return showToast("Please enter the donor's full name", 'error')
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return showToast('Please enter a valid email address', 'error')
    if (!form.blood) return showToast('Please select a blood group', 'error')
    if (!/^01\d{9}$/.test(form.contact.trim())) return showToast('Contact number 01XXXXXXXXX format e dao', 'error')
    if (!form.city.trim()) return showToast('Please enter the city', 'error')

    setBusy(true)
    const { error } = await supabase.from('profiles').insert({
      full_name: form.name.trim(),
      email: form.email.trim() || null,
      father_name: form.father.trim() || null,
      mother_name: form.mother.trim() || null,
      blood_group: form.blood,
      antigen: form.antigen.trim() || null,
      antibody: form.antibody.trim() || null,
      phone: form.contact.trim(),
      city: form.city.trim(),
      address: form.address.trim() || null,
    })
    setBusy(false)
    if (error) return showToast(error.message, 'error')
    showToast(`New donor "${form.name.trim()}" added successfully`)
    setForm(EMPTY)
    setTimeout(() => go('donor-mgmt'), 800)
  }

  return (
    <AdminLayout active="add-donor">
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
              <div className="toast info" style={{ marginBottom: '16px', display: 'block' }}>ℹ️ Admin er add kora donor er login account hobe na. Donor nije login korte chaile alada kore Register korbe.</div>
              <div className="form-row" style={{ marginBottom: '16px' }}>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Full Name <span className="required">*</span></label><input className="form-input" value={form.name} onChange={set('name')} placeholder="Enter full name" /></div>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Email Address</label><input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" /></div>
              </div>
              <div className="form-row" style={{ marginBottom: '16px' }}>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Father's Name</label><input className="form-input" value={form.father} onChange={set('father')} placeholder="Father's full name" /></div>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Mother's Name</label><input className="form-input" value={form.mother} onChange={set('mother')} placeholder="Mother's full name" /></div>
              </div>
              <div className="form-row-3" style={{ marginBottom: '16px' }}>
                  <div className="form-group" style={{ margin: '0' }}>
                      <label className="form-label">Blood Group <span className="required">*</span></label>
                      <select className="form-select" value={form.blood} onChange={set('blood')}>
                          <option value="">Select group</option>
                          <option value="A+">A+</option><option value="A-">A−</option>
                          <option value="B+">B+</option><option value="B-">B−</option>
                          <option value="O+">O+</option><option value="O-">O−</option>
                          <option value="AB+">AB+</option><option value="AB-">AB−</option>
                      </select>
                  </div>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Antigen</label><input className="form-input" value={form.antigen} onChange={set('antigen')} placeholder="e.g. Positive" /></div>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Antibody</label><input className="form-input" value={form.antibody} onChange={set('antibody')} placeholder="e.g. Anti-B" /></div>
              </div>
              <div className="form-row" style={{ marginBottom: '16px' }}>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">Contact Number <span className="required">*</span></label><input className="form-input" value={form.contact} onChange={set('contact')} placeholder="01XXXXXXXXX" /></div>
                  <div className="form-group" style={{ margin: '0' }}><label className="form-label">City / District <span className="required">*</span></label><input className="form-input" value={form.city} onChange={set('city')} placeholder="e.g. Khulna" /></div>
              </div>
              <div className="form-group"><label className="form-label">Full Address</label><input className="form-input" value={form.address} onChange={set('address')} placeholder="House no, Road, Area, District" /></div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn btn-gray" style={{ flex: '1' }} onClick={() => go('donor-mgmt')}>Cancel</button>
                  <button className="btn btn-primary" style={{ flex: '2' }} onClick={handleAddDonor} disabled={busy}>{busy ? 'Adding...' : '➕ Add Donor'}</button>
              </div>
          </div>
      </div>
    </AdminLayout>
  )
}
