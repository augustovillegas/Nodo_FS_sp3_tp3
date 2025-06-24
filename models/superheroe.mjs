import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: {
      type: String,
      required: [true, "El nombre del superhéroe es obligatorio"],
      trim: true,
      minlength: [3, "Debe tener al menos 3 caracteres"],
      maxlength: [60, "No puede superar los 60 caracteres"],
    },
    nombreReal: {
      type: String,
      required: [true, "El nombre real es obligatorio"],
      trim: true,
      minlength: [3, "Debe tener al menos 3 caracteres"],
      maxlength: [60, "No puede superar los 60 caracteres"],
    },
    edad: {
      type: Number,
      required: [true, "La edad es obligatoria"],
      min: [0, "La edad no puede ser negativa"],
    },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: { type: String, default: "Sin registro" },
    poderes: {
      type: [String],
      required: [true, "Los poderes son obligatorios"],
      validate: {
        validator: function (arr) {
          if (!Array.isArray(arr) || arr.length === 0) {
            return false;
          }

          for (const poder of arr) {
            if (
              typeof poder !== "string" ||
              poder.trim() !== poder ||
              poder.length < 3 ||
              poder.length > 60
            ) {
              return false;
            }
          }
          return true;
        },
        message:
          "Los poderes deben ser un array de strings no vacío. Cada poder debe tener entre 3 y 60 caracteres y no debe contener espacios al inicio o al final.",
      },
    },
    aliados: {
      type: [String],
      default: ["Sin registro"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.every(
              (item) =>
                typeof item === "string" &&
                item.trim() === item &&
                item.length >= 3 &&
                item.length <= 60
            )
          );
        },
        message:
          "Cada aliado debe ser un string entre 3 y 60 caracteres sin espacios innecesarios",
      },
    },
    enemigos: {
      type: [String],
      default: ["Sin registro"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.every(
              (item) =>
                typeof item === "string" &&
                item.trim() === item &&
                item.length >= 3 &&
                item.length <= 60
            )
          );
        },
        message:
          "Cada enemigo debe ser un string entre 3 y 60 caracteres sin espacios innecesarios",
      },
    },
    creador: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Grupo-03" }
);

export const SuperHero = mongoose.model("SuperHero", superheroSchema);
