const { Equipo, Futbolistas, Contrataciones } = require("../models");  //index
//const Jugador = require("../models/jugador");


/**
 * Equipo
 */
const existeEquipoPorId = async (id) => {
    // Verificar si el equipo existe
    const existeEquipo = await Equipo.findById(id);
    if (!existeEquipo) {
        throw new Error(`El id del Equipo no existe ${id}`);
    }
};

//Implementar un nuevo metodo que nos permita validar si un equipo no tiene jugadores asignados a ese equipo, en tal caso, este equipo podria ser eliminado.


const noExistenFutbolistasPorIdEquipo = async (id) => {

    const totalJugadores = await Futbolistas.countDocuments({equipo: id});
    if (totalJugadores > 0) {
        throw new Error(`El Equipo tiene ${totalJugadores} Jugadores Activos`);
    }
};



//usamos los que está definido en modelo de Contrataciones 

// Verifica si un equipo no tiene contrataciones, permitiendo su eliminación solo si no tiene contrataciones
const noExistenContratacionesPorIdEquipo = async (id) => {
    const totalContrataciones = await Contrataciones.countDocuments({ id_equipo: id });
    if (totalContrataciones > 0) {
        throw new Error(`El Equipo tiene ${totalContrataciones} contrataciones activas y no se puede eliminar`);
    }
};


// Verifica si un jugador no tiene contrataciones, permitiendo su eliminación solo si no tiene contrataciones
const noExistenContratacionesPorIdJugador = async (id) => {
    const totalContrataciones = await Contrataciones.countDocuments({ id_futbolista: id });
    if (totalContrataciones > 0) {
        throw new Error(`El Jugador tiene ${totalContrataciones} contrataciones activas y no se puede eliminar`);
    }
};







module.exports = {
    existeEquipoPorId,
    noExistenFutbolistasPorIdEquipo,
    noExistenContratacionesPorIdEquipo,
    noExistenContratacionesPorIdJugador
};
