const mongoose=require('mongoose');

const NotesSchema= mongoose.Schema({
    URL:{
        type:String, 
        required:true
    },
   Description:{
        type:String,    
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    DepartmentName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required:true,
    },
    type: {
        type: String,
        enum: ['article', 'video'],
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now
      }

})

const Notes=mongoose.model("Notes",NotesSchema);
module.exports = Notes;
