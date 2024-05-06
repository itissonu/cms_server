const Attendance = require("../models/Attendance");
const timeTable = require("../models/timeTable");
// const Subject = require("../models/subject");
const Mentors = require("../models/Mentors");
const user = require("../models/user");


//create timeTable
const CreateTimeTable = async (req, res) => {

    try {
        const teacherId = req.user._id;

        const { Section, Course, date, Department, TimeSlot, subject } = req.body;

        const alldata = { teacher: teacherId, date, Section, Course, Department, subject, TimeSlot }

        const newTimeTable = await new timeTable(alldata);

        const savedTimeTable = await newTimeTable.save();

        res.status(201).json({
            success: true,
            message: "TimeTable Created successfully",
            timeTable: savedTimeTable,
        })

    } catch (error) {
        console.error("Error Creating TimeTable:", error);
        res.status(500).json({ error: error.message });
    }

}
const checkTeacherAvail = async (req, res) => {
    try {
        const { Course, date, Department, TimeSlot } = req.body;
        let teacherNotAvailable = []
        const findtabledata = await timeTable.find({ Course, date, Department, TimeSlot });

        if (findtabledata) {
            findtabledata.forEach(element => {

                teacherNotAvailable.push((element.teacher).toString())
            });
        }
        const DeptTeacher = await Mentors.find({ Department: Department })

        const availableTeachers = DeptTeacher.filter(teacher => !teacherNotAvailable.includes((teacher._id).toString()));

        if (availableTeachers.length === 0) {
            return res.status(201).json({
                message: "These are no teacher available right now in this time slot",
                availTeacher: availableTeachers
            })
        }
        res.status(201).json({
            message: "These are the teacher available",
            availTeacher: availableTeachers
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
const findTimeTableDateWise = async (req, res) => {
    try {

        const studentId = req.user._id;
        const date = req.params.id 
        const userdetails = await user.findById(studentId);
        if (!userdetails) {

        }
        const tableData = await timeTable.find({ date: date, Section: userdetails.Section }).populate('subject').populate('Section').populate('teacher');
        
        res.status(201).json({
            message: "These are the subjects available",
            tableData
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { CreateTimeTable, checkTeacherAvail, findTimeTableDateWise }


// const today = new Date();
// const isoString = today.toISOString();
// console.log(isoString);