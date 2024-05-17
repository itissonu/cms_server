const mongoose=require('mongoose');

const ExamSubjectSchema= mongoose.Schema({
    DepartmentName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required:true,
    },
    examCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamType",
        required:true,
    },
    Course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true,
    },
    semester:{
        type:String,
        default:"1",
        required:true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    fullmark:{
        type:Number,
        default:100,
        required:true
    }

})
module.exports=mongoose.model("ExamSubject",ExamSubjectSchema);