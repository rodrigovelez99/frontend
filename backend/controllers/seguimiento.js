const { response } = require('express')
const { Seguimiento, SeguimientoEliminada } = require('../models');
//const seguimientoEliminada = require('../models/seguimientoEliminada');



const getSeguimientos = async (req, res = response) => {

  //GET http://localhost:3000/
  const { limit = 100, since = 0 } = req.query;
  const query = { status: true };

  const [sum, seguimientos] = await Promise.all([
    Seguimiento.countDocuments(query),
    Seguimiento.find(query)
      .populate('carrera')
      .populate('corredor')
      .skip(Number(since))
      .limit(Number(limit))
  ])

  res.json(
    seguimientos
  )

}
const getSeguimiento = async (req, res = response) => {
  const { id } = req.params
  const seguimiento = await Seguimiento.findById(id).populate('carrera').populate('corredor');
  res.json(seguimiento);
}
const createSeguimiento = async (req, res = response) => {
  const { status, user, ...body } = req.body;

  const data = {
    ...body
  }
  const seguimiento = new Seguimiento(data);

  const newSeguimiento = await seguimiento.save();
  res.status(201).json(newSeguimiento);
}
const updateSeguimiento = async (req, res = response) => {
  const { id } = req.params;
  const { status, ...data } = req.body;
  // console.log(id,data)
  const updatedSeguimiento = await Seguimiento.findByIdAndUpdate(id, data, { new: true })
  res.json(updatedSeguimiento);
}


//metodo de eliminacion masiva
const deleteSeguimientosMasivo = async (req, res = response) => {
  const { ids } = req.body;

  if (typeof ids !== 'string' || ids.trim().length === 0) {
    return res.status(400).json({ message: 'Se debe proporcionar una cadena con los IDs separados por comas.' });
  }

  const arregloIds = ids.split(',');

  if (arregloIds.length < 2 || arregloIds.length > 10) {
    return res.status(400).json({ message: 'La cadena debe contener entre 2 y 10 IDs válidos separados por comas.' });
  }

  try {

    const seguimientosExistentes = await Seguimiento.find({ _id: { $in: arregloIds } });
    if (seguimientosExistentes.length !== arregloIds.length) {
      return res.status(400).json({ message: 'Uno o más IDs no corresponden a seguimientos existentes.' });
    }

    const deletedSeguimientos = await Seguimiento.updateMany({ _id: { $in: arregloIds } }, { status: false });

    res.json({ message: `Se eliminaron ${deletedSeguimientos.nModified} seguimientos.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar los seguimientos.' });
  }
};


const getSeguimientoEliminada = async (req, res) => {
  try {
    const seguimientoEliminada = await SeguimientoEliminada.find();
    res.json(seguimientoEliminada);
  } catch (error) {
    console.error('Error al obtener seguimiento eliminadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
const deleteSeguimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const seguimiento = await Seguimiento.findById(id);
    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrada' });
    }
    const seguimientoEliminadaData = {
      ...seguimiento.toObject(),
      deletedAt: new Date() // Puedes agregar un campo para registrar la fecha de eliminación
    };
    await SeguimientoEliminada.create(seguimientoEliminadaData);
    await Seguimiento.findByIdAndRemove(id);
    res.json({ message: 'Seguimiento masivo eliminada exitosamente', seguimiento });
  } catch (error) {
    console.error('Error al eliminar la seguimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

const restoreSeguimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const seguimientoEliminada = await SeguimientoEliminada.findById(id);

    if (!seguimientoEliminada) {
      return res.status(404).json({ error: 'Segimiento eliminada no encontrada' });
    }

    const seguimientoData = {
      ...seguimientoEliminada.toObject(),
      deletedAt: undefined // Eliminamos el campo de fecha de eliminación
    };

    await Seguimiento.create(seguimientoData);
    await SeguimientoEliminada.findByIdAndRemove(id);

    res.json({ message: 'Seguimiento restaurada exitosamente', seguimiento: seguimientoData });
  } catch (error) {
    console.error('Error al restaurar el seguiento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
module.exports = {
  getSeguimiento,
  getSeguimientos,
  createSeguimiento,
  updateSeguimiento,
  deleteSeguimiento,
  restoreSeguimiento,
  getSeguimientoEliminada,
  deleteSeguimientosMasivo
};