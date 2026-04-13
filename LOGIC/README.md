## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm

---
## Ubicacion e instalacion 

1. Entra a la carpeta del proyecto:
```bash
cd To-do-app-prueba-tecnica/LOGIC
```

2. Instala las dependencias:
```bash
npm install
```

---
## Ejecutar la función

```bash
node logic.js
```

Esto imprime en consola el resumen completo de las tareas de ejemplo.

---

## Ejecutar las pruebas

```bash
npm test
```
Corre las 5 pruebas con Jest y muestra los resultados:

- **1** Cuenta correctamente las tareas por estado
- **2** Retorna la tarea más reciente correctamente
- **3** Retorna los títulos ordenados alfabéticamente
- **4** Agrupa correctamente las tareas por usuario
- **5** Maneja correctamente un array de tareas vacío

---

## Ejemplo de salida

```
{
  countByState: { in_progress: 2, completed: 2, pending: 1 },
  mostRecent: { id: 5, title: 'Subir a producción', ... },
  sortedTitles: [
    'Completar documentación',
    'Configurar autenticación',
    'Diseñar base de datos',
    'Implementar filtros de búsqueda',
    'Subir a producción'
  ],
  tasksByUser: [
    { user: 'Juan Azcarate', total: 2, tasks: [...] },
    { user: 'Maria Lopez',   total: 2, tasks: [...] },
    { user: 'Carlos Perez',  total: 1, tasks: [...] }
  ]
}
```

---

## Decisiones de diseño

- **JavaScript puro**
- **reduce** para el conteo por estado — permite recorrer el array una sola vez
- **map** para recorrer el array con diferentes reglas
- **localeCompare** respeta tildes y caracteres especiales del español
- **Jest** para las pruebas por ser el framework de testing más usado en el ecosistema JavaScript