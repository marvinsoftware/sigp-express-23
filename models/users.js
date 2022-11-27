module.exports = (sequelize, type) => {

    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        document_number: type.INTEGER(10),
        user_name: type.STRING(60),
        address: type.STRING(60),
        phone: type.STRING(10),
        email: type.STRING(50),
        password: type.STRING(200),
        active: type.INTEGER(1),
        specialty_code: type.STRING(3),
        medical_record: type.STRING(15),
        branch_code: type.STRING(3)

    })


}