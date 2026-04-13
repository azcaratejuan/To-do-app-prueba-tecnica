# To-do-app-prueba-tecnica

Aplicacion To-Do full stack desarrollada como prueba tecnica.

## Demo online

Puedes probar la aplicacion sin montar nada localmente desde este enlace:

https://to-do-app-prueba-tecnica.vercel.app/

## Repositorio

Codigo fuente completo:

https://github.com/azcaratejuan/To-do-app-prueba-tecnica

## Como clonar el proyecto completo

1. Abre una terminal.
2. Ejecuta:

```bash
git clone https://github.com/azcaratejuan/To-do-app-prueba-tecnica.git
cd To-do-app-prueba-tecnica
```

## Documentacion por seccion

Cada parte del proyecto tiene su propio README con instrucciones de instalacion y ejecucion:

- `BACKEND/README.md`
- `FRONTEND/crud-to-do/README.md`
- `LOGIC/README.md`

## Decisiones de diseno y despliegue

- Se uso SQLite para pruebas y desarrollo rapido en entorno local.
- Para despliegue se uso PostgreSQL como base de datos en produccion.
- Se usaron migraciones de Django para gestionar y versionar cambios de esquema de base de datos.
- Se uso Firebase para autenticacion, incluyendo login con cuentas de Google.
- El frontend se desplego en Vercel por su simplicidad y su buen plan gratuito.
- El backend y la base de datos se desplegaron en Railway por su buen soporte para proyectos con Django.

## Mejoras futuras

Si tuviera mas tiempo, me gustaria centrarme mas en optimizar el rendimiento general de la aplicacion.