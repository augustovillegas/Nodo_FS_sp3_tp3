# 🦸‍♂️ Superhero Manager API

Una API RESTful en **Node.js**, **Express** y **MongoDB**, con motor de vistas **EJS** y patrones de repositorio/servicio/controlador. Permite crear, leer, actualizar y eliminar superhéroes, así como filtrar por atributos y edades.

---

## 📋 Contenido

1. [Características](#-características)
2. [Tecnologías](#-tecnologías)
3. [Instalación](#️-instalación)
4. [Estructura del proyecto](#-estructura-del-proyecto)

---

## ✨ Características

- CRUD completo de superhéroes
- Interfaces EJS para:
  - Dashboard (`/heroes`)
  - Formulario Agregar (`/heroes/agregar`)
  - Formulario Editar (`/heroes/:id/editar`)
- Validaciones backend con **express-validator**
- Validación cliente al vuelo (tooltips y errores dinámicos)
- Confirmación modal al eliminar

---

## 🛠 Tecnologías

- **Node.js** 18+
- **Express** 5.x
- **Mongoose** 8.x
- **EJS** + **Tailwind CSS**
- **express-validator**
- **method-override**
- **nodemon** (desarrollo)

---

## ⚙️ Instalación

- npm install

---

## 🗂 Estructura del proyecto

```text
├── config
│   └── dbConfig.mjs        # Conexión a MongoDB
├── controllers
│   └── superheroesController.mjs
├── middlewares
│   └── superheroeValidation.mjs
├── models
│   └── superheroe.mjs      # Esquema Mongoose
├── repository
│   ├── IRepository.mjs
│   └── SuperHeroRepository.mjs
├── routes
│   └── superHeroRoutes.mjs
├── services
│   └── superheroesService.mjs
├── views
│   ├── dashboard.ejs
│   ├── addSuperhero.ejs
│   ├── editSuperhero.ejs
│   └── partials/
│       └── nav.ejs
├── server.mjs               # Configura Express, EJS, middlewares
└── package.json

