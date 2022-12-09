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
    const Id= await Customer.findOne({where: {id: req.params.customerId}});
    if (Id) {  

        const customers = await Customer.findAll({
        where : { id: req.params.customerId}   
        });  

        res.json(customers);

    }else{

        res.json({ error: 'Id no existe en la bd'});
    } 
});

 
router.post('/',  [
    check('nit','El Nit del Cliente es obligatorio').not().isEmpty(),
    check('verification_digit','El Dígito de Verificación es obligatorio').not().isEmpty(),
    check('verification_digit','El Dígito de Verificación debe ser numérico').isNumeric(),
    check('verification_digit','El Dígito de Verificación debe ser de un solo caracter').isLength({ max: 1}),
    check('customer_name','El Nombre de Cliente es obligatorio').not().isEmpty(),
    check('address','La Address es obligatoria').not().isEmpty(),
    check('phone','El Phone es obligatorio').not().isEmpty(),
    check('phone','El Phone debe ser numérico').isNumeric(),
    check('email','El Email es Incorrecto').isEmail(),
    check('contact_name','El Nombre de Contacto es obligatorio').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()})
    }  

    const Nit = req.body.nit;
    if(Nit > 2147483647) {
        res.json({ error: 'Desbordamiento de pila'});
        
    }else{
       const nit = await Customer.findOne({where: {nit: req.body.nit}});
        if (!nit) {
            const customer = await Customer.create(req.body);
            res.json(customer);
        }
        else
        {
            res.json({ error: 'Nit ya existe en la bd'});
        }      
    }
    
});


router.put('/:customerId', async (req, res) => {

    const Id= await Customer.findOne({where: {id: req.params.customerId}});
    if (Id) {     
            const customer = await Customer.update(req.body, {
            where : { id: req.params.customerId}   
            });
            res.json( {success: 'Updated Customer'} );
    }
    else
    {
        res.json({ error: 'Id no existe en la bd'});
    } 

});



router.delete('/:customerId',async (req, res) => {   
const identification = req.params.customerId;    

if(identification)
{
    const Id= await Customer.findOne({where: {id: req.params.customerId}});
    if (Id) {     
        await Customer.destroy({
            where : { id: req.params.customerId}   
           });  
    
        res.json( {success: 'Deleted Customer'} );
    }
    else
    {
        res.json({ error: 'Id no existe en la bd'});
    } 

}else 
{
res.status(404).send("Sorry, we cannot find that!"); 
}

});

module.exports = router;