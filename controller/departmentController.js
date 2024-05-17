const course = require("../models/course");
const department = require("../models/department");


const CreateDepartment = async (req, res, next) => {
    try {

        const newDepart = new department(req.body)
        const createdDepart = await newDepart.save();

        if (!createdDepart) {
            return res.status(401).json({
                success: false,
                message: "error during creating department "
            })
        }
        res.status(201).json({
            success: true,
            message: "department created successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "error during creating department "
        })
    }
}

const getAllDepartment = async (req, res, next) => {
    try {

        const courceId = req.params.id;
        const departments = await department.find({ Course: courceId }).populate({ path: 'Course', mode: course, select: 'CourseName' });

        if (!departments) {
            return res.status(201).json({
                success: true,
                message: "no department found"
            })
        }
        res.status(201).json({
            department: departments,
            success: true
        });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "error during getting department "
        })
    }

}
const getAllDepartments = async (req, res) => {
    try {
        const departments = await department.find().populate({ path: 'Course', mode: course, select: 'CourseName' });
        res.status(201).json({
            department: departments,
            success: true
        });
    } catch (error) {

    }
}

module.exports = { CreateDepartment, getAllDepartment, getAllDepartments }