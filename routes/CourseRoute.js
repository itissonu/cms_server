const express=require('express');
const {  getAllCourse, CreateCourse } = require('../controller/CourseController');

const router=express.Router()

router.post('/newSection',CreateCourse);
router.get('/allCourse',getAllCourse);

module.exports=router;