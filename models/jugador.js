const { Schema, model } = require('mongoose');

const FutbolistaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    internacional: {
        type: Boolean,
        default: false
    },
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',  // Hace referencia a la colección de equipos
        required: [true, 'El equipo es obligatorio']
    }
},
    {collection: 'Futbolistas'}
);

module.exports = model('Futbolistas', FutbolistaSchema);
