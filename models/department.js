const mongoose=require('mongoose');

const DepartmentSchema= mongoose.Schema({
    DepartmentName:{
        type:String,
        
        unique: true,
        default:null
    },
    Course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true,
    }
})
module.exports=mongoose.model("Department",DepartmentSchema);