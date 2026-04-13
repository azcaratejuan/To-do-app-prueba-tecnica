# To Do Backend (Django)

Guia rapida para ejecutar este backend en un entorno privado (virtual environment) de forma local.

## Requisitos

- Python 3.11+ recomendado
- pip
- (Opcional) PostgreSQL si vas a usar `DATABASE_URL`

## 1) Crear y activar entorno virtual

### Windows (PowerShell)

```powershell
cd to_do
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Si PowerShell bloquea scripts, ejecuta una vez:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### macOS / Linux

```bash
cd to_do
python3 -m venv .venv
source .venv/bin/activate
```

## 2) Instalar dependencias

```bash
pip install -r requirements.txt
```

## 3) Configurar variables de entorno (opcional)

Este proyecto usa SQLite por defecto. Si defines `DATABASE_URL`, Django usara esa base de datos.

### Ejemplo para PostgreSQL

```bash
DATABASE_URL=postgresql://usuario:password@localhost:5432/to_do_db
```

En Windows PowerShell:

```powershell
$env:DATABASE_URL="postgresql://usuario:password@localhost:5432/to_do_db"
```

## 4) Aplicar migraciones

```bash
python manage.py migrate
```

## 5) Ejecutar servidor local

```bash
python manage.py runserver
```

API disponible en:

- http://127.0.0.1:8000/

## Endpoints principales

- `GET/POST /tasks/`
- `GET/PUT/PATCH/DELETE /tasks/{id}/`
- `GET/POST /users/`
- `POST /users/login/`

## Notas

- `DEBUG` esta en `True` en configuracion actual, usar solo para desarrollo.
- `CORS_ALLOWED_ORIGINS` ya incluye origenes locales y un frontend desplegado.

## Desactivar entorno virtual

```bash
deactivate
```

## Decisiones de diseno

- Se eligio Django por su estructura clara y ordenada para proyectos backend, lo que facilita mantener el codigo en apps, modelos, vistas y rutas.
- Tambien se eligio por su buen manejo de formularios y validaciones, util para controlar datos de entrada de manera segura y consistente.

## Nota
- La configuracion de origenes permitidos para CORS esta en `to_do/settings.py`, en `CORS_ALLOWED_ORIGINS`.
- Si quieres conectar un frontend diferente, solo debes anadir su URL en esa lista de `CORS_ALLOWED_ORIGINS`.