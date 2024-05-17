const ExamSubject = require("../models/ExamSubject");

const createExamSubject = async (req, res) => {
    try {

        const alldata = req.body;
        // console.log(alldata)
        const examsubject = await new ExamSubject(alldata)
        await examsubject.save()

        res.status(201).json({
            message:"created successfully",
            success:true,
            examsubject
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getallexamsubject = async (req, res) => {
    try {
        const alldata = await ExamSubject.find().populate('subject', 'subjectName').populate('examCategory').populate('DepartmentName').populate('Course');
        res.status(201).json(alldata)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getexamsubjectdepartment = async (req, res) => {
    try {
        let query = {};
        if (req.query.DepartmentName) {
            query.DepartmentName = req.query.DepartmentName;
        }
        if (req.query.subject) {
            query.subject = req.query.subject;
        }
        if (req.query.examCategory) {
            query.examCategory = req.query.examCategory;
        }
       
        const alldata = await ExamSubject.find(query).populate('subject', 'subjectName').populate('examCategory');
        if (alldata.length === 0) {
            return res.status(200).json({message:"No data found", subjects:[]});
        }
        res.status(201).json({
            success:true,
            subjects:alldata
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateExamSubject = async (req, res) => {
    const { id } = req.params; 
    const newData = req.body;

    try {
        const updatedExamSubject = await ExamSubject.findByIdAndUpdate(
            id,
            newData,
            { new: true }
        )

        if (!updatedExamSubject) {
            return res.status(404).json({
                success: false,
                message: 'Exam subject not found or unable to update.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Exam subject updated successfully.',
            examsubject: updatedExamSubject,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating exam subject.',
            error: error.message,
        });
    }
};
module.exports = { createExamSubject, getallexamsubject, getexamsubjectdepartment,updateExamSubject }
