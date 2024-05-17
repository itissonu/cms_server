const express=require('express');
const {  getAllCourse, CreateCourse, updateCourse, getCourseById } = require('../controller/CourseController');

const router=express.Router()

router.post('/newSection',CreateCourse);
router.get('/allCourse',getAllCourse);
router.get("/getacourse/:id", getCourseById)
router.put("/update/:id", updateCourse);

module.exports=router;