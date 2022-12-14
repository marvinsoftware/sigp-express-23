module.exports = (sequelize, type) => {

    return sequelize.define('provider', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nit: type.STRING(10),
        verification_digit: type.STRING(1),
        provider_name: type.STRING(60),
        address: type.STRING(60),
        phone: type.STRING(10),
        email: type.STRING(50),
        contact_name: type.STRING(60)
    })


}