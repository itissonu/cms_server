const express=require('express');

const { isAuthenticate, isAuthorise } = require('../middleware/tokenAuthentication');
const { CreateTimeTable, checkTeacherAvail, findTimeTableDateWise, findTimeTable, findAvailabiltySection, findTimeTableDateWiseteacher } = require('../controller/TimeTableController');


const router=express.Router()

router.post('/createtimetable',CreateTimeTable);
router.post('/getavailableTeacher',checkTeacherAvail);
router.get('/datewisetimetable/:id',isAuthenticate,findTimeTableDateWise);
router.get('/datewisetimetableteacher/:id',isAuthenticate,findTimeTableDateWiseteacher);
router.get('/alltimetable',findTimeTable);
router.post('/getavailablity',findAvailabiltySection);

module.exports=router;