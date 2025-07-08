export function renderizarSuperheroe(superheroe) {
  return {
    id: superheroe._id,
    nombreSuperHeroe: superheroe.nombreSuperHeroe,
    nombreReal: superheroe.nombreReal,
    edad: superheroe.edad,
    planetaOrigen: superheroe.planetaOrigen,
    debilidad: superheroe.debilidad,
    habilidadEspecial: superheroe.habilidadEspecial,
    poderes: superheroe.poderes,
    aliados: superheroe.aliados,
    enemigos: superheroe.enemigos,
    creador: superheroe.creador,
    createdAt: superheroe.createdAt
  };
}

export function renderizarListaSuperheroes(lista) {
  return lista.map(renderizarSuperheroe);
}
