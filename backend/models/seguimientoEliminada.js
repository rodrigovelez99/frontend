const { model, Schema } = require('mongoose');

const SeguimientoEliminadaSchema = Schema(
    {
        tiempo_llegada:{
            type: String,
            required: [ true, 'El campo tiempo de llegada debe ser requerido'],
           
        },
        orden_llegada:{
            type: String,
            required: [ true, 'El campo orden de llegada debe ser requerido'],
        },
        pulso_inicial:{
            type: String,
            required: [ true, 'El campo pulso inicial debe ser requerido'],
        },
        pulso_final:{
            type: String,
            required: [ true, 'El campo pulso final debe ser requerido'],
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        },
        carrera: {
            type: Schema.Types.ObjectId,
            ref:'Carrera',
            required:false
        },
        corredor: {
            type: Schema.Types.ObjectId,
            ref:'Corredor',
            required:false
        }
    }
);

SeguimientoEliminadaSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model('SeguimientoEliminada', SeguimientoEliminadaSchema );