import express from "express";
import methodOverride from "method-override";
import superHeroRoutes from "./routes/superHeroRoutes.mjs";
import { conectarDB } from "./config/dbConfig.mjs";

const app = express();
const PORT = process.env.PORT || 3008;

// 1) Para parsear bodies de formularios (necesario para method-override)
app.use(express.urlencoded({ extended: true }));
// 2) Para detectar el campo "_method" y convertir POSTs en PUT/DELETE
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
// 3) Parsear JSON ::::::::::::::::::::::::::::::::::::::
app.use(express.json());

// Conexion a DB ::::::::::::::::::::::::::::::::::::::
await conectarDB();

// Config EJS ::::::::::::::::::::::::::::::::::::::
app.set("view engine", "ejs");

// Rutas ::::::::::::::::::::::::::::::::::::::
app.use("/api", superHeroRoutes);

//Manejo de errores para rutas no encontradas ::::::::::::::::::::::::::::::::::::::
app.use((req, res) => {
  res.status(404).send({ mensaje: "404 Not Found - Ruta no encontrada - Servidor" });
});

// Levantar el servidor ::::::::::::::::::::::::::::::::::::::
app.listen(PORT, () => {
  console.log("##########################");
  console.log("######## API REST ########");
  console.log("##########################");
  console.log(`http://localhost:${PORT}/`);
});
