const Attendance = require("../models/Attendance");
const user = require("../models/user");
const Subject = require("../models/subject");

//take and update attendance
const TakeAttendace = async (req, res) => {

    try {
        const teacherId = req.user._id;

        const { time, Section, date, subject, ...data } = req.body;

        const alldata = { teacher: teacherId, date, Section, subject, time, ...data }

        const findatndc = await Attendance.findOne({
            date,
            time,
            Section,
            subject,
            teacher: teacherId, teacher: teacherId
        });
        const dateObject = new Date(date);

        const formattedDate = dateObject.toString();

        if (findatndc && findatndc.date.toString() === formattedDate.toString()) {
            const updatedAttendance = await Attendance.findOneAndUpdate(
                {
                    time: time,
                    Section: Section,
                    subject: subject,
                    teacher: teacherId,
                },
                alldata,
                { new: true }
            );
            if (!updatedAttendance) {
                throw new Error("Failed to update attendance record");
            }
            return res.status(201).json({
                success: true,
                message: "Attendance record updated successfully",
                attendance: updatedAttendance,
            })
        }
        const newAtndace = await new Attendance(alldata);

        const savedattendance = await newAtndace.save();

        res.status(201).json({
            success: true,
            message: "Attendace given successfully",
            attendance: savedattendance,
        })

    } catch (error) {
        console.error("Error taking attendance:", error);
        res.status(500).json({ error: error.message });
    }

}
//find attendance of a single student sem wise
const findallattendance = async (req, res) => {
    try {
        let query={}

        if (req.query._id) {
            query._id = req.query._id;
            
        }
        if (req.query.RegdNo) {
            query.RegdNo = req.query.RegdNo;
        }
      
        const studentdetails = await user.findOne(query);
        if(!studentdetails){
            return res.status(400).json("No user found")
        }

        const respSubjects = await Subject.find({ Department: studentdetails.Department, Semester: 1 }).select("subjectName");

        const att = await Attendance.find({ Department: studentdetails.Department }).populate("subject");

        let attendanceBySubject = {};

        respSubjects.forEach(subject => {
            const { subjectName, _id } = subject;
            attendanceBySubject[subjectName] = {
                subjectId:subjectName,
                present: 0,
                absent: 0,         
                presentDate: [],
                absentDate: []
            };
        });
      
        att.forEach(attendance => {
            const subjectName = attendance.subject.subjectName;
            
            if (attendance.Students.includes(studentdetails._id)) {
                let attendanceRecord = {
                    date: attendance.date,
                    time: attendance.time,
                };
                attendanceBySubject[subjectName].present++;
                attendanceBySubject[subjectName].presentDate.push(attendanceRecord)
            } else {
                let attendanceRecord = {
                    date: attendance.date,
                    time: attendance.time,
                };
                attendanceBySubject[subjectName].absent++;
                attendanceBySubject[subjectName].absentDate.push(attendanceRecord)
            }
        });

        res.status(201).json({ attendanceBySubject ,Student:studentdetails.personalDetails.FirstName});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//find attendance of all student irrespective of cource and batch

const AllStudentAttendance = async (req, res) => {
    try {
        let query = {};
        if (req.query.Department) {
            query.Department = req.query.Department;
        }
        if (req.query.Course) {
            query.Course = req.query.Course;
        }
        if (req.query.Section) {
            query.Section = req.query.Section;
        }
        if (req.query.subject) {
            query.subject = req.query.subject;
        }
        console.log(query)
        const allstudents = await user.find(query).populate("Department").populate("Section").select(" RegdNo personalDetails  Department rollno  Section _id")

        const attendances = await Attendance.find(query)
    
        let attendanceOfStudents = {};

        allstudents.forEach(stud => {

            attendanceOfStudents[stud._id] = {
                stud,
                present: 0,

            };
        });

        attendances.forEach((attendance) => {
            allstudents.forEach(student => {
                if (attendance.Students.includes(student._id)) {
                    attendanceOfStudents[student._id].present++;
                }
            })

        })

        res.status(201).json(attendanceOfStudents)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//find attendances by course of allstudents

const TotalAttendances =async(req,res)=>{
    try {
       let query={};
       if (req.query.Department) {
        query.Department = req.query.Department;
    }
    if (req.query.Course) {
        query.Course = req.query.Course;
    }
    if (req.query.Section) {
        query.Section = req.query.Section;
    }
    if (req.query.subject) {
        query.subject = req.query.subject;
    }
    const attendances = await Attendance.find(query)

    res.status(201).json({
       ToatalAttendances:attendances.length
    })
   
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

module.exports = { TakeAttendace, findallattendance, TotalAttendances ,AllStudentAttendance}