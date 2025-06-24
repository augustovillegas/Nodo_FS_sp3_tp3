import { SuperHero } from "../models/superheroe.mjs";
import { IRepository } from "./IRespository.mjs";


class SuperHeroRepository extends IRepository {

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async crear(data) {
    return await SuperHero.create(data);
  }

  async actualizar(id, data) {
    return await SuperHero.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return await SuperHero.findByIdAndDelete(id);
  }

  async eliminarPorNombre(nombre) {
  return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
}
}

export default new SuperHeroRepository();
