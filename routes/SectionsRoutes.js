const express=require('express');
const { CreateSection, getAllSection,getAllSections, updateSection } = require('../controller/SectionsController');



const router=express.Router()

router.post('/newSection',CreateSection);
router.get('/allSection/:id',getAllSection);
router.get('/allSection',getAllSections);
router.put('/sections/:id', updateSection);

module.exports=router;