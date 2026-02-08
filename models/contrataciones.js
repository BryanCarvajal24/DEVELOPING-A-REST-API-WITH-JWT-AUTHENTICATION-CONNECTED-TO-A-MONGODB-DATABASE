const { Schema, model } = require('mongoose');

const ContratacionSchema = Schema({
    id_futbolista: {  // Cambiado para coincidir con la base de datos
        type: Schema.Types.ObjectId,
        ref: 'Futbolistas',  // Referencia al modelo Futbolista
        required: [true, 'El ID del futbolista es obligatorio']
    },
    id_equipo: {  // Cambiado para coincidir con la base de datos
        type: Schema.Types.ObjectId,
        ref: 'Equipo',  // Referencia al modelo Equipo
        required: [true, 'El ID del equipo es obligatorio']
    },
    fecha_contratacion: {
        type: String,
        required: [true, 'La fecha de contratación es obligatoria']
    },
    fecha_finalizacion: {
        type: String,
        required: [true, 'La fecha de finalización es obligatoria']
    }
}, 
{ collection: 'Contrataciones' }
);

module.exports = model('Contratacion', ContratacionSchema);
