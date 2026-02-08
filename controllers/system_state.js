const { response, request } = require('express')
const { system_state} = require('../models/system_state.model');

//const { bdmysql } = require('../database/MariaDbConnection');

//const { Op } = require("sequelize");

const system_stateGet = async (req, res = response) => {
       

    try {
        const unosSystemStates = await system_state.findAll();
        
        res.json({
            ok: true,
            data: unosSystemStates
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

module.exports = {
    system_stateGet
}