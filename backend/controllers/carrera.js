const { response } = require('express');
const { Carrera } = require('../models');


const getCarreras = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, carreras ] = await Promise.all([
        Carrera.countDocuments(query),
        Carrera.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json(
      carreras
    )
}

const getCarrera = async (req, res= response)=>{
    const {id} = req.params
    const carrera=  await Carrera.findById(id);
    res.json(carrera);
}
const createCarrera = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existCarrera =  await Carrera.findOne({nombre: body.nombre_carrera})

    if (existCarrera)
    {
        return res.status(400).json({
            msg:`La carrera ${ existCarrera.nombre_carrera } ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre_carrera
    }

    const carrera = new Carrera(data);

    const newCarrera =  await carrera.save();
    res.status(201).json(newCarrera);
}
const updateCarrera = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const carreraUpdated =  await Carrera.findByIdAndUpdate(id,data, {new: true} )
    res.json(carreraUpdated);
}
const deleteCarrera =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedCarrera =  await Carrera.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedCarrera);
}

 module.exports ={
    createCarrera,
    getCarreras,
    getCarrera,
    updateCarrera,
    deleteCarrera
 }