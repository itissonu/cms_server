const express=require('express');

const { isAuthenticate, isAuthorise } = require('../middleware/tokenAuthentication');
const { TakeAttendace, findallattendance, AllStudentAttendance, TotalAttendances } = require('../controller/AttendanceController');


const router=express.Router()

router.put('/takeanattendance',isAuthenticate,TakeAttendace);
router.get('/allatt',findallattendance);
router.get('/allattofstudents',AllStudentAttendance);
router.get('/totalstudents',TotalAttendances);
//router.get('/allSubject/:departmentId'jectDepartment);

module.exports=router;