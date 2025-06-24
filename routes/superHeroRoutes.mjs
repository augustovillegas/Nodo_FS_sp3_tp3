import express from "express";
import {
  actualizarSuperheroeController,
  crearSuperheroeController,
  eliminarSuperheroeController,
  eliminarSuperheroePorNombreController,
  formularioAgregarSuperheroeController,
  formularioEditarSuperheroeController,
  obtenerTodosLosSuperheroesController,
} from "../controllers/superheroesController.mjs";
import {registerSuperheroeValidation, runValidation} from "../middlewares/superheroeValidation.mjs";

const router = express.Router();

router.get("/heroes", obtenerTodosLosSuperheroesController);
router.get("/heroes/agregar", formularioAgregarSuperheroeController);
router.get("/heroes/:id/editar", formularioEditarSuperheroeController);
router.post("/heroes/agregar", registerSuperheroeValidation(), runValidation, crearSuperheroeController);
router.put("/heroes/:id/editar", registerSuperheroeValidation(), runValidation, actualizarSuperheroeController);
router.delete("/heroes/:id", eliminarSuperheroeController);
router.delete("/heroes/nombre/:nombre", eliminarSuperheroePorNombreController);

export default router;
