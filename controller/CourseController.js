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
const updateCourse = async (req, res, next) => {
    try {
      const { id } = req.params; 
      const { CourseName, Fee } = req.body;
  
      const course = await Course.findByIdAndUpdate(id, { CourseName, Fee }, { new: true });
  
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to update course",
        error: error.message,
      });
    }
  };
  const getCourseById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const course = await Course.findById(id);
  
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course",
        error: error.message,
      });
    }
  };
  
module.exports={
    CreateCourse,getAllCourse ,updateCourse,getCourseById
} 