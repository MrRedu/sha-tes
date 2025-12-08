# 🔑 Implementación de la Lógica de Compartición

Tres fases principales:

1.  **Creación y generación del código**
2.  **Solicitud de unión**
3.  **Aceptación/rechazo de la solicitud**

## 1. Modelo de Datos Básico

Necesitas al menos dos colecciones/tablas principales:

- **`users`**: Contiene información de los usuarios.
  - `id` (generado automáticamente)
  - `email` (de Google/GitHub, etc)
  - `name`
- **`projects`**: Contiene información de los notas.
  - `id` (generado automáticamente)
  - `name`
  - `ownerId` (ID del usuario creador)
  - `joinCode` (El código de 8 dígitos. ej: `A5B7F9D2`)
  - `members` (Un array con los `userId` de todos los miembros)
  - `pendingRequests` (Un array con los `userId` de los que quieren unirse)

## 2. 🏗️ Modelo de datos relacional

### 1\. Tablas de usuarios

| Tabla       | Campo   | Tipo de Dato | Relación        | Notas                           |
| :---------- | :------ | :----------- | :-------------- | :------------------------------ |
| **`users`** | `id`    | UUID/TEXT    | **Primary Key** | ID único de Supabase Auth.      |
|             | `email` | TEXT         |                 | Correo electrónico del usuario. |
|             | `name`  | TEXT         |                 | Nombre del usuario.             |

### 2\. Tabla de proyectos

| Tabla          | Campo              | Tipo de Dato | Relación                     | Notas                                     |
| :------------- | :----------------- | :----------- | :--------------------------- | :---------------------------------------- |
| **`projects`** | `id`               | UUID/TEXT    | **Primary Key**              | ID único del proyecto.                    |
|                | `name`             | TEXT         |                              | Nombre del proyecto (ej: "Casa").         |
|                | **`owner_id`**     | UUID/TEXT    | Foreign Key $\to$ `users.id` | Propietario del proyecto.                 |
|                | **`join_code`**    | TEXT         | Unique                       | Código de 8 dígitos para unirse.          |
|                | `members`          | JSONB        |                              | Array de `user_id`s (miembros aceptados). |
|                | `pending_requests` | JSONB        |                              | Array de `user_id`s (solicitudes).        |

### 3\. Tabla de "blocs de notas"

Esta tabla actúa como el contenedor intermedio que organiza las notas dentro de un proyecto.

| Tabla          | Campo            | Tipo de Dato | Relación                        | Notas                                             |
| :------------- | :--------------- | :----------- | :------------------------------ | :------------------------------------------------ |
| **`notepads`** | `id`             | UUID/TEXT    | **Primary Key**                 | ID único del bloc (ej: "Compras").                |
|                | `name`           | TEXT         |                                 | Título del bloc (ej: "Compras", "Viajes").        |
|                | **`project_id`** | UUID/TEXT    | Foreign Key $\to$ `projects.id` | **Clave crucial:** Vincula el bloc a su proyecto. |
|                | `created_at`     | TIMESTAMP    |                                 | Fecha de creación.                                |

### 4\. Tabla de notas

Esta tabla almacena el contenido real.

| Tabla       | Campo            | Tipo de Dato | Relación                        | Notas                                               |
| :---------- | :--------------- | :----------- | :------------------------------ | :-------------------------------------------------- |
| **`notes`** | `id`             | UUID/TEXT    | **Primary Key**                 | ID único de la nota.                                |
|             | `title`          | TEXT         |                                 | Título de la nota.                                  |
|             | `content`        | TEXT         |                                 | Contenido de la nota (el cuerpo de texto).          |
|             | **`notepad_id`** | UUID/TEXT    | Foreign Key $\to$ `notepads.id` | **Clave crucial:** Vincula la nota a su bloc.       |
|             | `created_by`     | UUID/TEXT    | Foreign Key $\to$ `users.id`    | Quién creó la nota (útil en proyectos compartidos). |
|             | `updated_at`     | TIMESTAMP    |                                 | Para saber cuándo fue la última modificación.       |

## 3. Creación del proyecto y generación del código

Cuando un usuario crea un proyecto:

- **Generación del Código:** En el backend (o en el frontend antes de guardar), genera un **código alfanumérico único de 8 dígitos** (ej: `A5B7F9D2`). Este código debe ser corto y fácil de compartir. Asegúrate de que no exista otro proyecto con el mismo código antes de guardarlo.
- **Guardado:** Crea un nuevo documento/registro en la colección **`projects`** con el `joinCode` y el `ownerId`. El array de `members` inicial debe contener solo el `ownerId`.

