// importa la función y los datos desde logic.js
const { summaryTasks, tasks, users } = require('./logic')

// agrupa todas las pruebas bajo el nombre 'summaryTasks'
describe('summaryTasks', () => {

  // prueba 1 — verifica que el conteo por estado sea correcto
  test('cuenta correctamente las tareas por estado', () => {
    const { countByState } = summaryTasks(tasks, users)
    expect(countByState.in_progress).toBe(2) // hay 2 en progreso
    expect(countByState.completed).toBe(2)   // hay 2 completadas
    expect(countByState.pending).toBe(1)     // hay 1 pendiente
  })

  // prueba 2 — verifica que la tarea más reciente sea la correcta
  test('retorna la tarea más reciente correctamente', () => {
    const { mostRecent } = summaryTasks(tasks, users)
    expect(mostRecent.id).toBe(5)                        // debe ser la tarea 5
    expect(mostRecent.title).toBe('Subir a producción')  // con ese título
  })

  // prueba 3 — verifica que los títulos estén ordenados alfabéticamente
  test('retorna los títulos ordenados alfabéticamente', () => {
    const { sortedTitles } = summaryTasks(tasks, users)
    expect(sortedTitles).toEqual([
      'Completar documentación',
      'Configurar autenticación',
      'Diseñar base de datos',
      'Implementar filtros de búsqueda',
      'Subir a producción'
    ])
  })

  // prueba 4 — verifica que las tareas se agrupen correctamente por usuario
  test('agrupa correctamente las tareas por usuario', () => {
    const { tasksByUser } = summaryTasks(tasks, users)
    const juan = tasksByUser.find(u => u.user === 'Juan Azcarate')
    expect(juan.total).toBe(2)                                        // Juan tiene 2 tareas
    expect(juan.tasks).toContain('Completar documentación')           // estas son sus tareas
    expect(juan.tasks).toContain('Implementar filtros de búsqueda')
  })

  // prueba 5 — verifica que la función no rompa con un array vacío
  test('maneja correctamente un array de tareas vacío', () => {
    const { countByState, sortedTitles, tasksByUser, mostRecent } = summaryTasks([], users)
    expect(countByState).toEqual({})   // sin tareas el conteo es vacío
    expect(sortedTitles).toEqual([])   // sin tareas no hay títulos
    expect(mostRecent).toBeNull()      // sin tareas no hay tarea reciente
    expect(tasksByUser[0].total).toBe(0) // ningún usuario tiene tareas
  })

})