const Sequelize = require ('sequelize');

const UserModel = require('./models/users');
const CustomerModel = require('./models/customers');
const ProviderModel = require('./models/providers');
const DiagnosModel = require('./models/diagnoses');

const sequelize = new  Sequelize('sigp2023', 'root', '' , {
    host: 'localhost',
    dialect: 'mysql'
});


const User = UserModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Provider = ProviderModel(sequelize, Sequelize);
const Diagnos = DiagnosModel(sequelize, Sequelize);


sequelize.sync({ force: false })
.then(() => {
    console.log('Tablas Sincronizadas')
})

module.exports = {
   
    User,
    Customer,
    Provider,
    Diagnos
}