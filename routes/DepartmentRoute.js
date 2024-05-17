const express=require('express');

const { CreateDepartment, getAllDepartment,getAllDepartments } = require('../controller/departmentController');
const department = require('../models/department');

const router=express.Router()

router.post('/newDepartment',CreateDepartment);
router.get('/allDepartment/:id',getAllDepartment);
router.get('/allDepartment',getAllDepartments);
router.put('/editdepartments/:id', async (req, res, next) => {
    try {
        const departmentId = req.params.id;
        const updatedFields = req.body; 

        const updatedDepartment = await department.findByIdAndUpdate(departmentId, updatedFields, { new: true });

        if (!updatedDepartment) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Department updated successfully",
            department: updatedDepartment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error during department update"
        });
    }
});

module.exports=router;