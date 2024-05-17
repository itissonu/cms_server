const Attendance = require("../models/Attendance");
const timeTable = require("../models/timeTable");
// const Subject = require("../models/subject");
const Mentors = require("../models/Mentors");
const user = require("../models/user");


//create timeTable
const CreateTimeTable = async (req, res) => {

    try {

        const { Section, Course, date, Department, TimeSlot, subject, teacher } = req.body;

        const alldata = { teacher, date, Section, Course, Department, subject, TimeSlot }

        const newTimeTable = await new timeTable(alldata);

        const savedTimeTable = await newTimeTable.save();
        if (!savedTimeTable) {
            res.status(201).json({
                success: false,
                message: "error in TimeTable Creation",

            })
        }


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
        const { Course, date, Department, TimeSlot, Section } = req.body;
        let teacherNotAvailable = []
        const findtabledata = await timeTable.find({ Course, Department, TimeSlot }).populate('teacher');

        const filterdata = findtabledata.filter(element => {
            const elementDate = new Date(element.date).toISOString().split('T')[0];
            const requestedDate = new Date(date).toISOString().split('T')[0];
            return elementDate === requestedDate

        })


        if (filterdata) {
            filterdata.forEach(element => {

                teacherNotAvailable.push((element.teacher.id).toString())
            });
        }
        console.log(teacherNotAvailable)
        const DeptTeacher = await Mentors.find({ Department: Department })

        const availableTeachers = DeptTeacher.filter(teacher => !teacherNotAvailable.includes((teacher._id).toString()));

        if (availableTeachers.length === 0) {
            return res.status(201).json({
                message: "These are no teacher available right now in this time slot",
                availTeacher: []
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

const findAvailabiltySection = async (req, res) => {
    try {
        const { date, Section, TimeSlot } = req.body;
        const findtabledata = await timeTable.find({ Section, TimeSlot }).populate('teacher', '-password');

        const filterdata = findtabledata.filter(element => {
            const elementDate = new Date(element.date).toISOString().split('T')[0];
            const requestedDate = new Date(date).toISOString().split('T')[0];
            return elementDate === requestedDate

        })


        if (filterdata.length !== 0) {
            return res.status(201).json({
                success: false,
                message: "Plese select another section",

            })
        }
        if (filterdata.length === 0) {
            return res.status(201).json({
                success: true,
                message: "These are the teacher and section  available",

            })
        }

    } catch (error) {

    }
}
const findTimeTableDateWise = async (req, res) => {
    try {

        const studentId = req.user._id;
        const date = req.params.id
        const userdetails = await user.findById(studentId);
        if (!userdetails) {

        }
        let tableData = await timeTable.find({ Section: userdetails.Section }).populate('subject').populate('Section').populate('teacher');

        const filterdata = tableData.filter(element => {
            const elementDate = new Date(element.date).toISOString().split('T')[0];
            const requestedDate = new Date(date).toISOString().split('T')[0];
            return elementDate === requestedDate

        })
        tableData = filterdata
        res.status(201).json({
            message: "These are the subjects available",
            tableData
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findTimeTableDateWiseteacher = async (req, res) => {
    try {

        const teacherId = req.user._id;
        const date = req.params.id

        const tableData = await timeTable.find({ teacher: teacherId }).populate('subject').populate('Section').populate('teacher');

        const filterdata = tableData.filter(element => {
            const elementDate = new Date(element.date).toISOString().split('T')[0];
            const requestedDate = new Date(date).toISOString().split('T')[0];
            return elementDate === requestedDate

        })



        res.status(201).json({
            message: "These are the subjects available",
            filterdata
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const findTimeTable = async (req, res) => {
    try {

        const tableData = await timeTable.find().populate('subject').populate('Section').populate('teacher').populate('Course').populate('Department');

        res.status(201).json({
            message: "These are the subjects available",
            tableData
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = { CreateTimeTable, checkTeacherAvail, findTimeTableDateWise, findTimeTable, findAvailabiltySection, findTimeTableDateWiseteacher }


// const today = new Date();
// const isoString = today.toISOString();
// console.log(isoString);