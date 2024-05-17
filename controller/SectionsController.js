const department = require("../models/department");
const section = require("../models/section");

const CreateSection = async (req, res, next) => {
    const { SectionName, Course, DepartmentName } = req.body
    console.log(req.body)
    if (!SectionName || !Course || !DepartmentName) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields for section creation.',
        });
    }


    try {
        const sections = new section(req.body)
        const newsection = await sections.save();

        if (!newsection) {
            return res.status(401).json({
                success: false,
                message: "error during creating  section "
            })
        }
        res.status(201).json({
            success: true,
            message: "section created successfully"
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
        const sections = await section.find({ DepartmentName: deptId }).populate({ path: 'DepartmentName', mode: department, select: 'DepartmentName' });

        if (!sections) {
            return res.status(201).json({
                success: true,
                message: "no section found"
            })
        }
        res.status(201).json({
            section: sections,
            success: true
        });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: "error during getting sections "
        })
    }

}
const getAllSections = async (req, res) => {
    try {
        const sections = await section.find().populate({ path: 'DepartmentName', mode: department, select: 'DepartmentName' });
        res.status(201).json({
            section: sections,
            success: true
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "error during getting sections "
        })
    }

}

const updateSection = async (req, res) => {
    const { id } = req.params;
    const { SectionName, Course, DepartmentName } = req.body;

    try {
        const updatedSection = await section.findByIdAndUpdate(
            id,
            { SectionName, Course, DepartmentName },
            { new: true }
        )

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: 'Section not found or unable to update.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Section updated successfully.',
            section: updatedSection,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating section.',
            error: error.message,
        });
    }
};

module.exports = { CreateSection, getAllSection, getAllSections, updateSection }