import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AdminLayout from '../components/AdminLayout'
import Modal from '../components/Modal'
import { showBlood } from '../lib/utils'
import { ROUTES } from '../routes'

const PAGE_SIZE = 10
const GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const today = () => new Date().toISOString().slice(0, 10)

export default function DonorManagement() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [blood, setBlood] = useState('')
  const [city, setCity] = useState('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [donationFor, setDonationFor] = useState(null)
  const [dform, setDform] = useState({ place: '', date: today(), note: '' })
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('profiles').select('*')
      .order('created_at', { ascending: false }).limit(1000)
    setLoading(false)
    if (error) return showToast(error.message, 'error')
    setRows(data ?? [])
  }, [showToast])

  useEffect(() => { load() }, [load])

  const filtered = useMemo(() => rows.filter((r) =>
    (!q.trim() || r.full_name.toLowerCase().includes(q.trim().toLowerCase())) &&
    (!blood || r.blood_group === blood) &&
    (!city.trim() || (r.city || '').toLowerCase().includes(city.trim().toLowerCase()))
  ), [rows, q, blood, city])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const start = (current - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  const handleDelete = async (d) => {
    const msg = d.user_id
      ? `"${d.full_name}" nije register kora donor. Profile delete korle o login thakbe kintu profile thakbe na. Better: Edit e giye Unavailable koro.\n\nTao delete korbe?`
      : `Delete donor "${d.full_name}"?\n\nThis action cannot be undone.`
    if (!window.confirm(msg)) return
    const { data, error } = await supabase.from('profiles').delete().eq('id', d.id).select()
    if (error) return showToast(error.message, 'error')
    if (!data?.length) return showToast('Delete kora jay nai (permission nai)', 'error')
    setRows((prev) => prev.filter((r) => r.id !== d.id))
    showToast(`Donor "${d.full_name}" deleted`)
  }

  const saveEdit = async () => {
    const e = editing
    if (!e.full_name.trim() || !e.phone.trim() || !e.city.trim()) return showToast('Name, phone ar city dewa lagbe', 'error')
    if (!/^01\d{9}$/.test(e.phone.trim())) return showToast('Phone number 01XXXXXXXXX format e dao', 'error')
    setBusy(true)
    const { data, error } = await supabase.from('profiles').update({
      full_name: e.full_name.trim(),
      blood_group: e.blood_group,
      phone: e.phone.trim(),
      city: e.city.trim(),
      is_available: e.is_available,
    }).eq('id', e.id).select()
    setBusy(false)
    if (error) return showToast(error.message, 'error')
    if (!data?.length) return showToast('Update kora jay nai (permission nai)', 'error')
    setRows((prev) => prev.map((r) => (r.id === e.id ? data[0] : r)))
    setEditing(null)
    showToast('Donor updated')
  }

  const saveDonation = async () => {
    if (!dform.date) return showToast('Date dao', 'error')
    setBusy(true)
    const { error } = await supabase.from('donations').insert({
      profile_id: donationFor.id,
      donated_on: dform.date,
      place: dform.place.trim() || null,
      note: dform.note.trim() || null,
    })
    if (error) { setBusy(false); return showToast(error.message, 'error') }
    if (!donationFor.last_donated || dform.date > donationFor.last_donated) {
      await supabase.from('profiles').update({ last_donated: dform.date }).eq('id', donationFor.id)
    }
    setBusy(false)
    setDonationFor(null)
    setDform({ place: '', date: today(), note: '' })
    showToast('Donation record added')
    load()
  }

  const onFilter = (setter) => (e) => { setter(e.target.value); setPage(1) }

  return (
    <AdminLayout active="donor-mgmt">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>All Donors</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Manage donor records — {rows.length} total registered</p></div>
          <button className="btn btn-primary" onClick={() => go('add-donor')}>➕ Add New Donor</button>
      </div>
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input className="form-input" placeholder="Search by name..." style={{ flex: '1', minWidth: '140px', margin: '0' }} value={q} onChange={onFilter(setQ)} />
              <select className="form-select" style={{ width: '150px' }} value={blood} onChange={onFilter(setBlood)}>
                  <option value="">All Blood Groups</option>
                  {GROUPS.map((g) => <option key={g} value={g}>{showBlood(g)}</option>)}
              </select>
              <input className="form-input" placeholder="City..." style={{ width: '130px', margin: '0' }} value={city} onChange={onFilter(setCity)} />
          </div>
          <div className="table-wrapper">
              <table id="donorTable">
                  <thead><tr><th>#</th><th>Name</th><th>Blood Group</th><th>Contact</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading && <tr><td colSpan="7" style={{ padding: 20 }}>Loading...</td></tr>}
                    {!loading && visible.length === 0 && (
                      <tr><td colSpan="7"><div className="empty-state"><div className="empty-state-icon">📭</div><div className="empty-state-title">No donors found</div><div className="empty-state-desc">Filter change kore dekho.</div></div></td></tr>
                    )}
                    {visible.map((d, i) => (
                      <tr key={d.id}>
                        <td>{String(start + i + 1).padStart(3, '0')}</td>
                        <td className="td-name">{d.full_name}{d.role === 'admin' && <span className="badge badge-gray" style={{ marginLeft: 6 }}>admin</span>}</td>
                        <td><span className="badge badge-red">{showBlood(d.blood_group)}</span></td>
                        <td>{d.phone}</td>
                        <td>{d.city}</td>
                        <td><span className={'toast ' + (d.is_available ? 'success' : 'info')}>{d.is_available ? 'Available' : 'Unavailable'}</span></td>
                        <td>
                          <div className="action-btns">
                            <button className="btn btn-gray btn-sm" onClick={() => setDonationFor(d)}>+ Donation</button>
                            <button className="btn btn-gray btn-sm" onClick={() => setEditing({ ...d })}>Edit</button>
                            {d.role !== 'admin' && <button className="btn-delete-row" onClick={() => handleDelete(d)}>🗑 Delete</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                  {filtered.length === 0 ? 'Showing 0' : `Showing ${start + 1}–${start + visible.length}`} of {filtered.length}
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button className="btn btn-gray btn-sm" disabled={current <= 1} onClick={() => setPage(current - 1)}>Previous</button>
                  <span style={{ fontSize: '13px' }}>Page {current} / {pages}</span>
                  <button className="btn btn-gray btn-sm" disabled={current >= pages} onClick={() => setPage(current + 1)}>Next</button>
              </div>
          </div>
      </div>

      {editing && (
        <Modal title={`Edit: ${editing.full_name}`} onClose={() => setEditing(null)}>
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={editing.full_name} onChange={(e) => setEditing({ ...editing, full_name: e.target.value })} /></div>
            <div className="form-row">
                <div className="form-group"><label className="form-label">Blood Group</label>
                    <select className="form-select" value={editing.blood_group} onChange={(e) => setEditing({ ...editing, blood_group: e.target.value })}>
                        {GROUPS.map((g) => <option key={g} value={g}>{showBlood(g)}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></div>
            </div>
            <div className="form-row">
                <div className="form-group"><label className="form-label">City</label><input className="form-input" value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Status</label>
                    <select className="form-select" value={String(editing.is_available)} onChange={(e) => setEditing({ ...editing, is_available: e.target.value === 'true' })}>
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
                    </select>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-gray" style={{ flex: 1 }} onClick={() => setEditing(null)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={saveEdit} disabled={busy}>{busy ? 'Saving...' : 'Save'}</button>
            </div>
        </Modal>
      )}

      {donationFor && (
        <Modal title={`Add donation: ${donationFor.full_name}`} onClose={() => setDonationFor(null)}>
            <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input" value={dform.date} max={today()} onChange={(e) => setDform({ ...dform, date: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Place (hospital / blood bank)</label><input className="form-input" placeholder="e.g. Khulna Medical College" value={dform.place} onChange={(e) => setDform({ ...dform, place: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Note</label><input className="form-input" placeholder="e.g. 1 unit · Emergency" value={dform.note} onChange={(e) => setDform({ ...dform, note: e.target.value })} /></div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-gray" style={{ flex: 1 }} onClick={() => setDonationFor(null)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={saveDonation} disabled={busy}>{busy ? 'Saving...' : 'Add Donation'}</button>
            </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
