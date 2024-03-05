const express=require('express');
const { CreateSection, getAllSection } = require('../controller/SectionsController');



const router=express.Router()

router.post('/newSection/:courceId/:deptid',CreateSection);
router.get('/allSection/:id',getAllSection);

module.exports=router;