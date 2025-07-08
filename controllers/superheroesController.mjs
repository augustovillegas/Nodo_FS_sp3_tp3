import {
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  obtenerTodosLosSuperheroes,
  eliminarSuperheroePorNombre,
  obtenerSuperheroePorId,
} from "../services/superheroesService.mjs";
import {
  renderizarListaSuperheroes,
  renderizarSuperheroe,
} from "../views/responseView.mjs";

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  console.log("📥 GET /api/heroes - Obtener todos los superhéroes");

  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    console.log("✅ Superhéroes obtenidos:", superheroes.length);

    if (req.accepts("html")) {
      return res.render("dashboard", { superheroes });
    }

    if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Superhéroes obtenidos correctamente.",
        cantidad: superheroes.length,
        data: renderizarListaSuperheroes(superheroes),
      });
    }

    res
      .status(406)
      .send("Not Acceptable: Solo se soportan respuestas HTML o JSON.");
  } catch (error) {
    console.error("❌ Error al obtener superhéroes:", error.message);

    if (req.accepts("json")) {
      return res.status(500).json({
        mensaje: "Error al obtener los superhéroes",
        error: error.message,
      });
    }

    res.status(500).send("Error interno al obtener superhéroes");
  }
};

export const formularioAgregarSuperheroeController = (req, res) => {
  console.log("GET /api/heroes/agregar - Renderizar formulario de agregar");
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

  console.log("📥 POST /api/heroes/agregar - Datos recibidos:", old);

  try {
    const data = {
      ...req.body,
      poderes: req.body.poderes,
      aliados: req.body.aliados,
      enemigos: req.body.enemigos,
      habilidadEspecial: req.body.habilidadEspecial,
    };

    const nuevo = await crearSuperheroe(data);
    console.log("✅ Superhéroe creado correctamente:", nuevo);

    if (req.accepts("html")) {
      return res.redirect("/api/heroes");
    } else if (req.accepts("json")) {
      return res.status(201).json({
        mensaje: "Superhéroe creado exitosamente.",
        data: nuevo,
      });
    } else {
      return res
        .status(406)
        .send("Not Acceptable: Solo se soportan respuestas HTML o JSON.");
    }
  } catch (error) {
    console.error("❌ Error al crear superhéroe:", error);

    if (req.accepts("json")) {
      return res.status(500).json({
        mensaje: "Error al crear superhéroe.",
        error: error.message,
      });
    }

    res.status(500).render("addSuperhero", {
      errors: [{ msg: error.message }],
      old,
    });
  }
};

export const formularioEditarSuperheroeController = async (req, res) => {
  console.log(`GET /api/heroes/${req.params.id}/editar - Editar superhéroe`);
  try {
    const superhero = await obtenerSuperheroePorId(req.params.id);
    if (!superhero) {
      console.warn("Superhéroe no encontrado");
      return res.status(404).send("Superhéroe no encontrado");
    }
    res.render("editSuperhero", {
      errors: [],
      old: {},
      superhero,
    });
  } catch (error) {
    console.error("Error al buscar superhéroe:", error);
    res.status(500).send(error.message);
  }
};

