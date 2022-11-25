
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


/*
router.get('/:id', function(req, res) {
//res.send('Customer' + req.params.id);   
res.json(req.params.id);
  });
*/
 

router.post('/',  [
    check('customername','El nombre de Cliente es obligatorio').not().isEmpty(),
    check('adress','El Adress es obligatorio').not().isEmpty(),
    check('phone','El Phone es obligatorio').not().isEmpty(),
    check('email','Email Incorrecto').isEmail()
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
    res.json( {success: 'Se ha modificado'} );
});


router.delete('/:customerId', async (req, res) => {
    await Customer.destroy({
        where : { id: req.params.customerId}   
       });  

    res.json( {success: 'Customer deleting'} );
});


module.exports = router;