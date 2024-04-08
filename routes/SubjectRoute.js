const express=require('express');
const { CreateSubject, getSubjectDepartment } = require('../controller/SubjectController');
const { isAuthenticate, isAuthorise } = require('../middleware/tokenAuthentication');


const router=express.Router()

router.post('/newSubject',CreateSubject);
router.get('/allSubject/:departmentId',getSubjectDepartment);

module.exports=router;