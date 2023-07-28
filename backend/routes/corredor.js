const { Router } = require('express');
const { check } =  require('express-validator')


const {
    createCorredor,
    getCorredores,
    getCorredor,
    updateCorredor,
    deleteCorredor
} = require('../controllers').Corredor;

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getCorredores );
router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getCorredor );

 router.post('/crear',[
    check('nombre', 'EL nombre es requerido').not().isEmpty(),
    validateFields
], createCorredor);


 router.put('/actualizar/:id', updateCorredor);

 router.delete('/eliminar/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteCorredor);



module.exports = router;