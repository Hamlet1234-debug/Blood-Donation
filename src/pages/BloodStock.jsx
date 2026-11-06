import { useState, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import AdminLayout from '../components/AdminLayout'
import { showBlood } from '../lib/utils'

const ORDER = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const LOW_LIMIT = 5

export default function BloodStock() {
  const { showToast } = useApp()
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('blood_stock').select('*')
    if (error) showToast(error.message, 'error')
    setStock((data ?? []).sort((a, b) => ORDER.indexOf(a.blood_group) - ORDER.indexOf(b.blood_group)))
    setLoading(false)
  }, [showToast])

  useEffect(() => { load() }, [load])

  const change = async (group, delta) => {
    const cur = stock.find((s) => s.blood_group === group)
    const next = Math.max(0, cur.qty + delta)
    if (next === cur.qty) return
    const now = new Date().toISOString()
    setStock((prev) => prev.map((s) => (s.blood_group === group ? { ...s, qty: next, updated_at: now } : s)))
    const { data, error } = await supabase.from('blood_stock')
      .update({ qty: next, updated_at: now }).eq('blood_group', group).select()
    if (error || !data?.length) {
      showToast(error?.message ?? 'Update kora jay nai (permission nai)', 'error')
      load()
    }
  }

  const lowCount = stock.filter((s) => s.qty < LOW_LIMIT).length
  const lastUpdated = stock.length
    ? new Date(Math.max(...stock.map((s) => new Date(s.updated_at)))).toLocaleString()
    : '-'

  return (
    <AdminLayout active="stock">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div><h2 style={{ fontSize: '20px', fontWeight: '800' }}>Blood Stock Management</h2><p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Last updated: {lastUpdated} · <strong style={{ color: 'var(--red)' }}>Admin edit mode</strong></p></div>
          <span className={'toast ' + (lowCount > 0 ? 'error' : 'success')}>{lowCount} groups low on stock</span>
      </div>
      {loading && <div>Loading...</div>}
      <div className="stock-grid">
          {stock.map((s) => {
            const low = s.qty < LOW_LIMIT
            return (
              <div className={'stock-card ' + (low ? 'low' : 'ok')} key={s.blood_group}>
                  <div className="stock-group">{showBlood(s.blood_group)}</div>
                  <div className="stock-label">Blood Group</div>
                  <div className={'stock-status ' + (low ? 'low' : 'ok')}>{low ? 'Low Stock' : 'Good Stock'}</div>
                  <div className="stock-qty">{s.qty}</div>
                  <div className="stock-unit">units available</div>
                  <div className="stock-btns">
                      <button className="stock-btn minus" onClick={() => change(s.blood_group, -1)}>−</button>
                      <button className="stock-btn plus" onClick={() => change(s.blood_group, 1)}>+</button>
                  </div>
              </div>
            )
          })}
      </div>
    </AdminLayout>
  )
}
