# Final Project - Sport Field Reservations Platform

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node, Sequelize y otros frameworks.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Horarios y Fechas

El proyecto tendrá una duración máxima de tres semanas. En el caso de que completan todas las tareas antes de dicho lapso podrán avisar a su Instructor para coordinar una fecha de presentación del trabajo (DEMO).

## Comenzando

 1. Crear User Stories y las tareas necesarias para los sprints
 2. 

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `canchas`

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se pueda:
- Como usuario:
  - Visualizar las canchas deportivas cercanas a una ubicación.
  - Poder filtrar la busqueda por localidad, tipo de deporte, 
  - Agendar un horario para uso de canchas.
- Como Establecimiento
  - Agregar una cancha para que usuarios la puedan reservar


#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: deben armar una landing page con
- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Input de busqueda para encontrar canchas por:
  - [ ] Nombre
  - [ ] Ubicación
  - [ ] Tipo de deporte

__Ruta resultados__: debe contener
- [ ] Input de búsqueda para encontrar canchas
- [ ] Área donde se verá el listado de canchas. Al iniciar deberá cargar los primeros resultados obtenidos y deberá mostrar su:
  - Imagen de la cancha
  - Nombre del establecimiento
  - Ubicación
  - Descripción
  - Tipo de Deporte
  - Precio de alquiler y tiempo
  - Botton de favorito
- [ ] Botones/Opciones para filtrar por tipo de deporte, y precio
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los establecimientos por orden de precio como por nombre de establecimiento
- [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.
- [ ] Mapa con las ubicaciones de los establecimientos cercanos a una area seleccionada

__Ruta de detalle del establecimiento__: debe contener
- [ ] Nombre del establecimiento
- [ ] Ubicación
- [ ] Imagenes de las canchas
- [ ] Descripción
- [ ] Calendario disponible
- [ ] Precio
- [ ] Mapa con ubicación

__Ruta de formulario del nuevo establecimiento__: debe contener
- [ ] Nombre del establecimiento
- [ ] Ubicación
- [ ] Creación de canchas/productos
  - [ ] Nombre
  - [ ] Imagenes de las canchas
- [ ] Descripción
- [ ] Calendario disponible
- [ ] Precio

__Ruta de detalle del Usuario__: debe contener
- [ ] Nombre
- [ ] Foto
- [ ] Reservas
  - Actuales
  - Pasadas
  - Canceladas
- [ ] Pagos o Transacciones
  - Pagadas
  - Pendientes

__Ruta de formulario de nuevo Usuario__: debe contener
- [ ] Nombre
- [ ] Foto

> Es requisito que los formulario de creación estén validados con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. 

#### Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [ ] Usuario con las siguientes propiedades:
  - ID (Código de 3 letras) *
  - Nombre *
  - 

Crear las respectivas relaciones

#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

__Usuarios__
- [ ] __GET /users__:
  - Deberán traer todos los usuarios desde la base de datos 
- [ ] __GET /users/{idUser}__:
  - Obtener el detalle de un usuario en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de usuario
  - Incluir los datos de las reservas realizadas anteriormente
- [ ] __GET /users?name="..."__:
  - Obtener los usuarios que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  - Si no existe ningún usuario mostrar un mensaje adecuado
- [ ] __POST /user__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de usuario por body
  - Crea un usuario en la base de datos

__Establecimientos__
- [ ] __GET /establishment__:
  - Deberán traer todos los establecimientos desde la base de datos 
- [ ] __GET /establishment/{idEstablishment}__:
  - Obtener el detalle de un establecimiento en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de establecimientos
  - Incluir los datos de las canchas
- [ ] __GET /establishment?name="..."__:
  - Obtener los establecimientos que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  - Si no existe ningún establecimiento mostrar un mensaje adecuado
- [ ] __POST /establishment__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de establecimiento por body
  - Crea un establecimientos en la base de datos


#### Testing
- [ ] Al menos tener un componente del frontend con sus tests respectivos
- [ ] Al menos tener una ruta del backend con sus tests respectivos
- [ ] Al menos tener un modelo de la base de datos con sus tests respectivos
