const { Schema, model } = require('mongoose');

const EquipoSchema = Schema({
    nombre_equipo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    pais: {
        type: String,
        required: [true, 'El pais es obligatorio'],
    }
},
    {collection:'Equipos'}
);


EquipoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Equipo', EquipoSchema );