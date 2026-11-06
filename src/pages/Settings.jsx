import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import DonorLayout from '../components/DonorLayout'

export default function Settings() {
  const { showToast } = useApp()
  const { user, profile, refreshProfile } = useAuth()

  const [phone, setPhone] = useState('')
  const [available, setAvailable] = useState('true')
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [busy, setBusy] = useState('')

  useEffect(() => {
    if (!profile) return
    setPhone(profile.phone ?? '')
    setAvailable(String(profile.is_available))
  }, [profile])

  if (!profile) {
    return <DonorLayout active="settings"><div className="card">Profile paoa jay nai. Abar login koro.</div></DonorLayout>
  }

  const updateProfile = async (changes, successMsg, key) => {
    setBusy(key)
    const { error } = await supabase.from('profiles').update(changes).eq('user_id', user.id)
    setBusy('')
    if (error) return showToast(error.message, 'error')
    await refreshProfile()
    showToast(successMsg)
  }

  const savePhone = () => {
    if (!/^01\d{9}$/.test(phone.trim())) return showToast('Phone number 01XXXXXXXXX format e dao', 'error')
    updateProfile({ phone: phone.trim() }, 'Phone number updated', 'phone')
  }

  const saveAvailability = () =>
    updateProfile({ is_available: available === 'true' }, 'Availability updated', 'avail')

  const changePassword = async () => {
    if (!pw.current || !pw.next) return showToast('Shob field puron koro', 'error')
    if (pw.next.length < 6) return showToast('New password komopokkhe 6 character', 'error')
    if (pw.next !== pw.confirm) return showToast('New password mile nai', 'error')

    setBusy('pw')
    const { error: e1 } = await supabase.auth.signInWithPassword({ email: user.email, password: pw.current })
    if (e1) {
      setBusy('')
      return showToast('Current password thik na', 'error')
    }
    const { error } = await supabase.auth.updateUser({ password: pw.next })
    setBusy('')
    if (error) return showToast(error.message, 'error')
    setPw({ current: '', next: '', confirm: '' })
    showToast('Password changed successfully')
  }

  const deactivate = () => {
    if (window.confirm('Account deactivate korle tumi search e dekha jabe na. Cholbe?')) {
      updateProfile({ is_available: false }, 'Account deactivated (availability off)', 'deact')
    }
  }

  const confirmDelete = () => {
    if (window.confirm('Account permanently delete korte admin er sathe jogajog korte hobe. Ok?')) {
      showToast('Account delete korte admin ke bolo', 'error')
    }
  }

  return (
    <DonorLayout active="settings">
      <div className="dash-header">
          <h2>Account Settings ⚙️</h2>
          <p>Manage your account preferences and security</p>
      </div>

      <div className="card">
          <div className="settings-section">
              <div className="settings-section-title">👤 Account Information</div>
              <div className="settings-section-desc">Email change kora jay na. Phone number update korte paro.</div>
              <div className="form-row">
                  <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-input" value={user?.email ?? ''} disabled />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
              </div>
              <button className="btn btn-primary" onClick={savePhone} disabled={busy === 'phone'}>{busy === 'phone' ? 'Saving...' : 'Save Changes'}</button>
          </div>
      </div>

      <div className="card">
          <div className="settings-section">
              <div className="settings-section-title">🩸 Availability</div>
              <div className="settings-section-desc">Paused korle tumi donor search ar emergency match e dekha jabe na</div>
              <div className="form-group">
                  <label className="form-label">Availability Status</label>
                  <select className="form-select" value={available} onChange={(e) => setAvailable(e.target.value)}>
                      <option value="true">Active — Available for donation</option>
                      <option value="false">Temporarily Unavailable</option>
                  </select>
              </div>
              <button className="btn btn-primary" onClick={saveAvailability} disabled={busy === 'avail'}>{busy === 'avail' ? 'Saving...' : 'Save Availability'}</button>
          </div>
      </div>

      <div className="card">
          <div className="settings-section">
              <div className="settings-section-title">🔒 Change Password</div>
              <div className="settings-section-desc">Keep your account secure with a strong password</div>
              <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-input" placeholder="Enter current password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
              </div>
              <div className="form-row">
                  <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-input" placeholder="Enter new password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
                  </div>
                  <div className="form-group">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" className="form-input" placeholder="Repeat new password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
                  </div>
              </div>
              <button className="btn btn-primary" onClick={changePassword} disabled={busy === 'pw'}>{busy === 'pw' ? 'Please wait...' : 'Update Password'}</button>
          </div>
      </div>

      <div className="card" style={{ borderColor: '#FECACA', background: '#FFF5F5' }}>
          <div className="settings-section">
              <div className="settings-section-title" style={{ color: '#DC2626' }}>⚠️ Danger Zone</div>
              <div className="settings-section-desc">Irreversible actions — proceed with caution</div>
              <div className="settings-row">
                  <div className="settings-row-info">
                      <div className="settings-row-label">Deactivate Account</div>
                      <div className="settings-row-desc">Search theke hide hoye jabe. Pore Availability theke abar Active korte paro.</div>
                  </div>
                  <button className="btn btn-gray" onClick={deactivate}>Deactivate</button>
              </div>
              <div className="settings-row">
                  <div className="settings-row-info">
                      <div className="settings-row-label">Delete Account</div>
                      <div className="settings-row-desc">Permanent delete korte admin er sathe jogajog koro.</div>
                  </div>
                  <button className="btn btn-danger" onClick={confirmDelete}>Delete Account</button>
              </div>
          </div>
      </div>
    </DonorLayout>
  )
}