## 4. Solicitud de unión (El paso crucial)

Cuando un Usuario B quiere unirse usando el código:

1.  **Front-end (Usuario B):** El usuario ingresa el `joinCode` y hace clic en "Unirse".
2.  **Backend (Seguridad y Búsqueda):**
    - El backend verifica que el **Usuario B esté autenticado** (sabe quién es).
    - Busca en la colección **`projects`** un proyecto que coincida con ese `joinCode`.
    - **Validación:** Verifica que:
      - El proyecto exista.
      - El **Usuario B NO** esté ya en el array `members`.
      - El **Usuario B NO** esté ya en el array `pendingRequests`.
3.  **Actualización del proyecto:** Si todo es válido, el backend añade el `userId` del Usuario B al array **`pendingRequests`** del proyecto.

## 5. Notificación y aceptación por el propietario

Aquí es donde entra el **tiempo real** de Supabase:

1.  **Notificación (Tiempo Real):**
    - El **Usuario A (Propietario)** tiene su aplicación escuchando en tiempo real los cambios en la lista **`pendingRequests`** de **sus** proyectos.
    - Tan pronto como el ID del Usuario B se añade a `pendingRequests`, la aplicación del Propietario se actualiza automáticamente (sin recargar) y le muestra una notificación: **"El Usuario B quiere unirse a [Nombre del Proyecto]"**.
2.  **Acción del Propietario:** El Propietario hace clic en "Aceptar" o "Rechazar".
3.  **Backend (Aceptación):**
    - Si acepta, se ejecuta una función segura en el backend (Cloud Function/Edge Function) que:
      - Mueve el `userId` del Usuario B del array **`pendingRequests`** al array **`members`**.
    - **¡El Usuario B ya es miembro!** El backend puede crear una notificación para el Usuario B (ej: "Has sido aceptado en el proyecto").
4.  **Acceso a las Notas:** Ahora, cuando el Usuario B accede a sus proyectos, puede ver este proyecto porque su `userId` está en el array **`members`**. Las notas dentro del proyecto serán accesibles y se sincronizarán en tiempo real.

---

## ✨ Ventajas de este Modelo Relacional

Utilizar esta estructura de **tres tablas enlazadas** con claves foráneas (`project_id` y `block_id`) es la mejor opción para Supabase:

1.  **Escalabilidad (La Mejor Opción para SQL):** En lugar de tener que cargar un proyecto completo que podría contener un _array_ de 1,000 notas (lo cual sería lento), solo cargas las claves foráneas. Las búsquedas son rápidas.
2.  **Consultas Específicas:** Puedes consultar de forma eficiente:
    - **Todas las notas de un bloc específico:** `SELECT * FROM notes WHERE block_id = 'id_del_bloc';`
    - **Todos los blocs de un proyecto específico:** `SELECT * FROM blocks WHERE project_id = 'id_del_proyecto';`
3.  **Seguridad (Row-Level Security o RLS):** Con Supabase, puedes escribir políticas RLS para cada tabla. Por ejemplo: una política que solo permita a un usuario ver notas si su `user.id` está presente en el array `members` de la tabla `projects` que posee esa nota. **Esto es vital para la compartición segura.**

---

## 🚀 Implementación en Next.js y Supabase

Tu flujo de trabajo en el frontend será ahora más claro:

1.  **Acceder al Proyecto:** El usuario navega a `/projects/[projectId]`.
2.  **Cargar Blocs:** Usas el `projectId` para consultar la tabla **`blocks`** y obtener todos los blocs que pertenecen a ese proyecto.
    ```javascript
    const { data: blocks } = await supabase
      .from('blocks')
      .select('*')
      .eq('project_id', projectId); // Filtra por el ID del proyecto actual
    ```
3.  **Cargar Notas:** Cuando el usuario selecciona un bloc (ej: "Compras"), usas el `block_id` para consultar la tabla **`notes`**.
    ```javascript
    const { data: notes } = await supabase
      .from('notes')
      .select('*')
      .eq('block_id', selectedBlockId); // Filtra por el ID del bloc seleccionado
    ```

**La clave para la compartición en tiempo real:** Tanto la lista de `blocks` como las `notes` dentro de un bloc pueden ser escuchadas mediante los **canales en tiempo real** de Supabase, lo que garantiza que las actualizaciones de cualquier miembro del proyecto se reflejen instantáneamente en la pantalla de todos los demás.
