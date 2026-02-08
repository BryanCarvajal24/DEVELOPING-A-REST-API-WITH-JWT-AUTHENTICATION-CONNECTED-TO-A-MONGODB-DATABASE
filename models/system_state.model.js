const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');


const system_state = bdmysql.define('system_state',
    {
        // Model attributes are defined here
        'countryid': {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },

        'stateid': {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
            // allowNull defaults to true
        },
        'name': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'optionsStatus': {
            type: DataTypes.STRING,
            allowNull: false

            // allowNull defaults to true
        },
    },

    {
        //Maintain table name don't plurilize
        freezeTableName: true,

        // I don't want createdAt
        createdAt: false,

        // I don't want updatedAt
        updatedAt: false
    }
);

module.exports = {
    system_state
}

