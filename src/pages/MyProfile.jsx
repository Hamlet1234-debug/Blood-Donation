import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import DonorLayout from '../components/DonorLayout'
import { showBlood, initials, fmtDate, nextEligible } from '../lib/utils'

const toForm = (p) => ({
  full_name: p.full_name ?? '',
  father_name: p.father_name ?? '',
  mother_name: p.mother_name ?? '',
  blood_group: p.blood_group ?? '',
  antigen: p.antigen ?? '',
  antibody: p.antibody ?? '',
  phone: p.phone ?? '',
  city: p.city ?? '',
  address: p.address ?? '',
  last_donated: p.last_donated ?? '',
})

export default function MyProfile() {
  const { showToast } = useApp()
  const { user, profile, refreshProfile } = useAuth()

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [donations, setDonations] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!profile) return
    setForm(toForm(profile))
    supabase.from('donations').select('*').eq('profile_id', profile.id)
      .order('donated_on', { ascending: false })
      .then(({ data }) => setDonations(data ?? []))
  }, [profile])

  if (!profile || !form) {
    return <DonorLayout active="my-profile"><div className="card">Profile paoa jay nai. Abar login koro.</div></DonorLayout>
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const elig = nextEligible(profile.last_donated)

  const cancel = () => { setForm(toForm(profile)); setEditing(false) }

  const save = async () => {
    if (!form.full_name.trim() || !form.phone.trim() || !form.city.trim())
      return showToast('Name, phone ar city dewa lagbe', 'error')
    if (!/^01\d{9}$/.test(form.phone.trim()))
      return showToast('Phone number 01XXXXXXXXX format e dao', 'error')

    setBusy(true)
    const { error } = await supabase.from('profiles').update({
      full_name: form.full_name.trim(),
      father_name: form.father_name.trim(),
      mother_name: form.mother_name.trim(),
      blood_group: form.blood_group,
      antigen: form.antigen.trim(),
      antibody: form.antibody.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      last_donated: form.last_donated || null,
    }).eq('user_id', user.id)
    setBusy(false)
    if (error) return showToast(error.message, 'error')
    await refreshProfile()
    setEditing(false)
    showToast('Profile updated!')
  }

  // text na input, editing mode onujayi
  const field = (label, key, opts = {}) => (
    <div className="info-block" style={opts.full ? { gridColumn: '1/-1' } : undefined}>
        <div className="info-block-label">{label}</div>
        <div className="info-block-value">
            {editing
              ? <input className="form-input" type={opts.type ?? 'text'} value={form[key]} onChange={set(key)} />
              : (opts.type === 'date' ? fmtDate(profile[key]) : (profile[key] || '-'))}
        </div>
    </div>
  )

  return (
    <DonorLayout active="my-profile">
      <div className="profile-hero">
          <div className="profile-avatar-large">{initials(profile.full_name)}</div>
          <div className="profile-hero-info">
              <h2>{profile.full_name}</h2>
              <p>Registered Blood Donor · Member since {fmtDate(profile.created_at)}</p>
              <div className="profile-hero-meta">
                  <span className="badge badge-red">{showBlood(profile.blood_group)} Blood Group</span>
                  <span className={'badge ' + (profile.is_available ? 'badge-green' : 'badge-gray')}>{profile.is_available ? '✓ Active Donor' : 'Paused'}</span>
                  <span className="badge badge-blue">{donations.length} Donations</span>
              </div>
          </div>
          {!editing
            ? <button className="btn btn-white btn-lg" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
            : <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-white btn-lg" onClick={save} disabled={busy}>{busy ? 'Saving...' : '💾 Save'}</button>
                  <button className="btn btn-gray btn-lg" onClick={cancel} disabled={busy}>Cancel</button>
              </div>}
      </div>

      <div className="card">
          <div className="card-title">Personal Information</div>
          <div className="info-grid">
              {field('Full Name', 'full_name')}
              {field("Father's Name", 'father_name')}
              {field("Mother's Name", 'mother_name')}
          </div>
      </div>

      <div className="card">
          <div className="card-title">Blood &amp; Medical Information</div>
          <div className="info-grid">
              <div className="info-block">
                  <div className="info-block-label">Blood Group</div>
                  <div className="info-block-value">
                      {editing ? (
                        <select className="form-select" value={form.blood_group} onChange={set('blood_group')}>
                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((g) => <option key={g} value={g}>{showBlood(g)}</option>)}
                        </select>
                      ) : <span className="badge badge-red">{showBlood(profile.blood_group)}</span>}
                  </div>
              </div>
              {field('Antigen', 'antigen')}
              {field('Antibody', 'antibody')}
              {field('Last Donation Date', 'last_donated', { type: 'date' })}
              <div className="info-block">
                  <div className="info-block-label">Next Eligible Date</div>
                  <div className="info-block-value" style={{ color: 'var(--green)' }}>{elig.date ? fmtDate(elig.date) : 'Eligible now'}</div>
              </div>
          </div>
      </div>

      <div className="card">
          <div className="card-title">Contact Information</div>
          <div className="info-grid">
              <div className="info-block"><div className="info-block-label">Email Address</div><div className="info-block-value">{profile.email || user?.email}</div></div>
              {field('Phone Number', 'phone')}
              {field('City / District', 'city')}
              {field('Full Address', 'address', { full: true })}
          </div>
      </div>

      <div className="card">
          <div className="card-title">Complete Donation History</div>
          <div className="donation-list">
              {donations.length === 0 && <p style={{ fontSize: '14px' }}>Ekhono kono donation record nai.</p>}
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
    </DonorLayout>
  )
}
