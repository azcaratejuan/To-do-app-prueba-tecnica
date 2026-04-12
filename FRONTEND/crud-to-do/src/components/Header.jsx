import { Link } from "react-router";
import { BookCheck, ClipboardPen, Home, Plus, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header({ tasks = [] }) {
  const { user, logout } = useAuth()
  const pending = tasks.filter(t => t.state === 'pending' || t.state === 'in_progress').length
  const completed = tasks.filter(t => t.state === 'completed').length

  return (
    <nav style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">To-Do</h1>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 ml-80 px-3 py-1 rounded-full text-sm">
            <ClipboardPen size={16} />
            <span>Pendientes: {pending}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm">
            <BookCheck size={16} />
            <span>Completadas: {completed}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200">
            <Home size={22} />
          </Link>
          <Link to="/create" className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200">
            <Plus size={22} />
          </Link>
          {user && (
            <div className="flex items-center gap-2 border-l border-white border-opacity-30 pl-4">
              <img
                src={user.photoURL}
                alt="foto"
                referrerPolicy="no-referrer"
                onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                className="w-8 h-8 rounded-full ring-2 ring-white ring-opacity-50"
              />
              <span className="text-sm font-medium">{user.displayName}</span>
              <button
                onClick={logout}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}