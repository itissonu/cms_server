const express=require('express');
const { createNewExamType, getAllExamTypes } = require('../controller/examTypeController');


const router=express.Router()

router.post('/createNewExamType',createNewExamType)
router.get('/getallexamtypes',getAllExamTypes)
module.exports=router;