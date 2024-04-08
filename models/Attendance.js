const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    Section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
  
    Students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentors",   
    },
    semester:{
        type:Number
    }

})
module.exports = mongoose.model("Attendance", AttendanceSchema);