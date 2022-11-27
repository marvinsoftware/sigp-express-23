const router = require('express').Router();

const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');
const apiCustomersRouter = require('./api/customers');
const apiProvidersRouter = require('./api/providers');
const apiRelateddiagnosesRouter = require('./api/related_diagnoses');


router.use('/users',apiUsersRouter);
router.use('/customers',middlewares.checkToken,apiCustomersRouter);
router.use('/providers',middlewares.checkToken,apiProvidersRouter);
router.use('/relateddiagnoses',apiRelateddiagnosesRouter);


module.exports = router;