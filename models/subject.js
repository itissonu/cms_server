const mongoose=require('mongoose');

const subjectSchema= mongoose.Schema({
    SubjectCode:{
        type:String,
        required:true,    
        unique: true,
        default:null
    },
    Credits: {
        type: Number,
        required: true,
        default:1
    },
    Semester: {
        type: Number,
      
    },
    subjectName:{
        type:String, 
        required:true, 
    },
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    Course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true,
    }
})
module.exports=mongoose.model("Subject",subjectSchema);