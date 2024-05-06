const mongoose = require('mongoose');

const TimeTableSchema = mongoose.Schema({
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
    TimeSlot: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
  
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentors",   
        required: true
    }

})
module.exports = mongoose.model("TimeTable", TimeTableSchema);
