const router = require('express').Router();

//const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');
const apiCustomersRouter = require('./api/customers');


//router.use('/films', middlewares.checkToken,apiFilmsRouter);
router.use('/users',apiUsersRouter);
router.use('/customers',apiCustomersRouter);


module.exports = router;