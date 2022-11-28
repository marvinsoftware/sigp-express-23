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
    const Id= await Provider.findOne({where: {id: req.params.providerId}});
    if (Id) {  

        const providers = await Provider.findAll({
        where : { id: req.params.providerId}   
        });  

        res.json(providers);

    }else{

        res.json({ error: 'Id no existe en la bd'});
    } 
});


router.post('/',  [
    check('nit','El Nit del Proveedor es obligatorio').not().isEmpty(),
    check('verification_digit','El Dígito de Verificación es obligatorio').not().isEmpty(),
    check('verification_digit','El Dígito de Verificación debe ser numérico').isNumeric(),
    check('verification_digit','El Dígito de Verificación debe ser de un solo caracter').isLength({ max: 1}),
    check('provider_name','El Nombre de Proveedor es obligatorio').not().isEmpty(),
    check('address','La Adress es obligatoria').not().isEmpty(),
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
        const nit = await Provider.findOne({where: {nit: req.body.nit}});
        if (!nit) {
            const provider = await Provider.create(req.body);
            res.json(provider);
        }
        else
        {
            res.json({ error: 'Nit ya existe en la bd'});
        }      
    }

});


router.put('/:providerId', async (req, res) => {
    const Id= await Provider.findOne({where: {id: req.params.providerId}});
    if (Id) {     
            const provider = await Provider.update(req.body, {
            where : { id: req.params.providerId}   
            });
            res.json( {success: 'Updated Provider'} );
    }
    else
    {
        res.json({ error: 'Id no existe en la bd'});
    } 

});


router.delete('/:providerId', async (req, res) => {  
    const Id= await Provider.findOne({where: {id: req.params.providerId}});
    if (Id) {     
        await Provider.destroy({
            where : { id: req.params.providerId}   
           });  
    
        res.json( {success: 'Deleted Provider'} );
    }
    else
    {
        res.json({ error: 'Id no existe en la bd'});
    } 

});

module.exports = router;