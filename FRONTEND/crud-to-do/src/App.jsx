import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Header from './components/Header'
import TaskList from './components/TaskList'
import TaskCreation from './components/TaskCreation'
import Login from './components/Login'

function PrivateRoute({ children }) {
  const { user } = useAuth()

  // Redirige al login si no hay sesion activa.
  return user ? children : <Navigate to="/login" />
}

function AppContent() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])

  return (
    <div>
      {user && <Header tasks={tasks} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <TaskList tasks={tasks} setTasks={setTasks} />
            </PrivateRoute>
          )}
        />
        <Route
          path="/create"
          element={(
            <PrivateRoute>
              <TaskCreation />
            </PrivateRoute>
          )}
        />
        <Route
          path="/edit/:id"
          element={(
            <PrivateRoute>
              <TaskCreation />
            </PrivateRoute>
          )}
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* Proveedores globales de auth y notificaciones. */}
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App