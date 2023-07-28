const { response } = require('express');
const { Corredor } = require('../models');


const getCorredores = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, corredores ] = await Promise.all([
        Corredor.countDocuments(query),
        Corredor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json(
      corredores
    )
}

const getCorredor = async (req, res= response)=>{
    const {id} = req.params
    const corredor=  await Corredor.findById(id);
    res.json(corredor);
}
const createCorredor = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existCorredor =  await Corredor.findOne({nombre: body.nombre})

    if (existCorredor)
    {
        return res.status(400).json({
            msg:`El corredor ${ existCorredor.nombre } ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre
    }

    const corredor = new Corredor(data);
    const newCorredor =  await corredor.save();
    res.status(201).json(newCorredor);
}
const updateCorredor = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const corredorUpdated =  await Corredor.findByIdAndUpdate(id,data, {new: true} )
    res.json(corredorUpdated);
}
const deleteCorredor =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedCorredor =  await Corredor.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedCorredor);
}

 module.exports ={
    createCorredor,
    getCorredores,
    getCorredor,
    updateCorredor,
    deleteCorredor
 }