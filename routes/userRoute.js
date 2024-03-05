const express=require('express');
const { userRegister, userLogin, getaUser, getAlluser, updateUser } = require('../controller/userController');
const router=express.Router()

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/singleuser/:id',getaUser);
router.get('/getalluser',getAlluser);
router.put('/updateuser/:id',updateUser);

module.exports=router;