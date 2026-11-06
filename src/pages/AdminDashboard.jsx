import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AdminLayout from '../components/AdminLayout'
import { showBlood, initials } from '../lib/utils'

const GROUPS = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-']
const ago = (d) => {
  const mins = Math.floor((Date.now() - new Date(d)) / 60000)
  if (mins < 60) return `${Math.max(mins, 1)} min ago`
  if (mins < 1440) return `${Math.floor(mins / 60)} hrs ago`
  return `${Math.floor(mins / 1440)} days ago`
}

export default function AdminDashboard() {
  const { showToast } = useApp()
  const [rows, setRows] = useState([])
  const [openReq, setOpenReq] = useState(0)
  const [lowStock, setLowStock] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('profiles')
        .select('id, full_name, blood_group, city, is_available, created_at')
        .order('created_at', { ascending: false }).limit(1000),
      supabase.from('emergency_requests').select('*', { count: 'exact', head: true }).eq('status', 'open'),
      supabase.from('blood_stock').select('qty'),
    ]).then(([p, r, s]) => {
      if (p.error) showToast(p.error.message, 'error')
      setRows(p.data ?? [])
      setOpenReq(r.count ?? 0)
      setLowStock((s.data ?? []).filter((x) => x.qty < 5).length)
      setLoading(false)
    })
  }, [showToast])

  const total = rows.length
  const available = rows.filter((r) => r.is_available).length
  const weekAgo = Date.now() - 7 * 86400000
  const thisWeek = rows.filter((r) => new Date(r.created_at) > weekAgo).length
  const counts = GROUPS.map((g) => [g, rows.filter((r) => r.blood_group === g).length])
  const max = Math.max(1, ...counts.map(([, c]) => c))
  const covered = counts.filter(([, c]) => c > 0).length

  return (
    <AdminLayout active="admin-dash">
      <div className="dash-header"><h2>Admin Dashboard</h2><p>Overview of the Life Saver blood donation system</p></div>
      {loading && <div>Loading...</div>}
      <div className="admin-stat-cards">
          <div className="admin-stat"><div className="admin-stat-label">Total Donors</div><div className="admin-stat-val red">{total}</div><div className="admin-stat-trend up">↑ +{thisWeek} this week</div></div>
          <div className="admin-stat"><div className="admin-stat-label">Available Now</div><div className="admin-stat-val green">{available}</div><div className="admin-stat-trend">{total ? Math.round((available / total) * 100) : 0}% of total</div></div>
          <div className="admin-stat"><div className="admin-stat-label">Open Requests</div><div className="admin-stat-val orange">{openReq}</div><div className="admin-stat-trend" style={{ color: '#D97706' }}>{openReq > 0 ? 'Needs attention' : 'All clear'}</div></div>
          <div className="admin-stat"><div className="admin-stat-label">Blood Groups</div><div className="admin-stat-val blue">{covered}/8</div><div className="admin-stat-trend">{lowStock > 0 ? `${lowStock} low on stock` : 'Stock healthy'}</div></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="card">
              <div className="card-title">Blood Group Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {counts.map(([g, c]) => (
                    <div key={g} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '34px', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>{showBlood(g)}</span>
                        <div style={{ flex: '1', height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${(c / max) * 100}%`, height: '100%', background: 'var(--red)', borderRadius: '4px' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--gray-600)', width: '30px' }}>{c}</span>
                    </div>
                  ))}
              </div>
          </div>
          <div className="card">
              <div className="card-title">Recent Registrations</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {rows.length === 0 && !loading && <p style={{ fontSize: '14px' }}>Kono donor nai.</p>}
                  {rows.slice(0, 5).map((r) => (
                    <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--red-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>{initials(r.full_name)}</div>
                        <div style={{ flex: '1' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600' }}>{r.full_name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{showBlood(r.blood_group)} • {r.city} • {ago(r.created_at)}</div>
                        </div>
                        <span className="badge badge-red" style={{ fontSize: '11px' }}>{showBlood(r.blood_group)}</span>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </AdminLayout>
  )
}
