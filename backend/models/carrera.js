const { model, Schema } = require('mongoose');

const CarreraSchema = Schema(
    {
        nombre_carrera:{
            type: String,
            required: [ true, 'El campo Nombre de carrera debe ser requerido'],
            unique:true
        },
        cantidad_km:{
            type: String,
            required:[ true, 'El campo cantidad de km debe ser requerido'],
        },
        detalles:{
            type: String,
            required: [ true, 'El campo detalles adicionales debe ser requerido'],
        },
        fecha:{
            type: Date,
            required: true,
            unique:true
        },
        hora:{
            type: String,
            required:true
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        }
    }
);

module.exports = model('Carrera', CarreraSchema );