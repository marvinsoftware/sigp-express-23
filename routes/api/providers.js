const router = require('express').Router();
const { Router } = require('express');
const { body } = require('express-validator');
const { Provider } = require('../../db');
const {check,validationResult} = require('express-validator');


router.get('/', async (req, res) => {
    const providers = await Provider.findAll();
    res.json(providers);
});


router.get('/:providerId', async (req, res) => {
    const providers = await Provider.findAll({
        where : { id: req.params.providerId}   
       });  

    res.json( providers);
});


router.post('/',  [
    check('nit','El Nit del Proveedor es obligatorio').not().isEmpty(),
    check('verification_digit','El Dígito de Verificación es obligatorio').not().isEmpty(),
    check('provider_name','El Nombre de Proveedor es obligatorio').not().isEmpty(),
    check('address','La Adress es obligatoria').not().isEmpty(),
    check('phone','El Phone es obligatorio').not().isEmpty(),
    check('email','El Email es Incorrecto').isEmail(),
    check('contact_name','El Nombre de Contacto es obligatorio').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()})
    }  
    
    const provider = await Provider.create(req.body);
    res.json(provider);
});


router.put('/:providerId', async (req, res) => {
    const provider = await Provider.update(req.body, {
        where : { id: req.params.providerId}   
       });
    res.json( {success: 'Updated Provider'} );
});


router.delete('/:providerId', async (req, res) => {
    await Provider.destroy({
        where : { id: req.params.providerId}   
       });  

    res.json( {success: 'Deleted Provider'} );
});

module.exports = router;