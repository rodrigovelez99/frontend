const { model, Schema } = require('mongoose');

const CorredorSchema = Schema(
    {
        nombre:{
            type: String,
            required: [ true, 'El campo Nombre debe ser requerido'],
            unique:true
        },
        peso:{
            type: String,
            required: [ true, 'El campo Peso debe ser requerido'],
        },
        altura:{
            type: String,
            required: [ true, 'El campo Altura debe ser requerido'],
        },
        edad:{
            type: String,
            required: [ true, 'El campo Edad debe ser requerido'],
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        }
    }
);


module.exports = model('Corredor', CorredorSchema );