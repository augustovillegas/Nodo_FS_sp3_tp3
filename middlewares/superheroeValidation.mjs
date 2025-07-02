import { body, validationResult } from "express-validator";

export const registerSuperheroeValidation = () => [
  body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("El nombre del superhéroe es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("Debe tener entre 3 y 60 caracteres"),

  body("nombreReal")
    .trim()
    .notEmpty()
    .withMessage("El nombre real es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("Debe tener entre 3 y 60 caracteres"),

  body("edad")
    .notEmpty()
    .withMessage("La edad es obligatoria")
    .isInt({ min: 0 })
    .withMessage("La edad debe ser un número entero ≥ 0"),

  body("habilidadEspecial")
    .isLength({ min: 3, max: 60 })
    .withMessage("Habilidad especial: entre 3 y 60 caracteres"),

  body("poderes")
    .notEmpty()
    .withMessage("Debe ingresar al menos un poder")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    })

    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Poderes debe ser un array válido");
      }
      if (value.length === 0) {
        throw new Error("Debe tener al menos un poder");
      }
      for (const p of value) {
        if (
          typeof p !== "string" ||
          p.trim().length < 3 ||
          p.trim().length > 60
        ) {
          throw new Error("Cada poder debe ser string de 3–60 caracteres");
        }
      }
      return true;
    }),

  body("aliados")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    })
    .custom((value) => {
      if (!Array.isArray(value))
        throw new Error("Aliados debe ser un array válido");
      for (const a of value) {
        if (
          typeof a !== "string" ||
          a.trim().length < 3 ||
          a.trim().length > 60
        ) {
          throw new Error(
            "Cada aliado debe ser un string entre 3 y 60 caracteres"
          );
        }
      }
      return true;
    }),

  body("enemigos")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    })
    .custom((value) => {
      if (!Array.isArray(value))
        throw new Error("Enemigos debe ser un array válido");
      for (const e of value) {
        if (
          typeof e !== "string" ||
          e.trim().length < 3 ||
          e.trim().length > 60
        ) {
          throw new Error(
            "Cada enemigo debe ser un string entre 3 y 60 caracteres"
          );
        }
      }
      return true;
    }),
];

export const runValidation = (req, res, next) => {
  console.log("📥 Body recibido:", req.body);

  const errors = validationResult(req);
  console.log("📛 Errores de validación:", errors.array());

  if (!errors.isEmpty()) {
    const isEditing = req.originalUrl.includes("/editar");

    const old = { ...req.body };

    if (Array.isArray(old.poderes)) old.poderes = old.poderes.join(", ");
    if (Array.isArray(old.aliados)) old.aliados = old.aliados.join(", ");
    if (Array.isArray(old.enemigos)) old.enemigos = old.enemigos.join(", ");

    return res
      .status(400)
      .render(isEditing ? "editSuperhero" : "addSuperhero", {
        errors: errors.array(),
        old,
        superhero: isEditing ? { _id: req.params.id, ...req.body } : undefined,
      });
  }

  console.log("✅ Validación OK, pasa al siguiente middleware");
  next();
};
