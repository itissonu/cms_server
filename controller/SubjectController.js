const subject = require("../models/subject");


const CreateSubject = async (req, res) => {
    const { SubjectCode, subjectName, Department, Course } = req.body;

    if (!SubjectCode || !subjectName || !Department || !Course) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields for subject creation.',
        });
    }

    try {
        const newSubject = await subject.create(req.body);
        const newSub = await newSubject.save();
        if (!newSub) {
            return res.status(401).json({
                success: false,
                message: 'error in creating subject ',
            });

        }
        res.status(201).json({
            success: true,
            message: 'subject created successfully',
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getSubjectDepartment = async (req,res,next) => {
    try {
        const departmentId = req.params.departmentId;
        const subjects = await subject.find({ Department: departmentId }).sort({ subjectName: 1 });
        if (subjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'no subject found ',
            });

        }
        res.status(201).json({
            success: true,
            message: 'got all subject successfully',
            subjects: subjects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    CreateSubject, getSubjectDepartment
}