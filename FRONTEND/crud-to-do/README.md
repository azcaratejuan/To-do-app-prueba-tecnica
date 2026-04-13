# CRUD To-Do Frontend

Aplicacion frontend construida con React + Vite para gestionar tareas.

## Requisito Importante

Primero debes tener el backend montado y ejecutandose.

Si el backend no esta activo, el frontend no podra:

1. autenticar usuarios,
2. crear/editar/eliminar tareas,
3. consultar la lista de tareas.

## Requisitos

1. Node.js 18+ (recomendado 20+)
2. npm
3. Backend levantado (API de tasks/users disponible)

## 1) Entrar al proyecto

```bash
cd crud-to-do
```

## 2) Instalar dependencias

```bash
npm install
```

## 3) Configurar variables de entorno (Firebase)

Crea un archivo `.env` en la raiz del frontend con estas variables:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

## 4) Configurar la URL del backend

En [src/api/tasks.js](src/api/tasks.js) ajusta la constante `BASE`.

Ejemplo para backend local:

```js
const BASE = 'http://127.0.0.1:8000/api/'
```

## 5) Levantar el frontend

```bash
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

## Scripts disponibles

1. `npm run dev`: desarrollo local
2. `npm run build`: build de produccion
3. `npm run preview`: previsualizar build
4. `npm run lint`: ejecutar ESLint

## Flujo recomendado de arranque

1. Levantar backend
2. Verificar que responda en su URL local
3. Levantar frontend con `npm run dev`
4. Iniciar sesion con Google y validar operaciones CRUD

## Decisiones de diseno

1. Se eligio Vite porque es muy compatible con React y su ecosistema.
2. Tambien se eligio por su velocidad en desarrollo (arranque rapido del servidor y recarga en caliente eficiente).
