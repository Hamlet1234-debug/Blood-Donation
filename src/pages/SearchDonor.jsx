import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { showBlood, initials } from '../lib/utils'
import { ROUTES } from '../routes'

export default function SearchDonor() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const { user, profile } = useAuth()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [blood, setBlood] = useState('')
  const [city, setCity] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState({})

  const search = useCallback(async (b, c) => {
    setLoading(true)
    let q = supabase.from('public_donors').select('*')
    if (b) q = q.eq('blood_group', b)
    if (c.trim()) q = q.ilike('city', `%${c.trim()}%`)
    const { data, error } = await q
      .order('is_available', { ascending: false })
      .order('full_name')
      .limit(50)
    setLoading(false)
    if (error) return showToast(error.message, 'error')
    setResults(data ?? [])
  }, [showToast])

  useEffect(() => { search('', '') }, [search])

  const clearFilters = () => { setBlood(''); setCity(''); search('', '') }

  const showContact = async (id) => {
    if (!user) {
      showToast('Contact dekhte age login koro', 'error')
      return go('login')
    }
    const { data, error } = await supabase.rpc('get_donor_contact', { donor: id })
    if (error || !data) return showToast('Contact paoa jay nai', 'error')
    setContacts((c) => ({ ...c, [id]: data }))
  }

  const availableCount = results.filter((d) => d.is_available).length

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
              {profile ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="badge badge-red">{showBlood(profile.blood_group)}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{profile.full_name.split(' ')[0]}</span>
                </div>
              ) : (
                <div className="nav-btns"><button className="btn btn-outline btn-sm" onClick={() => go('login')}>Login</button></div>
              )}
          </nav>
          <div style={{ background: 'var(--red)', padding: '22px 28px', color: '#fff' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '2px' }}>Search Blood Donors</h2>
              <p style={{ fontSize: '13px', opacity: '0.85' }}>Filter by blood group and city to find available donors near you</p>
          </div>
          <div className="search-filters">
              <div className="filter-group"><div className="filter-label">Blood Group</div>
                  <select className="form-select" value={blood} onChange={(e) => setBlood(e.target.value)}>
                      <option value="">All Blood Groups</option>
                      <option value="A+">A+</option><option value="A-">A−</option>
                      <option value="B+">B+</option><option value="B-">B−</option>
                      <option value="O+">O+</option><option value="O-">O−</option>
                      <option value="AB+">AB+</option><option value="AB-">AB−</option>
                  </select>
              </div>
              <div className="filter-group"><div className="filter-label">City / Location</div><input className="form-input" placeholder="Enter city or district..." value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search(blood, city)} /></div>
              <button className="btn btn-primary" onClick={() => search(blood, city)}>Search Donors</button>
              <button className="btn btn-gray" onClick={clearFilters}>Clear Filters</button>
          </div>
          <div className="donor-list">
              <div className="results-bar">
                  <div className="results-count"><span>{results.length}</span> donors found{blood && ` for ${showBlood(blood)}`}{city.trim() && ` in ${city.trim()}`}</div>
                  <span className="toast success">Available: {availableCount}</span>
              </div>
              {loading && <div style={{ padding: 20 }}>Loading...</div>}
              {!loading && results.length === 0 && <div style={{ padding: 20 }}>Kono donor paoa jay nai.</div>}
              {results.map((d) => (
                <div className="donor-card" key={d.id} style={d.is_available ? undefined : { opacity: '0.65' }}>
                    <div className="donor-avatar">{initials(d.full_name)}</div>
                    <div className="donor-info">
                        <div className="donor-name">{d.full_name} <span className="badge badge-red">{showBlood(d.blood_group)}</span></div>
                        <div className="donor-meta">
                            <span>{d.city}</span>
                            <span><span className={d.is_available ? 'available-dot' : 'unavailable-dot'}></span>{d.is_available ? 'Available' : 'Not available'}</span>
                            {d.last_donated && <span>Last donated: {d.last_donated}</span>}
                        </div>
                    </div>
                    <div className="donor-actions">
                        {!d.is_available ? (
                          <button className="btn btn-gray btn-sm" disabled>Unavailable</button>
                        ) : contacts[d.id] ? (
                          <a className="btn btn-primary btn-sm" href={`tel:${contacts[d.id]}`}>{contacts[d.id]}</a>
                        ) : (
                          <button className="btn btn-primary btn-sm" onClick={() => showContact(d.id)}>Contact</button>
                        )}
                    </div>
                </div>
              ))}
          </div>
      </div>
    </div>
  )
}
