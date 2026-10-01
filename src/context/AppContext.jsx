import { createContext, useContext, useState, useRef, useCallback } from 'react'

const AppContext = createContext(null)

// Demo donor data — pore Supabase theke ashbe
const INITIAL_DONORS = [
  { id: 1, name: 'Hamlet Mondal', blood: 'A+', contact: '01712345678', city: 'Khulna', status: 'Available' },
  { id: 2, name: 'Maksudur Rahman Jisan', blood: 'B+', contact: '01823456789', city: 'Khulna', status: 'Available' },
  { id: 3, name: 'Sk. Fuadur Rahman', blood: 'O+', contact: '01934567890', city: 'Khulna', status: 'Available' },
  { id: 4, name: 'Fatema Khatun', blood: 'A−', contact: '01645678901', city: 'Jessore', status: 'Unavailable' },
  { id: 5, name: 'Rakibul Islam', blood: 'AB+', contact: '01556789012', city: 'Barisal', status: 'Available' },
]

export function AppProvider({ children }) {
  const [toast, setToast] = useState({ message: '', type: 'success', show: false })
  const timerRef = useRef(null)

  const [donors, setDonors] = useState(INITIAL_DONORS)
  const [totalCount, setTotalCount] = useState(512)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, show: true })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000)
  }, [])

  const addDonor = useCallback((donor) => {
    setDonors((prev) => [...prev, { ...donor, id: Date.now() }])
    setTotalCount((c) => c + 1)
  }, [])

  const deleteDonor = useCallback((id) => {
    setDonors((prev) => prev.filter((d) => d.id !== id))
    setTotalCount((c) => Math.max(0, c - 1))
  }, [])

  const value = { toast, showToast, donors, addDonor, deleteDonor, totalCount }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
