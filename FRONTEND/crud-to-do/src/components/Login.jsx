import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { CheckSquare } from 'lucide-react'

export default function Login() {
  const { loginWithGoogle } = useAuth()
  const Navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await loginWithGoogle()
      Navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className='bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 w-full max-w-sm'>
        
        {/* icono y título */}
        <div className='flex flex-col items-center gap-2'>
          <div className='bg-linear-to from-indigo-500 to-purple-600 p-4 rounded-full'>
            <CheckSquare size={36} color='white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-800'>To-Do App</h1>
        </div>

        {/* divider */}
        <div className='w-full border-t border-gray-100' />

        {/* botón de google */}
        <button
          onClick={handleLogin}
          className='flex items-center gap-3 bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-md text-gray-700 font-semibold py-3 px-6 rounded-xl w-full justify-center transition-all duration-200'
        >
          {/* logo de google SVG */}
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Continuar con Google
        </button>

        <p className='text-xs text-gray-400 text-center'>
          Al continuar aceptas los términos de uso de la aplicación
        </p>
      </div>
    </div>
  )
}