import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const loadedFor = useRef(null)

  const loadProfile = useCallback(async (userId) => {
    const { data } = await supabase
      .from('profiles').select('*').eq('user_id', userId).maybeSingle()
    setProfile(data ?? null)
  }, [])

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      if (!s) {
        loadedFor.current = null
        setProfile(null)
        setLoading(false)
        return
      }
      // Notun user hole Loading dekhao, same user er token refresh e na (page reset hoy na)
      if (loadedFor.current !== s.user.id) setLoading(true)
      setTimeout(async () => {
        await loadProfile(s.user.id)
        loadedFor.current = s.user.id
        setLoading(false)
      }, 0)
    })
    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    isAdmin: profile?.role === 'admin',
    loading,
    refreshProfile: () => session && loadProfile(session.user.id),
    signOut: () => supabase.auth.signOut(),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
