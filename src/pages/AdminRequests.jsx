import { useState, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AdminLayout from '../components/AdminLayout'
import { showBlood } from '../lib/utils'

const URGENCY_BADGE = { Critical: 'badge-red', High: 'badge-red', Medium: 'badge-orange', Low: 'badge-gray' }
const STATUS_TOAST = { open: 'error', fulfilled: 'success', cancelled: 'info' }

export default function AdminRequests() {
  const { showToast } = useApp()
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('open')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('emergency_requests').select('*')
      .order('created_at', { ascending: false }).limit(200)
    setLoading(false)
    if (error) return showToast(error.message, 'error')
    setRows(data ?? [])
  }, [showToast])

  useEffect(() => { load() }, [load])

  const setStatus = async (id, status) => {
    const { data, error } = await supabase.from('emergency_requests').update({ status }).eq('id', id).select()
    if (error) return showToast(error.message, 'error')
    if (!data?.length) return showToast('Update kora jay nai (permission nai)', 'error')
    setRows((prev) => prev.map((r) => (r.id === id ? data[0] : r)))
    showToast(`Request marked as ${status}`)
  }

  const visible = filter === 'all' ? rows : rows.filter((r) => r.status === filter)
  const openCount = rows.filter((r) => r.status === 'open').length

  return (
    <AdminLayout active="admin-requests">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>Emergency Requests</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{openCount} open · {rows.length} total</p></div>
          <select className="form-select" style={{ width: '160px' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="open">Open</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="cancelled">Cancelled</option>
              <option value="all">All</option>
          </select>
      </div>
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-wrapper">
              <table>
                  <thead><tr><th>Blood</th><th>Requester</th><th>Contact</th><th>City</th><th>Urgency</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {loading && <tr><td colSpan="8" style={{ padding: 20 }}>Loading...</td></tr>}
                    {!loading && visible.length === 0 && <tr><td colSpan="8"><div className="empty-state"><div className="empty-state-icon">📭</div><div className="empty-state-title">Kono request nai</div></div></td></tr>}
                    {visible.map((r) => (
                      <tr key={r.id}>
                        <td><span className="badge badge-red">{showBlood(r.blood_group)}</span></td>
                        <td className="td-name">{r.requester_name}</td>
                        <td><a href={`tel:${r.contact}`}>{r.contact}</a></td>
                        <td>{r.city || '-'}</td>
                        <td><span className={'badge ' + (URGENCY_BADGE[r.urgency] ?? 'badge-gray')}>{r.urgency}</span></td>
                        <td>{new Date(r.created_at).toLocaleString()}</td>
                        <td><span className={'toast ' + STATUS_TOAST[r.status]}>{r.status}</span></td>
                        <td>
                          <div className="action-btns">
                            {r.status === 'open' ? (
                              <>
                                <button className="btn btn-primary btn-sm" onClick={() => setStatus(r.id, 'fulfilled')}>Fulfilled</button>
                                <button className="btn btn-gray btn-sm" onClick={() => setStatus(r.id, 'cancelled')}>Cancel</button>
                              </>
                            ) : (
                              <button className="btn btn-gray btn-sm" onClick={() => setStatus(r.id, 'open')}>Reopen</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>
      </div>
    </AdminLayout>
  )
}
