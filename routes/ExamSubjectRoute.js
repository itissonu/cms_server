const express=require('express');
const { createExamSubject, getallexamsubject, getexamsubjectdepartment } = require('../controller/ExamSubjectController');


const router=express.Router()

router.post('/creatAExamsubject',createExamSubject)
router.get('/getallexamsubject',getallexamsubject)
router.get('/getexamsubjectbysections',getexamsubjectdepartment)

module.exports=router;