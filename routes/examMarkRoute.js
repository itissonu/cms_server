const express=require('express');
const { createExamMark,  getExamMarkBySection, getExamMarkOfAnUser } = require('../controller/exammarkController');



const router=express.Router()

router.post('/creatAExamMark',createExamMark)

 router.get('/getexamsubjectbysections/:examId/:subjectId',getExamMarkBySection)

 router.get('/getexammarkofanuser/:id/:semId',getExamMarkOfAnUser)
 
module.exports=router;