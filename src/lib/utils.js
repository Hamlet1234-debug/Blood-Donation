export const normalizeBlood = (s = '') => s.replace('\u2212', '-').trim()
export const showBlood = (g = '') => g.replace('-', '\u2212')
export const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

const RECEIVE_FROM = {
  'A+':  ['A+', 'A-', 'O+', 'O-'],
  'A-':  ['A-', 'O-'],
  'B+':  ['B+', 'B-', 'O+', 'O-'],
  'B-':  ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+':  ['O+', 'O-'],
  'O-':  ['O-'],
}
// Kon blood group theke nite pare
export const canReceiveFrom = (g) => RECEIVE_FROM[g] ?? [g]
// Ei blood group er donor kon kon group ke dite pare
export const canDonateTo = (g) =>
  Object.keys(RECEIVE_FROM).filter((k) => RECEIVE_FROM[k].includes(g))

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'

// Last donation er 90 din por abar donate kora jay
export const nextEligible = (last) => {
  if (!last) return { days: 0, date: null }
  const d = new Date(last)
  d.setDate(d.getDate() + 90)
  const days = Math.max(0, Math.ceil((d - new Date()) / 86400000))
  return { days, date: d }
}
