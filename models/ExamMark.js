const mongoose=require('mongoose');

const examMarkSchema= mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      securedMark:{
        type:Number,
        required:true,
        default:0
      },
      examSubject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamSubject",
        required: true,
      },
      semester:{
        type:Number,
        default:1
      }

})
const ExamMark=mongoose.model("ExamMark",examMarkSchema);
module.exports=ExamMark