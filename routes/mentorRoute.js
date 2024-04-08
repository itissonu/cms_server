const express=require('express');

const { getaMentor, getAllMentor, updateMentor, MentorLogin, MentorRegister, OTPverification, mentorLogout, DeleteAMentor, updatePassword, forgotPassword, resetPassword,endresetPassword } = require('../controller/mentorController');
const { sendOTPLogin } = require('../controller/otpgenerator');
const { isAuthenticate } = require('../middleware/tokenAuthentication');
//const { resetPasswordmiddle } = require('../middleware/reserPasswordmiddle');

const router=express.Router()

router.post('/register',MentorRegister);
router.post('/login',MentorLogin,sendOTPLogin);
router.post('/login/otp',OTPverification);
router.get('/singlementor/:id',getaMentor);
router.get('/getallmentor',getAllMentor);
router.put('/updatementor/:id',updateMentor);
router.post('/logout',mentorLogout);
router.delete('/deletementor/:id',DeleteAMentor);
router.put('/updatepassword',isAuthenticate,updatePassword);
router.post('/forgotpassword',resetPassword);
router.put('/forgotpassword/newpassword',isAuthenticate,endresetPassword)



module.exports=router;