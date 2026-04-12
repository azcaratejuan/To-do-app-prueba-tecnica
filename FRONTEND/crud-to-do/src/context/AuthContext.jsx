import { createContext, useContext, useEffect, useState } from 'react'
import { auth, loginWithGoogle, logout } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { loginUser } from '../api/tasks'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [dbUser, setDbUser] = useState(null) // usuario de la base de datos
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        try {
          // registra o recupera el usuario en la base de datos
          const response = await loginUser({
            firebase_uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photo_url: currentUser.photoURL,
          })
          setDbUser(response.data.data) // guarda el usuario con su id de la db
        } catch (error) {
          console.error('Error al registrar usuario:', error)
        }
      } else {
        setUser(null)
        setDbUser(null)
      }
      setLoading(false)
    })

    return () => unsuscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, dbUser, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)