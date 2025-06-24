import SuperHeroRepository from "../repository/SuperHeroRepository.mjs";

export const obtenerTodosLosSuperheroes = async () => {
  return await SuperHeroRepository.obtenerTodos();
};

export const obtenerSuperheroePorId = async (id) => {
  return await SuperHeroRepository.obtenerPorId(id); 
};

export const crearSuperheroe = async (data) => {
  return await SuperHeroRepository.crear(data);
};

export const actualizarSuperheroe = async (id, data) => {
  return await SuperHeroRepository.actualizar(id, data);
};

export const eliminarSuperheroe = async (id) => {
  return await SuperHeroRepository.eliminar(id);
};

export const eliminarSuperheroePorNombre = async (nombre) => {
  return await SuperHeroRepository.eliminarPorNombre(nombre);
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               