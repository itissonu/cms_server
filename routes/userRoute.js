const express=require('express');
const { userRegister, userLogin, getaUser, getAlluser, updateUser, OTPverificationUser, Logout, DeleteAUser, getaUserByRegdNo } = require('../controller/userController');
const { sendOTPLogin } = require('../controller/otpgenerator');
const router=express.Router()

router.post('/register',userRegister);
router.post('/logout',Logout);
router.post('/login',userLogin,sendOTPLogin);
router.post('/login/otp',OTPverificationUser);
router.get('/singleuser/:id',getaUser);
router.get('/singleuserByRegdNo',getaUserByRegdNo);
router.get('/getalluser',getAlluser);
router.put('/updateuser/:id',updateUser);
router.delete('/deletuser/:id',DeleteAUser)

module.exports=router;