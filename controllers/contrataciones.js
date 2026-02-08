const { response } = require('express');
const Contratacion = require('../models/contrataciones'); // Modelo de Contratación
const Futbolista = require('../models/jugador');  // Modelo de Futbolista
const Equipo = require('../models/equipo');  // Modelo de Equipo



const { isValidObjectId } = require("../helpers/mongo-verify");  //Verificar si nos pasan un mongoID, este está en los helpers
const { now } = require("mongoose");



const obtenerContratacionesPorFutbolista = async (req, res = response) => {
    const { futbolistaId } = req.params;

    try {
        const contrataciones = await Contratacion.find({ id_futbolista: futbolistaId })
            .populate('id_futbolista', 'nombre apellidos')
            .populate('id_equipo', 'nombre_equipo');

        if (!contrataciones || contrataciones.length === 0) {
            return res.status(404).json({
                Ok: false,
                msg: 'No se encontraron contrataciones para el futbolista con el ID proporcionado.'
            });
        }

        res.json({
            Ok: true,
            contrataciones: contrataciones.map(contratacion => ({
                futbolista: `${contratacion.id_futbolista.nombre} ${contratacion.id_futbolista.apellidos}`,
                equipo: contratacion.id_equipo.nombre_equipo,
                fecha_contratacion: contratacion.fecha_contratacion,
                fecha_finalizacion: contratacion.fecha_finalizacion
            }))
        });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            Ok: false,
            msg: 'Hubo un error al procesar la solicitud',
            error: error.message
        });
    }
};

// Obtener contrataciones por ID del equipo
const obtenerContratacionesPorEquipo = async (req, res = response) => {
    const { equipoId } = req.params;

    try {
        const contrataciones = await Contratacion.find({ id_equipo: equipoId })
            .populate('id_futbolista', 'nombre apellidos')
            .populate('id_equipo', 'nombre_equipo');

        if (!contrataciones || contrataciones.length === 0) {
            return res.status(404).json({
                Ok: false,
                msg: 'No se encontraron contrataciones para el equipo con el ID proporcionado.'
            });
        }

        res.json({
            Ok: true,
            contrataciones: contrataciones.map(contratacion => ({
                futbolista: `${contratacion.id_futbolista.nombre} ${contratacion.id_futbolista.apellidos}`,
                equipo: contratacion.id_equipo.nombre_equipo,
                fecha_contratacion: contratacion.fecha_contratacion,
                fecha_finalizacion: contratacion.fecha_finalizacion
            }))
        });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            Ok: false,
            msg: 'Hubo un error al procesar la solicitud',
            error: error.message
        });
    }
};




const crearContratacionPost = async (req, res = response) => {
    const { id_futbolista, id_equipo, fecha_contratacion, fecha_finalizacion } = req.body;

    try {
        // Verificar si el futbolista y equipo existen (opcional)
        // const futbolista = await Futbolista.findById(id_futbolista);
        // const equipo = await Equipo.findById(id_equipo);

        // Crear una nueva contratación
        const nuevaContratacion = new Contratacion({
            id_futbolista,
            id_equipo,
            fecha_contratacion,
            fecha_finalizacion
        });

        // Guardar la contratación en la base de datos
        await nuevaContratacion.save();

        res.json({
            Ok: true,
            msg: 'Contratación creada exitosamente',
            contratacion: nuevaContratacion
        });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            Ok: false,
            msg: 'Error al crear la contratación',
            error: error.message
        });
    }
};


const actualizarContratacionPut = async (req, res = response) => {
    const { id } = req.params;  // ID de la contratación
    const { id_futbolista, id_equipo, fecha_contratacion, fecha_finalizacion } = req.body;

    try {
        // Buscar y actualizar la contratación
        const contratacionActualizada = await Contratacion.findByIdAndUpdate(
            id, 
            { id_futbolista, id_equipo, fecha_contratacion, fecha_finalizacion }, 
            { new: true }
        );

        if (!contratacionActualizada) {
            return res.status(404).json({
                Ok: false,
                msg: 'No se encontró la contratación con el ID proporcionado'
            });
        }

        res.json({
            Ok: true,
            msg: 'Contratación actualizada exitosamente',
            contratacion: contratacionActualizada
        });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            Ok: false,
            msg: 'Error al actualizar la contratación',
            error: error.message
        });
    }
};


const borrarContratacionDelete = async (req, res = response) => {
    const { id } = req.params;  // ID de la contratación

    try {
        const contratacionBorrada = await Contratacion.findByIdAndDelete(id);

        if (!contratacionBorrada) {
            return res.status(404).json({
                Ok: false,
                msg: 'No se encontró la contratación con el ID proporcionado'
            });
        }

        res.json({
            Ok: true,
            msg: 'Contratación eliminada exitosamente',
            contratacion: contratacionBorrada
        });

    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            Ok: false,
            msg: 'Error al eliminar la contratación',
            error: error.message
        });
    }
};










module.exports = {
    obtenerContratacionesPorFutbolista,
    obtenerContratacionesPorEquipo,
    crearContratacionPost,
    actualizarContratacionPut,
    borrarContratacionDelete

};