import { useNavigate } from 'react-router'
import { Pencil, Trash2 } from 'lucide-react'

const stateConfig = {
  pending: { label: 'Pendiente', color: 'text-orange-500' },
  completed: { label: 'Completada', color: 'text-green-500' },
  in_progress: { label: 'En Progreso', color: 'text-red-500' },
}

const truncateTitle = (text) => {
  if (!text) return ''
  return text.length > 20 ? text.slice(0, 20) + '...' : text
}

const truncateDescription = (text) => {
  if (!text) return ''
  const charsPerLine = 20
  if (text.length <= charsPerLine * 3) return text
  // Corta en 3 lineas para evitar cards muy altas.
  const line1 = text.slice(0, charsPerLine)
  const line2 = text.slice(charsPerLine, charsPerLine * 2)
  const line3 = text.slice(charsPerLine * 2, charsPerLine * 3)
  return `${line1}\n${line2}\n${line3}...`
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TaskCard({ task, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className='border p-4 mt-4 rounded w-full max-w-md'>
      <div className='flex items-center justify-start mb-2'>
        <h2 className='text-sm font-semibold'>
          {truncateTitle(task.title)}{' '}
          <span className={stateConfig[task.state]?.color}>
            {stateConfig[task.state]?.label}
          </span>
        </h2>
      </div>
      <p className='text-sm text-gray-500 whitespace-pre-line'>
        {truncateDescription(task.description)}
      </p>
      {/* Metadatos de auditoria basicos. */}
      <div className='mt-2 text-xs text-gray-400'>
        <p>
          Creado por: <span className='text-gray-500'>{task.created_by_name ?? 'Desconocido'}</span>
        </p>
        <p>
          Editado por: <span className='text-gray-500'>{task.updated_by_name ?? 'Desconocido'}</span>
        </p>
        <p>Creado el: {formatDate(task.created_at)}</p>
        <p>Editado el: {formatDate(task.updated_at)}</p>
      </div>
      <div className='flex gap-2 mt-2'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          <Pencil size={16} />
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white p-2 rounded'
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}