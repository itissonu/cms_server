const mongoose=require('mongoose');

const CourseSchema= mongoose.Schema({
    CourseName:{
        type:String,
        required:true,
        unique: true,
        default:null
    },
    Fee:{
        type:Number
    }
})
module.exports=mongoose.model("Course",CourseSchema);