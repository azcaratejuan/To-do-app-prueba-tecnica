import { createContext, useContext, useState, useRef } from 'react'

const NotificationContext = createContext()

const typeConfig = {
  success: 'bg-green-500',
  error:   'bg-red-500',
  loading: 'bg-blue-500',
  warning: 'bg-orange-500',
}

function NotificationContainer({ notifications }) {
  return (
    <div className='fixed bottom-4 right-4 flex flex-col gap-2 z-50'>
      {notifications.map(n => (
        <div
          key={n.id}
          className={`${typeConfig[n.type]} text-white px-4 py-2 rounded shadow-lg text-sm`}
        >
          {n.message}
        </div>
      ))}
    </div>
  )
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const counter = useRef(0) // ← contador único

  const notify = (message, type = 'success') => {
    const id = counter.current++ // ← siempre único
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationContainer notifications={notifications} />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)