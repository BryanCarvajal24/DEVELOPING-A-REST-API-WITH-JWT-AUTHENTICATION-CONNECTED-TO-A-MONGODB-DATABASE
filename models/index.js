const Server = require('./server');
const {Usuario} = require('./usuario.model');
const {Personas, PersonaBk} = require('./personas.model');
const Equipo = require('./equipo');
const Futbolistas = require('./jugador');
const Contrataciones = require('./contrataciones');
const { system_state } = require('./system_state.model');



module.exports = {
    Server,

    Usuario,
    Personas,  
    system_state,
    PersonaBk,


    Equipo,
    Futbolistas,
    Contrataciones
}




