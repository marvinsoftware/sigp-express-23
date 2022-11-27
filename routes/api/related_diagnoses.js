const router = require('express').Router();
const { Router } = require('express');
const { body } = require('express-validator');
const { Related_diagnosis } = require('../../db');
const {check,validationResult} = require('express-validator');


router.get('/', async (req, res) => {
    const related_diagnoses = await Related_diagnosis.findAll();
    res.json(related_diagnoses);
});


router.get('/:related_diagnosesId', async (req, res) => {
    const related_diagnoses = await Related_diagnosis.findAll({
        where : { id: req.params.related_diagnosesId}   
       });  

    res.json(related_diagnoses);
});

 
router.post('/',  [
    check('patient_document','El No Documento del Paciente es obligatorio').not().isEmpty(),
    check('user_id','El user_id es obligatorio').not().isEmpty(),
    check('diagnosis_code','El Código de Diágnostico es obligatorio').not().isEmpty(),
    check('type','El campo type es obligatoria').not().isEmpty()
   
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()})
    }  
    
    const related_diagnosis = await Related_diagnosis.create(req.body);
    res.json(related_diagnosis);
});


router.put('/:related_diagnosesId', async (req, res) => {
    const related_diagnoses = await Related_diagnosis.update(req.body, {
        where : { id: req.params.related_diagnosesId}   
       });
    res.json( {success: 'Updated Related diagnosis'} );
});


router.delete('/:related_diagnosesId', async (req, res) => {
    await Related_diagnosis.destroy({
        where : { id: req.params.related_diagnosesId}   
       });  

    res.json( {success: 'Deleted Related diagnosis'} );
});


module.exports = router;