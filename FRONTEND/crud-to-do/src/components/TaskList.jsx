import { useEffect, useState } from 'react'
import { getTasks, deleteTask } from '../api/tasks'
import { useNotification } from '../context/NotificationContext'
import { useAuth } from '../context/AuthContext'
import SearchBar from './SearchBar'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, setTasks }) {
  const [filteredTasks, setFilteredTasks] = useState([])
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('title')

  const { notify } = useNotification()
  const { dbUser } = useAuth()

  const tasksLoad = async (search_user = '') => {
    try {
      notify('Cargando tareas...', 'loading')
      const response = await getTasks(dbUser?.firebase_uid, search_user)
      const data = Array.isArray(response.data) ? response.data : response.data.data ?? []
      setTasks(data)
      setFilteredTasks(data)
      notify('Tareas cargadas', 'success')
    } catch (error) {
      console.error("Error al cargar tareas:", error)
      notify('Error al cargar las tareas', 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      notify('Eliminando tarea...', 'loading')
      await deleteTask(id)
      notify('Tarea eliminada exitosamente', 'success')
      tasksLoad()
    } catch (error) {
      console.error("Error al eliminar tarea:", error)
      notify('Error al eliminar la tarea', 'error')
    }
  }

  useEffect(() => {
    if (dbUser) tasksLoad()
  }, [dbUser])

  useEffect(() => {
    // búsqueda por usuario va al backend
    if (searchType === 'user') {
      tasksLoad(search)
      return
    }
    // búsqueda por título o descripción se filtra en el frontend
    if (!search.trim()) {
      setFilteredTasks(tasks)
      return
    }
    const filtered = tasks.filter((task) =>
      task[searchType]?.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredTasks(filtered)
  }, [search, searchType, tasks])

  return (
    <div className='mt-8 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>Lista de tareas</h1>
      <SearchBar
        searchType={searchType}
        setSearchType={setSearchType}
        search={search}
        setSearch={setSearch}
      />
      <div className='flex flex-col items-center w-full'>
        {filteredTasks.length === 0 ? (
          <p className='text-gray-500'>No se encontraron tareas</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  )
}