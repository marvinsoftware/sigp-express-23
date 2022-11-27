const router = require('express').Router();
const { Router } = require('express');
const { body } = require('express-validator');
const { Customer } = require('../../db');
const {check,validationResult} = require('express-validator');


router.get('/', async (req, res) => {
    const customers = await Customer.findAll();
    res.json(customers);
});


router.get('/:customerId', async (req, res) => {
    const customers = await Customer.findAll({
        where : { id: req.params.customerId}   
       });  

    res.json( customers);
});

 
router.post('/',  [
    check('nit','El Nit del Cliente es obligatorio').not().isEmpty(),
    check('verification_digit','El Dígito de Verificación es obligatorio').not().isEmpty(),
    check('customer_name','El Nombre de Cliente es obligatorio').not().isEmpty(),
    check('address','La Address es obligatoria').not().isEmpty(),
    check('phone','El Phone es obligatorio').not().isEmpty(),
    check('email','El Email es Incorrecto').isEmail(),
    check('contact_name','El Nombre de Contacto es obligatorio').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()})
    }  
    
    const customer = await Customer.create(req.body);
    res.json(customer);
});


router.put('/:customerId', async (req, res) => {
    const customer = await Customer.update(req.body, {
        where : { id: req.params.customerId}   
       });
    res.json( {success: 'Updated Customer'} );
});


router.delete('/:customerId', async (req, res) => {
    await Customer.destroy({
        where : { id: req.params.customerId}   
       });  

    res.json( {success: 'Deleted Customer'} );
});


module.exports = router;