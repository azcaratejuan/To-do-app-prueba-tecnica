// datos de ejemplo de usuarios
const users = [
  { id: 1, firebase_uid: "uid_001", name: "Juan Azcarate", email: "juan@gmail.com", photo_url: "https://i.pravatar.cc/150?img=1", created_at: "2026-04-01T08:00:00Z" },
  { id: 2, firebase_uid: "uid_002", name: "Maria Lopez", email: "maria@gmail.com", photo_url: "https://i.pravatar.cc/150?img=2", created_at: "2026-04-02T09:00:00Z" },
  { id: 3, firebase_uid: "uid_003", name: "Carlos Perez", email: "carlos@gmail.com", photo_url: "https://i.pravatar.cc/150?img=3", created_at: "2026-04-03T10:00:00Z" },
]

// datos de ejemplo de tareas
const tasks = [
  { id: 1, title: "Completar documentación", description: "Escribir el README", state: "in_progress", created_at: "2026-04-10T09:30:00Z", updated_at: "2026-04-11T14:20:00Z", created_by: 1, updated_by: 1, created_by_name: "Juan Azcarate", updated_by_name: "Juan Azcarate" },
  { id: 2, title: "Diseñar base de datos", description: "Crear el diagrama entidad relación", state: "completed", created_at: "2026-04-08T10:00:00Z", updated_at: "2026-04-09T16:00:00Z", created_by: 2, updated_by: 3, created_by_name: "Maria Lopez", updated_by_name: "Carlos Perez" },
  { id: 3, title: "Configurar autenticación", description: "Integrar Firebase Authentication", state: "completed", created_at: "2026-04-07T11:00:00Z", updated_at: "2026-04-07T18:00:00Z", created_by: 3, updated_by: 3, created_by_name: "Carlos Perez", updated_by_name: "Carlos Perez" },
  { id: 4, title: "Implementar filtros de búsqueda", description: "Agregar búsqueda por nombre", state: "pending", created_at: "2026-04-11T08:00:00Z", updated_at: "2026-04-11T08:00:00Z", created_by: 1, updated_by: 1, created_by_name: "Juan Azcarate", updated_by_name: "Juan Azcarate" },
  { id: 5, title: "Subir a producción", description: "Desplegar backend en Railway", state: "in_progress", created_at: "2026-04-12T07:00:00Z", updated_at: "2026-04-12T20:00:00Z", created_by: 2, updated_by: 1, created_by_name: "Maria Lopez", updated_by_name: "Juan Azcarate" },
]


function summaryTasks(tasks, users) {

  // cuenta cuántas tareas hay por cada estado (pending, completed, in_progress)
  const countByState = tasks.reduce((acc, task) => {
    if (acc[task.state] === undefined) acc[task.state] = 0 // si el estado no existe aún, lo inicializa en 0
    acc[task.state] += 1 // suma 1 al contador de ese estado
    return acc
  }, {}) // empieza con objeto vacío

  // encuentra la tarea más reciente comparando fechas
  // si el array está vacío retorna null para evitar error
  // si no está vacío, reduce el array para encontrar la tarea con la fecha de creación más reciente
  const mostRecent = tasks.length === 0 ? null : tasks.reduce((latest, task) => {
  // compara la fecha de creación de la tarea actual con la más reciente encontrada hasta ahora
    return new Date(task.created_at) > new Date(latest.created_at) ? task : latest
  })

  // extrae solo los títulos y los ordena alfabéticamente
  const sortedTitles = tasks
    .map(task => task.title)          // extrae el título de cada tarea
    .sort((a, b) => a.localeCompare(b))
    //sort ordena los títulos alfabéticamente usando localeCompare para manejar acentos correctamente

  // por cada usuario busca cuántas tareas creó y cuáles son
  const tasksByUser = users.map(user => ({
    user: user.name,
    total: tasks.filter(t => t.created_by === user.id).length, // cuenta tareas del usuario
    tasks: tasks
      .filter(t => t.created_by === user.id) // filtra tareas del usuario
      .map(t => t.title)                      // extrae solo los títulos
  }))

  return { countByState, mostRecent, sortedTitles, tasksByUser }
}

// exporta la función y los datos para usarlos en los tests
module.exports = { summaryTasks, tasks, users }