import {
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  obtenerTodosLosSuperheroes,
  eliminarSuperheroePorNombre,
  obtenerSuperheroePorId,
} from "../services/superheroesService.mjs";
import { renderizarSuperheroe } from "../views/responseView.mjs";

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.render("dashboard", { superheroes });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superhéroes",
      error: error.message,
    });
  }
};

export const formularioAgregarSuperheroeController = (req, res) => {
  res.render("addSuperhero", { errors: [], old: {} });
};

export const crearSuperheroeController = async (req, res) => {
  const old = {
    nombreSuperHeroe: req.body.nombreSuperHeroe,
    nombreReal: req.body.nombreReal,
    edad: req.body.edad,
    planetaOrigen: req.body.planetaOrigen,
    debilidad: req.body.debilidad,
    habilidadEspecial: req.body.habilidadEspecial,
    poderes: Array.isArray(req.body.poderes)
      ? req.body.poderes.join(", ")
      : req.body.poderes,
    aliados: Array.isArray(req.body.aliados)
      ? req.body.aliados.join(", ")
      : req.body.aliados,
    enemigos: Array.isArray(req.body.enemigos)
      ? req.body.enemigos.join(", ")
      : req.body.enemigos,
    creador: req.body.creador,
  };

  try {
    const data = { ...req.body, poderes: req.body.poderes };
    const nuevo = await crearSuperheroe(data);

    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).render("addSuperhero", {
      errors: [{ msg: error.message }],
      old,
    });
  }
};

export const formularioEditarSuperheroeController = async (req, res) => {
  const { id } = req.params;
  try {
    const superhero = await obtenerSuperheroePorId(id);
    if (!superhero) {
      return res.status(404).send("Superhéroe no encontrado");
    }
    res.render("editSuperhero", {
      errors: [],
      old: {},
      superhero,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const actualizarSuperheroeController = async (req, res) => {
  const superheroeId = req.params.id;
  const old = {
    _id: superheroeId,
    nombreSuperHeroe: req.body.nombreSuperHeroe,
    nombreReal: req.body.nombreReal,
    edad: req.body.edad,
    planetaOrigen: req.body.planetaOrigen,
    debilidad: req.body.debilidad,
    poderes: Array.isArray(req.body.poderes)
      ? req.body.poderes.join(", ")
      : req.body.poderes,
    aliados: Array.isArray(req.body.aliados)
      ? req.body.aliados.join(", ")
      : req.body.aliados,
    enemigos: Array.isArray(req.body.enemigos)
      ? req.body.enemigos.join(", ")
      : req.body.enemigos,
    creador: req.body.creador,
  };

  try {
    const data = {
      ...req.body,
      poderes: req.body.poderes,
      aliados: req.body.aliados,
      enemigos: req.body.enemigos,
    };
    const update = await actualizarSuperheroe(superheroeId, data);

    if (!update) {
      return res.status(404).render("editSuperhero", {
        errors: [{ msg: "Superhéroe no encontrado para actualizar." }],
        old,
      });
    }

    res.redirect("/api/heroes");
  } catch (error) {
    console.error("Error al actualizar superhéroe:", error);
    let errorMessage = error.message;
    if (error.name === "ValidationError") {
      errorMessage = "Error de validación: Por favor, revise los campos.";
    }
    res.status(400).render("editSuperhero", {
      errors: [{ msg: errorMessage }],
      old,
    });
  }
};

export const eliminarSuperheroeController = async (req, res) => {
  try {
    const eliminado = await eliminarSuperheroe(req.params.id);

    if (!eliminado) {
      return res.status(404).render("dashboard", {
        superheroes: await obtenerTodosLosSuperheroes(),
        mensaje: "Superhéroe no encontrado",
      });
    }

    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).render("dashboard", {
      superheroes: await obtenerTodosLosSuperheroes(),
      mensaje: "Error al eliminar superhéroe: " + error.message,
    });
  }
};

export const eliminarSuperheroePorNombreController = async (req, res) => {
  try {
    const eliminado = await eliminarSuperheroePorNombre(req.params.nombre);
    if (!eliminado) {
      return res
        .status(404)
        .json({ mensaje: "Superhéroe no encontrado por nombre" });
    }
    const formateado = renderizarSuperheroe(eliminado);
    res.status(200).json({
      mensaje: "Superhéroe eliminado por nombre con éxito.",
      formateado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar por nombre",
      error: error.message,
    });
  }
};
