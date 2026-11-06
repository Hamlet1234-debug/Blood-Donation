import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import DonorLayout from '../components/DonorLayout'
import { showBlood, canDonateTo, fmtDate, nextEligible } from '../lib/utils'
import { ROUTES } from '../routes'

const URGENCY_BADGE = { High: 'badge-red', Medium: 'badge-orange', Low: 'badge-gray' }

export default function DonorDashboard() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const { profile } = useAuth()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [donations, setDonations] = useState([])
  const [donationCount, setDonationCount] = useState(0)
  const [requests, setRequests] = useState([])
  const [contacts, setContacts] = useState({})

  useEffect(() => {
    if (!profile) return
    supabase.from('donations').select('*', { count: 'exact' })
      .eq('profile_id', profile.id)
      .order('donated_on', { ascending: false }).limit(3)
      .then(({ data, count }) => { setDonations(data ?? []); setDonationCount(count ?? 0) })

    supabase.from('open_requests').select('*')
      .in('blood_group', canDonateTo(profile.blood_group))
      .ilike('city', `%${profile.city}%`)
      .order('created_at', { ascending: false }).limit(5)
      .then(({ data }) => setRequests(data ?? []))
  }, [profile])

  const respond = async (id) => {
    const { data, error } = await supabase.rpc('get_request_contact', { req: id })
    if (error || !data?.length) return showToast('Contact paoa jay nai', 'error')
    setContacts((c) => ({ ...c, [id]: data[0] }))
  }

  if (!profile) {
    return <DonorLayout active="donor-dash"><div className="card">Profile paoa jay nai. Abar login koro.</div></DonorLayout>
  }

  const elig = nextEligible(profile.last_donated)

  return (
    <DonorLayout active="donor-dash">
      <div className="dash-header">
          <h2>Welcome back, {profile.full_name.split(' ')[0]} 👋</h2>
          <p>Here's an overview of your donor activity and nearby emergency requests.</p>
      </div>
      <div className="stat-cards">
          <div className="stat-card"><div className="stat-card-label">Your Blood Group</div><div className="stat-card-val red">{showBlood(profile.blood_group)}</div><div className="stat-card-sub">{profile.antigen || 'Antigen not set'}</div></div>
          <div className="stat-card"><div className="stat-card-label">Availability Status</div><div className={'stat-card-val ' + (profile.is_available ? 'green' : '')}>{profile.is_available ? 'Active' : 'Paused'}</div><div className="stat-card-sub">{profile.is_available ? 'Visible to patients' : 'Hidden from search'}</div></div>
          <div className="stat-card"><div className="stat-card-label">Total Donations</div><div className="stat-card-val">{donationCount}</div><div className="stat-card-sub">Since registration</div></div>
          <div className="stat-card"><div className="stat-card-label">Next Eligible</div><div className="stat-card-val blue">{elig.days === 0 ? 'Now' : `${elig.days}d`}</div><div className="stat-card-sub">{profile.last_donated ? `Last: ${fmtDate(profile.last_donated)}` : 'No donation yet'}</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="card">
              <div className="card-title">Recent Donation History <span className="action-link" onClick={() => go('my-profile')}>View All</span></div>
              <div className="donation-list">
                  {donations.length === 0 && <p style={{ fontSize: '14px' }}>Ekhono kono donation record nai. Donate korle admin ekhane add korbe.</p>}
                  {donations.map((d) => (
                    <div className="donation-item" key={d.id}>
                        <div className="donation-icon">❤</div>
                        <div className="donation-details">
                            <div className="donation-title">{d.place || 'Blood donation'}</div>
                            <div className="donation-meta">{fmtDate(d.donated_on)}{d.note ? ` · ${d.note}` : ''}</div>
                        </div>
                        <span className="donation-badge">Completed</span>
                    </div>
                  ))}
              </div>
          </div>
          <div className="card">
              <div className="card-title">Nearby Emergency Requests <span className="action-link" onClick={() => go('emergency')}>New Request</span></div>
              <div className="emergency-list">
                  {requests.length === 0 && <p style={{ fontSize: '14px' }}>Tomar blood group er jonno {profile.city} e ekhon kono open request nai.</p>}
                  {requests.map((r) => (
                    <div className="emergency-item" key={r.id}>
                        <div className="emergency-blood">{showBlood(r.blood_group)}</div>
                        <div className="emergency-info">
                            <div className="emergency-title">{contacts[r.id] ? contacts[r.id].requester_name : 'Blood needed'}</div>
                            <div className="emergency-location">{r.city} · {fmtDate(r.created_at)}</div>
                            {contacts[r.id] && <a href={`tel:${contacts[r.id].contact}`} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--red)' }}>{contacts[r.id].contact}</a>}
                        </div>
                        <span className={'badge ' + (URGENCY_BADGE[r.urgency] ?? 'badge-gray')} style={{ fontSize: '10px' }}>{r.urgency.toUpperCase()}</span>
                        {!contacts[r.id] && <button className="btn btn-primary btn-sm" onClick={() => respond(r.id)}>Respond</button>}
                    </div>
                  ))}
              </div>
          </div>
      </div>
      <div className="card" style={{ marginTop: '16px' }}>
          <div className="card-title">Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
              <button className="btn btn-primary btn-full" onClick={() => go('my-profile')}>👤 My Profile</button>
              <button className="btn btn-outline btn-full" onClick={() => go('search')}>🔍 Search Donors</button>
              <button className="btn btn-gray btn-full" onClick={() => go('donor-stock')}>🩸 Blood Stock</button>
              <button className="btn btn-full" style={{ background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA' }} onClick={() => go('emergency')}>🚨 Emergency</button>
          </div>
      </div>
    </DonorLayout>
  )
}
