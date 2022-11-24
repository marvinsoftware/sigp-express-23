module.exports = (sequelize, type) => {

    return sequelize.define('provider', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        providername: type.STRING(60),
        adress: type.STRING(60),
        phone: type.STRING,
        email: type.STRING(20)
    })


}