import { createContext, useContext, useEffect, useState } from 'react'
import { auth, loginWithGoogle, logout } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { loginUser } from '../api/tasks'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        try {
          // Sincroniza el usuario de Firebase con la API.
          const response = await loginUser({
            firebase_uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photo_url: currentUser.photoURL,
          })
          setDbUser(response.data.data)
        } catch (error) {
          console.error('Error al registrar usuario:', error)
        }
      } else {
        setUser(null)
        setDbUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, dbUser, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)