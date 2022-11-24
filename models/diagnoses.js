module.exports = (sequelize, type) => {

    return sequelize.define('diagnosis', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        diagnosiscode: type.STRING(4),
        diagnosisname: type.STRING(100),
        sex: type.STRING(1),
        mixed: type.STRING(105),
        
    })


}