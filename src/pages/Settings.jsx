import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function Settings() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const confirmDeleteAccount = () => {
    if (window.confirm('⚠️ WARNING: This will permanently delete your account and all associated data.\n\nThis action CANNOT be undone.\n\nAre you absolutely sure?')) {
      showToast('Account deletion requires super-admin approval', 'error')
    }
  }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span className="badge badge-red">A+</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-800)' }}>Hamlet Mondal</span>
                  <button className="btn btn-gray btn-sm" onClick={() => go('home')}>Logout</button>
              </div>
          </nav>
          <div className="dashboard-layout">
              <div className="sidebar">
                  <div className="sidebar-logo"><span><b>Life</b>Saver</span></div>
                  <div className="sidebar-section-label">Menu</div>
                  <div className="sidebar-item" data-page="donor-dash" onClick={() => go('donor-dash')}><span className="sidebar-icon">•</span> Dashboard</div>
                  <div className="sidebar-item" data-page="my-profile" onClick={() => go('my-profile')}><span className="sidebar-icon">•</span> My Profile</div>
                  <div className="sidebar-item" data-page="search" onClick={() => go('search')}><span className="sidebar-icon">•</span> Search Donors</div>
                  <div className="sidebar-item" data-page="donor-stock" onClick={() => go('donor-stock')}><span className="sidebar-icon">•</span> Blood Stock</div>
                  <div className="sidebar-item" data-page="emergency" onClick={() => go('emergency')}><span className="sidebar-icon">•</span> Emergency Request</div>
                  <div className="sidebar-section-label" style={{ marginTop: '20px' }}>Account</div>
                  <div className="sidebar-item active" data-page="settings"><span className="sidebar-icon">•</span> Settings</div>
                  <div className="sidebar-item" onClick={() => go('home')}><span className="sidebar-icon">•</span> Logout</div>
              </div>
              <div className="dashboard-main">
                  <div className="dash-header">
                      <h2>Account Settings ⚙️</h2>
                      <p>Manage your account preferences, security, and notifications</p>
                  </div>
                  <div className="card">
                      <div className="settings-section">
                          <div className="settings-section-title">👤 Account Information</div>
                          <div className="settings-section-desc">Update your basic account details</div>
                          <div className="form-row">
                              <div className="form-group">
                                  <label className="form-label">Email Address</label>
                                  <input type="email" className="form-input" defaultValue="hamlet.mondal@gmail.com" />
                              </div>
                              <div className="form-group">
                                  <label className="form-label">Phone Number</label>
                                  <input type="tel" className="form-input" defaultValue="01712345678" />
                              </div>
                          </div>
                          <button className="btn btn-primary" onClick={() => showToast("Account information updated successfully", "success")}>Save Changes</button>
                      </div>
                  </div>
                  <div className="card">
                      <div className="settings-section">
                          <div className="settings-section-title">🔒 Change Password</div>
                          <div className="settings-section-desc">Keep your account secure with a strong password</div>
                          <div className="form-group">
                              <label className="form-label">Current Password</label>
                              <input type="password" className="form-input" placeholder="Enter current password" />
                          </div>
                          <div className="form-row">
                              <div className="form-group">
                                  <label className="form-label">New Password</label>
                                  <input type="password" className="form-input" placeholder="Enter new password" />
                              </div>
                              <div className="form-group">
                                  <label className="form-label">Confirm New Password</label>
                                  <input type="password" className="form-input" placeholder="Repeat new password" />
                              </div>
                          </div>
                          <button className="btn btn-primary" onClick={() => showToast("Password changed successfully", "success")}>Update Password</button>
                      </div>
                  </div>
                  <div className="card">
                      <div className="settings-section">
                          <div className="settings-section-title">🔔 Notification Preferences</div>
                          <div className="settings-section-desc">Choose how you want to be notified about important updates</div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Emergency Blood Requests</div>
                                  <div className="settings-row-desc">Get notified when your blood group is needed nearby</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
                          </div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Email Notifications</div>
                                  <div className="settings-row-desc">Receive important updates via email</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
                          </div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">SMS Alerts</div>
                                  <div className="settings-row-desc">Get text messages for urgent requests</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" /><span className="toggle-slider"></span></label>
                          </div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Donation Reminders</div>
                                  <div className="settings-row-desc">Reminders when you become eligible to donate again</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
                          </div>
                      </div>
                  </div>
                  <div className="card">
                      <div className="settings-section">
                          <div className="settings-section-title">🛡️ Privacy Settings</div>
                          <div className="settings-section-desc">Control who can see your profile information</div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Profile Visibility</div>
                                  <div className="settings-row-desc">Allow other users to find your profile</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
                          </div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Show Phone Number</div>
                                  <div className="settings-row-desc">Display your phone number on your public profile</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
                          </div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Show Email Address</div>
                                  <div className="settings-row-desc">Display your email on your public profile</div>
                              </div>
                              <label className="toggle-switch"><input type="checkbox" /><span className="toggle-slider"></span></label>
                          </div>
                      </div>
                  </div>
                  <div className="card">
                      <div className="settings-section">
                          <div className="settings-section-title">🎨 Display &amp; Preferences</div>
                          <div className="settings-section-desc">Customize your experience</div>
                          <div className="form-row">
                              <div className="form-group">
                                  <label className="form-label">Language</label>
                                  <select className="form-select" defaultValue="English"><option>English</option><option>বাংলা (Bangla)</option></select>
                              </div>
                              <div className="form-group">
                                  <label className="form-label">Time Zone</label>
                                  <select className="form-select" defaultValue="Dhaka (GMT+6)"><option>Dhaka (GMT+6)</option><option>Kolkata (GMT+5:30)</option></select>
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="form-label">Availability Status</label>
                              <select className="form-select" defaultValue="Active — Available for donation">
                                  <option>Active — Available for donation</option>
                                  <option>Temporarily Unavailable</option>
                                  <option>Inactive</option>
                              </select>
                          </div>
                          <button className="btn btn-primary" onClick={() => showToast("Preferences saved successfully", "success")}>Save Preferences</button>
                      </div>
                  </div>
                  <div className="card" style={{ borderColor: '#FECACA', background: '#FFF5F5' }}>
                      <div className="settings-section">
                          <div className="settings-section-title" style={{ color: '#DC2626' }}>⚠️ Danger Zone</div>
                          <div className="settings-section-desc">Irreversible actions — proceed with caution</div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Deactivate Account</div>
                                  <div className="settings-row-desc">Temporarily disable your account. You can reactivate anytime.</div>
                              </div>
                              <button className="btn btn-gray" onClick={() => showToast("Account deactivation requires admin approval", "error")}>Deactivate</button>
                          </div>
                          <div className="settings-row">
                              <div className="settings-row-info">
                                  <div className="settings-row-label">Delete Account</div>
                                  <div className="settings-row-desc">Permanently delete your account and all associated data.</div>
                              </div>
                              <button className="btn btn-danger" onClick={confirmDeleteAccount}>Delete Account</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
