const examType=require('../models/ExamType')

const createNewExamType =async (req, res) => {
    try {
      
         const newExamType=new examType({
            ExamType:req.body.ExamType
         })
         await newExamType.save()
        
         res.status(201).json({
            newExamType
         })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllExamTypes = async(req,res) => {
    try {
        const allExamTypes=await examType.find();

    if(!allExamTypes){
        res.status(403).json({ error: error.message });
    }

    res.status(201).json({
        allTypes:allExamTypes
    })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
module.exports = { createNewExamType, getAllExamTypes }