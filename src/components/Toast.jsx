import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  const cls = ['toast-notification', toast.type === 'error' ? 'error' : '', toast.show ? 'show' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls}>
      <span className="toast-notification-icon">{toast.type === 'error' ? '⚠' : '✓'}</span>
      <span>{toast.message}</span>
    </div>
  )
}
