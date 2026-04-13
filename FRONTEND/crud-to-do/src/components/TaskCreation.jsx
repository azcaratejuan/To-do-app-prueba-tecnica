import { useEffect, useState } from 'react'
import { getTask, createTask, updateTask } from '../api/tasks'
import { useNavigate, useParams } from 'react-router'
import { useNotification } from '../context/NotificationContext'
import { useAuth } from '../context/AuthContext'

const MAX_TITLE = 50

export default function TaskCreation() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    state: 'pending',
  })

  const { dbUser } = useAuth()
  const navigate = useNavigate()
  const params = useParams()
  const { notify } = useNotification()

  useEffect(() => {
    if (params.id) {
      // Si hay id, carga la tarea para modo edicion.
      const loadTask = async () => {
        try {
          notify('Cargando tarea...', 'loading')
          const response = await getTask(params.id)
          setTask(response.data)
          notify('Tarea cargada', 'success')
        } catch (error) {
          notify(error.message || 'Error al cargar la tarea', 'error')
          navigate('/')
        }
      }
      loadTask()
    }
  }, [params.id, navigate, notify])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!task.title.trim()) {
      notify('El título es requerido', 'warning')
      return
    }

    if (task.title.length > MAX_TITLE) {
      notify(`El título no puede superar ${MAX_TITLE} caracteres`, 'warning')
      return
    }

    try {
      if (params.id) {
        notify('Actualizando tarea...', 'loading')
        await updateTask(params.id, task, dbUser?.firebase_uid)
        notify('Tarea actualizada exitosamente', 'success')
      } else {
        notify('Creando tarea...', 'loading')
        await createTask(task, dbUser?.firebase_uid)
        notify('Tarea creada exitosamente', 'success')
      }
      navigate('/')
    } catch (error) {
      notify(error.message || 'Error al guardar la tarea', 'error')
    }
  }

  return (
    <div className='m-20'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
            Título
          </label>
          <input
            value={task.title}
            type='text'
            id='title'
            maxLength={MAX_TITLE}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          <p className={`text-xs mt-1 text-right ${task.title.length >= MAX_TITLE ? 'text-red-500 font-bold' : task.title.length >= MAX_TITLE * 0.8 ? 'text-orange-400' : 'text-gray-400'}`}>
            {task.title.length}/{MAX_TITLE} caracteres
          </p>
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>
            Descripción
          </label>
          <textarea
            value={task.description}
            id='description'
            rows={6}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='state' className='block text-gray-700 font-bold mb-2'>
            Estado
          </label>
          <select
            id='state'
            value={task.state}
            onChange={(e) => setTask({ ...task, state: e.target.value })}
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='pending'>Pendiente</option>
            <option value='in_progress'>En Progreso</option>
            <option value='completed'>Completado</option>
          </select>
        </div>
        <button
          type='submit'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Guardar
        </button>
        <button
          type='button'
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4'
          onClick={() => navigate('/')}
        >
          Cancelar
        </button>
      </form>
    </div>
  )
}