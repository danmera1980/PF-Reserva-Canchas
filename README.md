<!-- @format -->

# Final Project - Sport Field Reservations Platform
<p>
<img src="https://github.com/danmera1980/PF-Reserva-Canchas/blob/71b1800a65c8c813ca2a76c49c754450fa47facf/client/src/assets/img/Sport%20Field%20Reservations%20Platform.jpg" alt="main"/>
</p>

<p>
<img src="https://github.com/danmera1980/PF-Reserva-Canchas/blob/53f37db8802377521d8b653add374ec74d07cf13/client/src/assets/img/tuCanchaYaMockup.gif" alt="gif"/>
</p>

<h1 align="center">Tecnologías utilizadas: </h1>

<div style="display:grid;grid-template-columns: repeat(4, minmax(0, 1fr));gap:4rem">
<a href="https://www.mapbox.com/"><img src="client\src\assets\img\Mapbox_Logo.png" alt="mapbox" width="200"/></a>
<a href="https://tailwindcss.com/"><img src="client\src\assets\img\tailwind-css.svg" alt="tailwind" width="200"/></a>
<a href="https://react-table.tanstack.com/"><img src="client\src\assets\img\reactTable.svg" alt="reactTable" width="200"/></a>
<a href="https://www.mercadopago.com"><img src="client\src\assets\img\mercado-pago-logo.png" alt="mercadoPago" width="210"/></a>
<a href="https://nodemailer.com/about/"><img src="client\src\assets\img\nodeMailer.png" alt="nodeMailer" width="120" style="margin-left:2.5rem"/></a>
<a href="https://reactjs.org/"><img src="client\src\assets\img\react.png" alt="reactTable" width="200"/></a>
<a href="https://redux.js.org/"><img src="client\src\assets\img\redux.png" alt="reactTable" width="200"/></a>
<a href="http://expressjs.com/"><img src="client\src\assets\img\ExpressJS.png" alt="reactTable" width="200"/></a>
</div>



<!-- ## Objetivos del Proyecto

- Construir una App utilizando React, Redux, Node, Sequelize y otros frameworks.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Horarios y Fechas

El proyecto tendrá una duración máxima de tres semanas. En el caso de que completan todas las tareas antes de dicho lapso podrán avisar a su Instructor para coordinar una fecha de presentación del trabajo (DEMO).

## Comenzando

1.  Crear User Stories.
2.  Determinar la prioridad de las User Stories.
3.  Estimar el tiempo final con el uso de Story Points.
4.  Desglosar las tareas necesarias para llevar a cabo cada User Story.
5.  Dividir los User Stories en tres Sprints.

**IMPORTANTE:** Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependencias necesarias para correr el proyecto.

Actualmente las versiones necesarias son:

- **Node**: 12.18.3 o mayor
- **NPM**: 6.14.16 o mayor

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

Adicionalmente será necesario que creen desde psql una base de datos llamada `canchas`.

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general es crear una aplicación en la cual se pueda:

- Como usuario:
- Visualizar las canchas deportivas cercanas a una ubicación.
- Poder filtrar la búsqueda por localidad, tipo de deporte.
- Agendar un horario para uso de canchas.
- Como Establecimiento.
- Agregar una cancha para que usuarios la puedan reservar.

#### Tecnologías necesarias:

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

**Pagina inicial**: deben armar una landing page con

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Input de búsqueda para encontrar canchas por:
- [ ] Nombre
- [ ] Ubicación
- [ ] Tipo de deporte

**Ruta resultados**: debe contener

- [ ] Input de búsqueda para encontrar canchas.
- [ ] Área donde se verá el listado de canchas. Al iniciar deberá cargar los primeros resultados obtenidos y deberá mostrar su:
- Imagen de la cancha
- Nombre del establecimiento
- Ubicación
- Descripción
- Tipo de Deporte
- Precio de alquiler y tiempo
- Botón de favorito
- [ ] Botones/Opciones para filtrar por tipo de deporte, y precio.
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los establecimientos por orden de precio como por nombre de establecimiento.
- [ ] Paginado para ir buscando y mostrando las siguientes canchas, 10 canchas por pagina, mostrando las primeras 9 en la primer pagina.
- [ ] Mapa con las ubicaciones de los establecimientos cercanos a una area seleccionada.

**Ruta de detalle del establecimiento**: debe contener

- [ ] Nombre del establecimiento
- [ ] Ubicación
- [ ] Imágenes de las canchas
- [ ] Descripción
- [ ] Calendario disponible
- [ ] Precio
- [ ] Mapa con ubicación

**Ruta de formulario del nuevo establecimiento**: debe contener

- [ ] Nombre del establecimiento
- [ ] Ubicación
- [ ] Creación de canchas/productos
- [ ] Nombre
- [ ] Imágenes de las canchas
- [ ] Descripción
- [ ] Calendario disponible
- [ ] Precio

**Ruta de detalle del Usuario**: debe contener

- [ ] Nombre
- [ ] Foto
- [ ] Reservas
- Actuales
- Pasadas
- Canceladas
- [ ] Pagos o Transacciones
- Pagadas
- Pendientes

**Ruta de formulario de nuevo Usuario**: debe contener

- [ ] Nombre
- [ ] Foto

> Es requisito que los formulario de creación estén validados con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren.

#### Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):

- [ ] Usuario con las siguientes propiedades:

- ID (Código de 3 letras) \*
- Nombre \*

- Crear las respectivas relaciones.

#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

**Usuarios**

- [ ] **GET /users**:
- Deberán traer todos los usuarios desde la base de datos.
- [ ] **GET /users/{idUser}**:
- Obtener el detalle de un usuario en particular.
- Debe traer solo los datos pedidos en la ruta de detalle de usuario.
- Incluir los datos de las reservas realizadas anteriormente.
- [ ] **GET /users?name="..."**:
- Obtener los usuarios que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto).
- Si no existe ningún usuario mostrar un mensaje adecuado.
- [ ] **POST /user**:
- Recibe los datos recolectados desde el formulario controlado de la ruta de creación de usuario por body.
- Crea un usuario en la base de datos.

**Establecimientos**

- [ ] **GET /establishment**:
- Deberán traer todos los establecimientos desde la base de datos.
- [ ] **GET /establishment/{idEstablishment}**:
- Obtener el detalle de un establecimiento en particular.
- Debe traer solo los datos pedidos en la ruta de detalle de establecimientos.
- Incluir los datos de las canchas.
- [ ] **GET /establishment?name="..."**:
- Obtener los establecimientos que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto).
- Si no existe ningún establecimiento mostrar un mensaje adecuado.
- [ ] **POST /establishment**:
- Recibe los datos recolectados desde el formulario controlado de la ruta de creación de establecimiento por body.
- Crea un establecimientos en la base de datos.

#### Testing

- [ ] Al menos tener un componente del frontend con sus tests respectivos.
- [ ] Al menos tener una ruta del backend con sus tests respectivos.
- [ ] Al menos tener un modelo de la base de datos con sus tests respectivos. -->