export const actualizarSuperheroeController = async (req, res) => {
  const superheroeId = req.params.id;

  console.log(
    `📝 PUT /api/heroes/${superheroeId}/editar - Datos recibidos`,
    req.body
  );

  const old = {
    _id: superheroeId,
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
    const data = {
      ...req.body,
      poderes: req.body.poderes,
      aliados: req.body.aliados,
      enemigos: req.body.enemigos,
      habilidadEspecial: req.body.habilidadEspecial,
    };

    const update = await actualizarSuperheroe(superheroeId, data);

    if (!update) {
      console.warn("⚠️ Superhéroe no encontrado para actualizar.");

      if (req.accepts("json")) {
        return res.status(404).json({
          mensaje: "Superhéroe no encontrado para actualizar.",
          id: superheroeId,
        });
      }

      return res.status(404).render("editSuperhero", {
        errors: [{ msg: "Superhéroe no encontrado para actualizar." }],
        old,
      });
    }

    console.log("✅ Superhéroe actualizado:", update);

    if (req.accepts("html")) {
      return res.redirect("/api/heroes");
    } else if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Superhéroe actualizado con éxito.",
        data: update,
      });
    } else {
      return res
        .status(406)
        .send("Not Acceptable: Solo se soportan respuestas HTML o JSON.");
    }
  } catch (error) {
    console.error("❌ Error al actualizar superhéroe:", error);
    let errorMessage = error.message;
    if (error.name === "ValidationError") {
      errorMessage = "Error de validación: Por favor, revise los campos.";
    }

    if (req.accepts("json")) {
      return res.status(400).json({
        mensaje: "Error al actualizar el superhéroe.",
        error: errorMessage,
      });
    }

    res.status(400).render("editSuperhero", {
      errors: [{ msg: errorMessage }],
      old,
    });
  }
};

export const eliminarSuperheroeController = async (req, res) => {
  console.log(`DELETE /api/heroes/${req.params.id} - Eliminar superhéroe`);
  try {
    const eliminado = await eliminarSuperheroe(req.params.id);

    if (!eliminado) {
      console.warn("Superhéroe no encontrado para eliminar");

      if (req.accepts("json")) {
        return res.status(404).json({ mensaje: "No encontrado para eliminar" });
      }

      return res.status(404).render("dashboard", {
        superheroes: await obtenerTodosLosSuperheroes(),
        mensaje: "Superhéroe no encontrado",
      });
    }

    console.log("Superhéroe eliminado correctamente:", eliminado);

    if (req.accepts("html")) {
      return res.redirect("/api/heroes");
    } else if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Superhéroe eliminado con éxito",
        data: eliminado,
        fecha: new Date(),
      });
    } else {
      return res.status(406).send("Formato no aceptado");
    }
  } catch (error) {
    console.error("Error al eliminar superhéroe:", error);

    if (req.accepts("json")) {
      return res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }

    res.status(500).render("dashboard", {
      superheroes: await obtenerTodosLosSuperheroes(),
      mensaje: "Error al eliminar superhéroe: " + error.message,
    });
  }
};


export const eliminarSuperheroePorNombreController = async (req, res) => {
  const nombre = req.params.nombre;
  console.log(`🗑 DELETE /api/heroes/nombre/${nombre}`);

  try {
    const eliminado = await eliminarSuperheroePorNombre(nombre);

    if (!eliminado) {
      console.warn("⚠️ Superhéroe no encontrado por nombre");

      if (req.accepts("json")) {
        return res
          .status(404)
          .json({ mensaje: "Superhéroe no encontrado por nombre" });
      }

      const superheroes = await obtenerTodosLosSuperheroes();
      return res.status(404).render("dashboard", {
        superheroes,
        mensaje: "Superhéroe no encontrado por nombre",
      });
    }

    const formateado = renderizarSuperheroe(eliminado);
    console.log("✅ Superhéroe eliminado por nombre:", formateado);

    if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Superhéroe eliminado por nombre con éxito.",
        formateado,
      });
    }

    const superheroes = await obtenerTodosLosSuperheroes();
    return res.render("dashboard", {
      superheroes,
      mensaje: `Superhéroe "${eliminado.nombreSuperHeroe}" eliminado con éxito.`,
    });
  } catch (error) {
    console.error("❌ Error al eliminar por nombre:", error);

    if (req.accepts("json")) {
      return res.status(500).json({
        mensaje: "Error al eliminar por nombre",
        error: error.message,
      });
    }

    const superheroes = await obtenerTodosLosSuperheroes();
    res.status(500).render("dashboard", {
      superheroes,
      mensaje: "Error al eliminar superhéroe: " + error.message,
    });
  }
};
