const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db');
const {check,validationResult} = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

router.post('/register',  [
    check('user_name','El nombre de usuario es obligatorio').not().isEmpty(),
    check('password','El Password es obligatorio').not().isEmpty(),
    check('password','Mínimo 5 Caracteres').isLength({ min: 5}),
    check('password','Máximo 15 Caracteres').isLength({ max: 15}),
    //check('password','5 to 15 characters required').isLength(5 , 15),
    check('email','El Email debe estar correcto').isEmail()

], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()})
    }  
    
    const email = await User.findOne({where: {email: req.body.email}});
    if (!email) {
        req.body.password = bcrypt.hashSync(req.body.password, 10 )
        const user = await User.create(req.body);
        res.json(user);
    }
    else
    {
        res.json({ error: 'Email ya existe en la bd'});
    }

});


router.post('/login', async (req, res)=>{
    const user = await User.findOne({where: {email: req.body.email}});
    if (user) {
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if (iguales) {
            res.json({ success: createToken(user) });
        }else {res.json({ error: 'Error en Usuario y/o Contraseña'});
    
              }

    }else{
        res.json({ error: 'Error en Usuario y/o Contraseña'});
    }
    
});


const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }
    return jwt.encode(payload, 'frase secreta');
}

module.exports = router;