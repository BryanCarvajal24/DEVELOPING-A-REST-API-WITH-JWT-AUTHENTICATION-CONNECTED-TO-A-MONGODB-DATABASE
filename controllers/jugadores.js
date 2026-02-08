const { response } = require("express");
const Futbolista = require("../models/jugador");  // El modelo de futbolistas
const { isValidObjectId } = require("../helpers/mongo-verify");
const { now } = require("mongoose");



// Obtener todos los futbolistas
const obtenerFutbolistasGet = async (req, res = response) => {
    const { limite = 20, desde = 0 } = req.query;

    try {
        const [total, futbolistas] = await Promise.all([
            Futbolista.countDocuments(), 
            Futbolista.find({})
                .populate('equipo', 'nombre_equipo') 
                .skip(Number(desde)) 
                .limit(Number(limite)) 
                .sort({ nombre: 1 }) 
        ]);

        res.json({
            Ok: true,
            total: total,
            resp: futbolistas
        });
    } catch (error) {
        console.log("ERROR", error);
        res.json({
            Ok: false,
            resp: error.message
        });
    }
};


// Obtener un futbolista por ID
const obtenerFutbolistaGetByID = async (req, res = response) => {
    const { id } = req.params;
    try {
    const futbolista = await Futbolista.findById(id);
    res.json({ Ok: true, resp: futbolista });
    } catch (error) {
    res.json({ Ok: false, resp: error });
    }
};

// Obtener futbolistas por equipo
const obtenerFutbolistasPorEquipo = async (req, res = response) => {
    const { equipoId } = req.params;
    try {
    const futbolistas = await Futbolista.find({ equipo: equipoId});
    res.json({ Ok: true, resp: futbolistas });
    } catch (error) {
    res.json({ Ok: false, resp: error });
    }
};




// Obtener futbolistas por su nombre
const obtenerFutbolistasPorNombre = async (req, res = response) => {
    const { nombre } = req.params;
    try {
    const futbolistas = await Futbolista.find({ nombre: new RegExp(nombre, 'i') });
    res.json({ Ok: true, resp: futbolistas });
    } catch (error) {
    res.json({ Ok: false, resp: error });
    }
};



// Adicionar un futbolista
const crearFutbolistaPost = async (req, res = response) => {
    const body = req.body;

    try {
    const futbolistaDB = await Futbolista.findOne({ nombre: body.nombre, apellidos: body.apellidos });

    if (futbolistaDB) {
        return res.status(400).json({
        Ok: false,
        msg: `El Futbolista ${body.nombre} ${body.apellidos}, ya existe en la BD`,
        });
    }

    const futbolista = new Futbolista(body);
    await futbolista.save();

    res.json({ Ok: true, msg: 'Futbolista Insertado', resp: futbolista });
    } catch (error) {
    console.log("ERROR:INSERTAR", error);
    res.json({ Ok: false, msg: 'Error al Insertar Futbolista', resp: error });
    }
};

// Actualizar un futbolista
const actualizarFutbolistaPut = async (req, res = response) => {
    const { id } = req.params;
    const data = req.body;

    try {
    const futbolista = await Futbolista.findByIdAndUpdate(id, data, { new: true });
    res.json({ Ok: true, msg: 'Futbolista Actualizado', resp: futbolista });
    } catch (error) {
    console.log("ERROR_MODIFICAR", error);
    res.json({ Ok: false, resp: error });
    }
};

// Eliminar un futbolista
const borrarFutbolistaDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
    const futbolista = await Futbolista.findById(id);

    if (futbolista) {
        const futbolistaBorrado = await Futbolista.findByIdAndDelete(id);
        res.json({ Ok: true, mensaje: "Futbolista Borrado", resp: futbolistaBorrado });
    } else {
        return res.status(400).json({
        Ok: false,
        msg: `El Futbolista no existe en la BD`,
        });
    }
    } catch (error) {
    console.log("ERROR_BORRADO", error);
    res.json({ Ok: false, resp: error });
    }
};

// Exportar las funciones del controlador
module.exports = {
    obtenerFutbolistasGet,
    obtenerFutbolistaGetByID,
    obtenerFutbolistasPorEquipo,
    obtenerFutbolistasPorNombre,
    crearFutbolistaPost,
    actualizarFutbolistaPut,
    borrarFutbolistaDelete
};









/*const obtenerFutbolistasGet = async (req, res = response) => {
    const { limite = 20, desde = 0 } = req.query;

    try {
    const [total, futbolistas] = await Promise.all([
        Futbolista.countDocuments(),
        Futbolista.find({})
        .skip(Number(desde))
        .limit(Number(limite))
        .sort({ nombre: 1 })
    ]);

    res.json({ Ok: true, total: total, resp: futbolistas });
    } catch (error) {
    console.log("ERROR", error);
    res.json({ Ok: false, resp: error });
    }
};
*/