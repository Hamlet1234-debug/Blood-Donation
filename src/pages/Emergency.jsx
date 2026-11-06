import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { canReceiveFrom, showBlood, initials } from '../lib/utils'
import { ROUTES } from '../routes'

export default function Emergency() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const { user } = useAuth()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [urgency, setUrgency] = useState('High')
  const [form, setForm] = useState({ name: '', contact: '', blood: '', city: '' })
  const [busy, setBusy] = useState(false)
  const [matches, setMatches] = useState(null)
  const [searched, setSearched] = useState({ blood: '', city: '' })
  const [contacts, setContacts] = useState({})
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name.trim() || !form.contact.trim() || !form.blood || !form.city.trim())
      return showToast('Required field gulo puron koro', 'error')
    if (!/^01\d{9}$/.test(form.contact.trim()))
      return showToast('Contact number 01XXXXXXXXX format e dao', 'error')

    setBusy(true)
    const { error } = await supabase.from('emergency_requests').insert({
      requester_id: user?.id ?? null,
      requester_name: form.name.trim(),
      contact: form.contact.trim(),
      blood_group: form.blood,
      urgency,
      city: form.city.trim(),
    })
    if (error) {
      setBusy(false)
      return showToast(error.message, 'error')
    }

    const { data, error: e2 } = await supabase
      .from('public_donors').select('*')
      .in('blood_group', canReceiveFrom(form.blood))
      .eq('is_available', true)
      .ilike('city', `%${form.city.trim()}%`)
      .limit(20)
    setBusy(false)
    if (e2) return showToast(e2.message, 'error')

    setMatches(data ?? [])
    setSearched({ blood: form.blood, city: form.city.trim() })
    showToast('Request submitted!')
  }

  const callNow = async (id) => {
    if (!user) {
      showToast('Number dekhte age login koro', 'error')
      return go('login')
    }
    const { data, error } = await supabase.rpc('get_donor_contact', { donor: id })
    if (error || !data) return showToast('Contact paoa jay nai', 'error')
    setContacts((c) => ({ ...c, [id]: data }))
  }

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
                          <div className="form-group"><label className="form-label">Your Name <span className="required">*</span></label><input className="form-input" placeholder="Requester's full name" value={form.name} onChange={set('name')} /></div>
                          <div className="form-group"><label className="form-label">Contact Number <span className="required">*</span></label><input className="form-input" placeholder="01XXXXXXXXX" value={form.contact} onChange={set('contact')} /></div>
                          <div className="form-group"><label className="form-label">Required Blood Group <span className="required">*</span></label>
                              <select className="form-select" value={form.blood} onChange={set('blood')}>
                                  <option value="">Select blood group</option>
                                  <option value="O+">O+</option><option value="O-">O−</option>
                                  <option value="A+">A+</option><option value="A-">A−</option>
                                  <option value="B+">B+</option><option value="B-">B−</option>
                                  <option value="AB+">AB+</option><option value="AB-">AB−</option>
                              </select>
                          </div>
                          <div className="form-group"><label className="form-label">City / Location <span className="required">*</span></label><input className="form-input" placeholder="Where do you need blood?" value={form.city} onChange={set('city')} /></div>
                          <div className="form-group"><label className="form-label">Urgency Level <span className="required">*</span></label>
                              <div className="urgency-options">
                                  {['Low', 'Medium', 'High'].map((level) => {
                                    const cls = { Low: 'selected-low', Medium: 'selected-med', High: 'selected-high' }[level]
                                    return (
                                      <button key={level} className={'urgency-btn ' + (urgency === level ? cls : '')} onClick={() => setUrgency(level)}>{level}</button>
                                    )
                                  })}
                              </div>
                          </div>
                          <button className="btn btn-full btn-lg" style={{ background: '#DC2626' }} onClick={submit} disabled={busy}>{busy ? 'Please wait...' : 'Find Donors Now'}</button>
                      </div>
                  </div>
                  <div>
                      <div className="card">
                          {matches === null ? (
                            <>
                              <div className="card-title">Matching Donors</div>
                              <p style={{ fontSize: '14px' }}>Form submit korle ekhane available donor der list dekhabe.</p>
                            </>
                          ) : (
                            <>
                              <div className="card-title">Matching Donors — {showBlood(searched.blood)} in {searched.city}</div>
                              <span className="toast success" style={{ marginBottom: '16px', display: 'inline-flex' }}>{matches.length} donors found</span>
                              {matches.length === 0 && <p style={{ fontSize: '14px' }}>Ei area te ekhon kono available donor nai. Admin ke request pathano hoyeche.</p>}
                              {matches.map((d) => (
                                <div className="donor-card" key={d.id}>
                                    <div className="donor-avatar">{initials(d.full_name)}</div>
                                    <div className="donor-info">
                                        <div className="donor-name">{d.full_name} <span className="badge badge-red">{showBlood(d.blood_group)}</span></div>
                                        <div className="donor-meta"><span>{d.city}</span><span><span className="available-dot"></span>Available</span></div>
                                    </div>
                                    {contacts[d.id] ? (
                                      <a className="btn btn-primary btn-sm" style={{ background: '#DC2626' }} href={`tel:${contacts[d.id]}`}>{contacts[d.id]}</a>
                                    ) : (
                                      <button className="btn btn-primary btn-sm" style={{ background: '#DC2626' }} onClick={() => callNow(d.id)}>Call Now</button>
                                    )}
                                </div>
                              ))}
                            </>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
