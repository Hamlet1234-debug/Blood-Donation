import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null)
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true)

	const loadProfile = useCallback(async (userId) => {
		const { data } = await supabase
			.from('profiles').select('*').eq('user_id', userId).maybeSingle()
		setProfile(data ?? null)
	}, [])

	useEffect(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s)
			if (s) {
				setLoading(true)
				setTimeout(async () => {
					await loadProfile(s.user.id)
					setLoading(false)
				}, 0)
			} else {
				setProfile(null)
				setLoading(false)
			}
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
