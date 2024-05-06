const ExamSubject = require("../models/ExamSubject");

const createExamSubject = async (req, res) => {
    try {

        const alldata = req.body;
        // console.log(alldata)
        const examsubject = await new ExamSubject(alldata)
        await examsubject.save()

        res.status(201).json({
            examsubject
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getallexamsubject = async (req, res) => {
    try {
        const alldata = await ExamSubject.find().populate('subject', 'subjectName').populate('examCategory');
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
        const alldata = await ExamSubject.find(query).populate('subject', 'subjectName').populate('examCategory');
        if (alldata.length === 0) {
            return res.status(403).json("No data found");
        }
        res.status(201).json({
            success:true,
            subjects:alldata
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { createExamSubject, getallexamsubject, getexamsubjectdepartment }
