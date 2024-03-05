const mongoose=require('mongoose');

const CourseSchema= mongoose.Schema({
    CourseName:{
        type:String,
        required:true,
        unique: true,
        default:null
    },
})
module.exports=mongoose.model("Course",CourseSchema);