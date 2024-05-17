const OTP = require("../models/otp");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const generateAuthToken = require("../utils/JWTtoken");
const Mentors = require("../models/Mentors");

const userRegister = async (req, res, next) => {
    try {
        const { email, otp, ...data } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        let hashedpassword = await bcrypt.hash(email, 10);
        const newUser = new User({
            password: hashedpassword,
            email: email,
            ...data
        });
        await newUser.save();

        // console.log(newUser + "new User")

        const token = await generateAuthToken(newUser);

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(201).json({
            success: true,
            message:"Registration done",
            user: newUser
            , token,
        });

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });
    }

}

//login 
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter both email and password ',
            });
        }
        console.log(email)
        // const user = await User.findOne({ email: email });
        let user = await Mentors.findOne({ email: email });
        if (!user) {
            user = await User.findOne({ email: email });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }
        console.log(password)
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: 'Password did not match ',
            });
        }
        req.userdata = user;
        next();

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

//otp verification

const OTPverificationUser = async (req, res, next) => {
    try {
        const otp = req.body.otp;
        //console.log(otp)
        const response = await OTP.find({ otp: otp }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {

            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });

        }
      
      
        let user = await User.findOne({ email: response[0].email }).select('-password')
        if (!user) {
            user = await Mentors.findOne({ email: response[0].email }).select('-password');
        }
        
        const token = await generateAuthToken(user);
      
        res.cookie("token", token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(200).json({
            success: true,
            message: "login success", token,user
        })

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });
    }
}

// get a singleuser
const getaUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('Course', 'CourseName').populate('Department', 'DepartmentName').populate('Section', 'SectionName').select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}
const getaUserByRegdNo = async (req, res, next) => {
    try {
        const RegdNo = req.body.RegdNo;
        const user = await User.findOne(RegdNo).populate('Course', 'CourseName').populate('Department', 'DepartmentName').populate('Section', 'SectionName').select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}

//logout 

const Logout = async (req, res) => {

    try {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        res.status(200).json({
            success: true,
            message: "logged out",
        })

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });

    }
}

const getAlluser = async (req, res, next) => {

    let query={}
    if (req.query.Course) {
        query.Course = req.query.Course;
    }
    if (req.query.Department) {
        query.Department = req.query.Department;
    }
    if (req.query.Section) {
        query.Section = req.query.Section;
    }
    try {
        const users = await User.find().select('-password')
        res.status(201).
            json({ success: true, users })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}


const DeleteAUser = async (req, res, next) => {

    try {
        const result = await User.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(500).json({ success: false, error: error.message });
        }

        res.status(201).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}

const updateUser = async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }

        const enteredPWD = req.body.currentpassword;

        const enteredNewpwd = req.body.newpassword;

        if (!await bcrypt.compare(enteredPWD, user.password)) {
            return res.status(401).json({
                success: false,
                message: 'given Password did not match with current password ',
            });
        }
        let hashedpassword = await bcrypt.hash(enteredNewpwd, 10);

        const newUser = await Mentors.findByIdAndUpdate(id, { password: hashedpassword }, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            message: "password updated successfully"
        })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}
const getuserBySectionsAndall = async (req, res) => {
    try {
        let query = {};
        if (req.query.Department) {
            query.Department = req.query.Department;
        }
        if (req.query.Course) {
            query.Course = req.query.Course;
        }
        if (req.query.Section) {
            query.Section = req.query.Section;
        }
        const allstudents = await User.find(query).populate("Department").populate("Section").select(" RegdNo personalDetails  Department rollno profilePic Section _id ")

        if (!allstudents.length === 0) {
            return res.status(400).json({
                success: false,
                message: "no user found",
                alluser: []

            })
        }
       
        res.status(201).json({
            success: true,
            alluser: allstudents
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}
module.exports = {
    userLogin, userRegister, getAlluser, getaUser, updateUser, OTPverificationUser, Logout, DeleteAUser, getaUserByRegdNo, getuserBySectionsAndall
}