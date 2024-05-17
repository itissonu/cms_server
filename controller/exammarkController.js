const { default: mongoose } = require("mongoose");
const ExamMark = require("../models/ExamMark");
const ExamSubject = require("../models/ExamSubject");
const User = require("../models/user")
const examType = require('../models/ExamType');
const user = require("../models/user");
const subject = require("../models/subject");

const createExamMark = async (req, res) => {

    try {
        const { userId, securedMark, examSubject,semester } = req.body;
        if (!userId || !securedMark || !examSubject) {
            return res.status(400).json({
                success: false,
                message: "please enter all the field ",
            });
        }
        const givenMark = await ExamMark.findOne({ userId, examSubject })

        if (givenMark) {
            const updatemark = await ExamMark.findOneAndUpdate({
                userId: userId,
                examSubject: examSubject,
                semester:semester
            }, { securedMark: securedMark }, { new: true });
            if (!updatemark) {
                
                throw new Error("Failed to update attendance record");
            }
            return res.status(201).json({
                success: true,
                message: "Mark updated successfully",
                mark: updatemark,
            })
        }
        const newMark = new ExamMark({ userId, securedMark, examSubject,semester })
        const savenewMark = await newMark.save()
        res.status(201).json({
            success: true,
            message: "Mark given successfully",
            mark: savenewMark,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}



const getExamMarkBySection = async (req, res) => {
    try {
        let queryFilters = {};


        if (req.query.courseId) {
            queryFilters.Course = req.params.courseId;
        }


        if (req.query.sectionId) {
            queryFilters.Section = req.params.sectionId;
        }


        if (req.query.departmentId) {
            queryFilters.Department = req.params.departmentId;
        }

        const examId = req.params.examId;
        const examSubjectId = req.params.subjectId;

        const students = await User.find(queryFilters).select('_id personalDetails RegdNo rollno ');
        if (students.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No user found",
                studentResults: []
            })
        }
        const studentIds = students.map(subject => subject._id);
        const allMarks = await ExamMark.find({ userId: { $in: studentIds }, examSubject: examId }).populate('userId', 'personalDetails _id RegdNo Course Department Section rollno').populate({
            path: 'examSubject',
            populate: [
                { path: 'examCategory' },
                { path: 'subject' }
            ]
        })
        let studentResults = {};

        if (allMarks.length === 0) {
            // console.log(examId)
            // const examdetails=await ExamSubject.findById(examId)
            // console.log(examdetails)
            students.forEach(student => {
                studentResults[student.RegdNo] = {
                    user: student,
                    securedMark: 0,
                };
            });
            return res.status(200).json(studentResults)
        }

        const filteredMark = allMarks.filter(marks => (marks.examSubject.subject._id).toString() === (examSubjectId));

        students.forEach(student => {
            studentResults[student.RegdNo] = {
                user: student,
                securedMark: 0,
                examSubject: filteredMark[0].examSubject.subject || 'null',
                examname: allMarks[0].examSubject.examCategory || 'null'
            };
        });

        filteredMark.forEach(mark => {
            const studentId = mark.userId.RegdNo;
            if (studentResults[studentId]) {

                studentResults[studentId].securedMark = mark.securedMark;
            }
        });

        res.status(201).json(studentResults)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getExamMarkOfAnUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const semesterId = req.params.semId;
        const allexamtypes = await examType.find();

        const userdetails = await user.findById(userId);
        const allsubjects = await subject.find({ Department: userdetails.Department, Semester: Number(semesterId) });

        const allexammarks = await ExamMark.find({ userId: userId }).populate({
            path: 'examSubject',
            populate: [
                { path: 'examCategory' },
                { path: 'subject' }
            ]
        })
        // console.log(allexammarks)
        let studentMark = {}

        allexamtypes.forEach(type => {
            studentMark[type.ExamType] = allsubjects.map(subject => ({
                subject,
                examMarks: 0,
                Marks:{}

            }));
        });
        allexammarks.forEach(marks => {

            const subjectName = marks.examSubject.subject._id.toString();

            const examType = marks.examSubject.examCategory.ExamType;
            if (studentMark.hasOwnProperty(examType)) {
                const subjectsForType = studentMark[examType];
                const subjectToUpdate = subjectsForType.find(item => item.subject._id.toString() === subjectName);

                if (subjectToUpdate) {
                    subjectToUpdate.examMarks = marks.securedMark;
                    subjectToUpdate.Marks=marks
                }
            }
        });


        res.status(201).json(studentMark)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}



module.exports = { createExamMark, getExamMarkBySection, getExamMarkOfAnUser }