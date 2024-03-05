const express=require('express');

const { CreateDepartment, getAllDepartment } = require('../controller/departmentController');

const router=express.Router()

router.post('/newDepartment/:id',CreateDepartment);
router.get('/allDepartment/:id',getAllDepartment);

module.exports=router;