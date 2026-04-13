import axios from 'axios'

const BASE = 'https://gentle-gentleness-production-b158.up.railway.app/api/'

const tasksApi = axios.create({ baseURL: `${BASE}tasks/` })
const usersApi = axios.create({ baseURL: `${BASE}users/` })

const interceptor = (api) => {
  // Normaliza los errores de API para mostrarlos en la UI.
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response?.data?.error || 'Error inesperado'
      return Promise.reject(new Error(message))
    },
  )
}

interceptor(tasksApi)
interceptor(usersApi)

export const getTask = (id) => tasksApi.get(`${id}/`)
export const deleteTask = (id) => tasksApi.delete(`${id}/`)
export const loginUser = (userData) => usersApi.post('login/', userData)
export const createTask = (task, firebase_uid) => tasksApi.post('', { ...task, firebase_uid })
export const updateTask = (id, task, firebase_uid) => tasksApi.put(`${id}/`, { ...task, firebase_uid })
export const getTasks = (firebase_uid, search_user) =>
  tasksApi.get(`?firebase_uid=${firebase_uid ?? ''}&search_user=${search_user ?? ''}`)