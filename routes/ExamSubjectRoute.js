const express=require('express');
const { createExamSubject, getallexamsubject, getexamsubjectdepartment, updateExamSubject } = require('../controller/ExamSubjectController');


const router=express.Router()

router.post('/creatAExamsubject',createExamSubject)
router.get('/getallexamsubject',getallexamsubject)
router.get('/getexamsubjectbysections',getexamsubjectdepartment)
router.put('/editexamsubjects/:id', updateExamSubject);
module.exports=router;