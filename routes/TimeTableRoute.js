const express=require('express');

const { isAuthenticate, isAuthorise } = require('../middleware/tokenAuthentication');
const { CreateTimeTable, checkTeacherAvail, findTimeTableDateWise } = require('../controller/TimeTableController');


const router=express.Router()

router.post('/createtimetable',isAuthenticate,CreateTimeTable);
router.post('/getavailableTeacher',checkTeacherAvail);
router.get('/datewisetimetable/:id',isAuthenticate,findTimeTableDateWise);
// router.get('/totalstudents',TotalAttendances);
//router.get('/allSubject/:departmentId'jectDepartment);

module.exports=router;