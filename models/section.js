const mongoose=require('mongoose');

const SectionSchema= mongoose.Schema({
    SectionName:{
        type:String,    
       
        default:null
    },
    Course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true,
    },
    DepartmentName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required:true,
    }

})
module.exports=mongoose.model("Section",SectionSchema);