module.exports = (sequelize, type) => {

    return sequelize.define('customer', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        customername: type.STRING(60),
        adress: type.STRING(60),
        phone: type.STRING,
        email: type.STRING(20)
    })


}