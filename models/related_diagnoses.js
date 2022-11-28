module.exports = (sequelize, type) => {

    return sequelize.define('related_diagnosis', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },


        patient_document: 
        {   type: type.INTEGER(10),
            validate:{
           
            len:{
                args:[7, 10],
                msg: "El tamaño del documento debe ser entre 7 y 10 Caracteres"
            },

            isInt:{
                args:true,
                msg: "El numero de documento debe ser solo numero"
            }

        }
        
        },
        
        user_id: type.STRING(50),
        diagnosis_code: type.STRING(4),        
        type: type.INTEGER(1)
    })


}