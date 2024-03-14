const express=require('express');

const { getaMentor, getAllMentor, updateMentor, MentorLogin, MentorRegister, OTPverification, mentorLogout, DeleteAMentor } = require('../controller/mentorController');
const { sendOTPLogin } = require('../controller/otpgenerator');

const router=express.Router()

router.post('/register',MentorRegister);
router.post('/login',MentorLogin,sendOTPLogin);
router.post('/login/otp',OTPverification);
router.get('/singlementor/:id',getaMentor);
router.get('/getallmentor',getAllMentor);
router.put('/updatementor/:id',updateMentor);
router.post('/logout',mentorLogout);
router.delete('/deletementor/:id',DeleteAMentor)

module.exports=router;