const express=require('express');
const { CreateSubject, getSubjectDepartment,getAllSubject, EditSubject } = require('../controller/SubjectController');
const { isAuthenticate, isAuthorise } = require('../middleware/tokenAuthentication');


const router=express.Router()

router.post('/newSubject',CreateSubject);
router.get('/allsubject',getAllSubject)
router.put('/subjectsupdate/:id', EditSubject);
router.get('/allSubject/:departmentId/:semester',getSubjectDepartment);

module.exports=router;