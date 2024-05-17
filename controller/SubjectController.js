const subject = require("../models/subject");


const CreateSubject = async (req, res) => {
    const { SubjectCode, subjectName, Department, Course, Credits } = req.body;

    if (!SubjectCode || !subjectName || !Department || !Course || !Credits) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields for subject creation.',
        });
    }
    const subjectCheck = await subject.findOne({ SubjectCode: SubjectCode })
    
    if (subjectCheck && subjectCheck.length!==0) {
        return res.status(403).json({
            success: false,
            message: 'Please enter a unique Subject Code.',
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
        res.status(500).json({ success: false, message: error.message });
    }
}
const getSubjectDepartment = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;
        const semester = Number(req.params.semester);
        const subjects = await subject.find({ Department: departmentId, Semester: semester }).sort({ subjectName: 1 });
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
const EditSubject = async (req, res) => {


    try {
        const updatedSubject = await subject.findOneAndUpdate(
            { _id: req.params.id }, // Assuming you have an ID parameter in your route
            req.body,
            { new: true }
        );

        if (!updatedSubject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subject updated successfully',
            data: updatedSubject,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSubject = async (req, res) => {

    try {
        const subjects = await subject.find().populate('Course').populate('Department');
        res.status(201).json({
            success: true,
            message: 'got all subject successfully',
            subjects: subjects
        });
    } catch (error) {

    }
}

module.exports = {
    CreateSubject, getSubjectDepartment, getAllSubject, EditSubject
}