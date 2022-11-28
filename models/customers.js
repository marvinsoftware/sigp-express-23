module.exports = (sequelize, type) => {

    return sequelize.define('customer', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nit: type.INTEGER,
        verification_digit: type.STRING(1),
        customer_name: type.STRING(60),
        address: type.STRING(60),
        phone: type.INTEGER,
        email: type.STRING(50),
        contact_name: type.STRING(60)
    })


}