const express=require('express');

const { isAuthenticate, isAuthorise } = require('../middleware/tokenAuthentication');
const { TakeAttendace, findallattendance, AllStudentAttendance, TotalAttendances, findStudentAttendanceFilter } = require('../controller/AttendanceController');


const router=express.Router()

router.put('/takeanattendance',isAuthenticate,TakeAttendace);
router.get('/allatt',findallattendance);
router.get('/allattofstudents',AllStudentAttendance);
router.get('/totalstudents',TotalAttendances);
router.post('/attendancefilter',findStudentAttendanceFilter);

module.exports=router;