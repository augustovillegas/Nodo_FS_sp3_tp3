import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    process.exit(1);
  }
};
