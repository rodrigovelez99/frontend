const { Router } = require('express');
const { check } =  require('express-validator')


const {
    createCarrera,
    getCarrera,
    getCarreras,
    updateCarrera,
    deleteCarrera
} = require('../controllers').Carrera;

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getCarreras );
router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getCarrera );

 router.post('/crear',[
    check('nombre', 'EL nombre es requerido').not().isEmpty(),
    validateFields
], createCarrera);


 router.put('/actualizar/:id', updateCarrera);

 router.delete('/eliminar/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteCarrera);



module.exports = router;