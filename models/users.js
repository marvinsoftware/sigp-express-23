module.exports = (sequelize, type) => {

    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        username: type.STRING(60),
        adress: type.STRING(60),
        phone: type.STRING,
        email: type.STRING(20),
        password: type.STRING(150)
    })


}