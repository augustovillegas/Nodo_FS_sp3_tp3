class IRepository {
  obtenerTodos() {
    throw new Error("Método 'obtenerTodos()' no implementado");
  }
  obtenerPorId() {
    throw new Error("Método 'obtenerSuperheroePorId()' no implementado");
  }
  crear(id) {
    throw new Error("Método 'crear()' no implementado");
  }
  actualizar() {
    throw new Error("Método 'actualizar()' no implementado");
  }
  eliminar(atributo, valor) {
    throw new Error("Método 'eliminar()' no implementado");
  }
}

export { IRepository };
