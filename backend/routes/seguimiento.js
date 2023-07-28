const { Router } = require('express')
const { check } = require('express-validator')

const { createSeguimiento,
    getSeguimiento,
    getSeguimientos,
    updateSeguimiento,
    deleteSeguimiento,
    restoreSeguimiento,
    getSeguimientoEliminada,
    deleteSeguimientosMasivo } = require('../controllers').Seguimiento;

const { validateFields } = require('../middlewares')

const router = Router();

///     https://localhost:3000/api/v1/products/



router.get('/:id', [
    check('id', 'Este no es un ID de Mongo correcto').isMongoId()
], getSeguimiento);

router.get('/eliminados', getSeguimientoEliminada);
router.get('/',getSeguimientos );

router.post('/crear', [
    validateFields
], createSeguimiento)

router.put('/actualizar/:id', updateSeguimiento)

router.delete('/eliminar/:id', [
    check('id', 'Debe ser un id de mongo VALIDO').isMongoId()
], deleteSeguimiento)

router.post('/restore/:id', [
    check('id', 'Debe ser un id de mongo VALIDO').isMongoId()
], restoreSeguimiento)

router.post('/eliminar-masivo', deleteSeguimientosMasivo)
module.exports = router;