module.exports = (sequelize, type) => {

    return sequelize.define('related_diagnosis', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        patient_document: type.INTEGER(10),
        user_id: type.STRING(50),
        diagnosis_code: type.STRING(4),        
        type: type.INTEGER(1)
    })


}