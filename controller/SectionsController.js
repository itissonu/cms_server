const department = require("../models/department");
const section = require("../models/section");

const CreateSection = async (req, res, next) => {

    try {
        const sections =  new section({
            Course: req.params.courceId, DepartmentName: req.params.deptid, SectionName: req.body.SectionName

        })
        const newsection=await sections.save();

        if(!newsection){
            return  res.status(401).json({
                success:false,
                message:"error during creating  section "
            })
        }
        res.status(201).json({
            success:true,
            message:"section created successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "error during creating section "
        })
    }
}
const getAllSection = async (req, res, next) => {
    try {
        const deptId = req.params.id;
        const sections=await section.find({DepartmentName:deptId}).populate({path:'DepartmentName',mode:department,select:'DepartmentName'});
       
        if(!sections){
            return res.status(201).json({
                success:true,
                message:"no section found"
            })
        }
        res.status(201).json({
            section:sections,
            success:true
        });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "error during getting sections "
        })
    }

}

module.exports = { CreateSection, getAllSection }