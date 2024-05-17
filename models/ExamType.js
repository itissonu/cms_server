const mongoose=require('mongoose');

const ExamTypeSchema= mongoose.Schema({
    ExamType:{
        type:String,
        required:true,
      
    },
})
module.exports=mongoose.model("ExamType",ExamTypeSchema);