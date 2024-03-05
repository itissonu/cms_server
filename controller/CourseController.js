const Course = require("../models/course");


const CreateCourse = async(req,res,next)=>{
        try {
            const CourseName=req.body;
    
            const newSection= new Course(CourseName) 
            await newSection.save();

            res.status(201).json({
                success:true,
                message:"Created Successfully"
            })

        } catch (error) {
            console.log(error)
            res.status(401).json({
                success:false,
                message:"failed to create Sections"
            })
        }


}

const getAllCourse = async(req,res,next)=>{

try {
    const allCourses= await Course.find();
    if(allCourses.length===0){
        return  res.status(201).json({
            success:true,
            message:"No Course found"
        })
    }
    if(!allCourses){
        return  res.status(401).json({
            success:false,
            message:"error during fetching Course "
        })
    }
    res.status(201).json({
        success:true,
        courses:allCourses
    })
    
} catch (error) {
    console.log(error)
    res.status(401).json({
        success:false,
        message:"failed to get Sections"
    })
}

}
module.exports={
    CreateCourse,getAllCourse 
} 