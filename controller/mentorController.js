//const Mentors = require("../models/Mentors");
const OTP = require("../models/otp");
const bcrypt = require("bcryptjs");
const generateAuthToken = require("../utils/JWTtoken");
const Mentors = require("../models/Mentors");
const User = require("../models/user");

//register
const MentorRegister = async (req, res, next) => {
    try {
        const { email, otp, ...data } = req.body;
        console.log({ email, otp, ...data })

        const user = await Mentors.findOne({ email });
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
        const newUser = new Mentors({
            password: hashedpassword,
            email: email,
            ...data
        });
        await newUser.save();
        console.log(newUser + "new User")
        const token = await generateAuthToken(newUser);
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(201).json({
            success: true,
            user: newUser
            , token,
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message });
    }

}

//login

const MentorLogin = async (req, res, next) => {


    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter both email and password ',
            });
        }
        console.log(email)
        const user = await Mentors.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }

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
//logout
const mentorLogout = async (req, res) => {

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

//Get A specific teacher
const getaMentor = async (req, res, next) => {
    try {
        const user = await Mentors.findById(req.params.id).populate('Course', 'CourseName').populate('Department', 'DepartmentName').select('-password');

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


//Get all teacher

const getAllMentor = async (req, res, next) => {
    try {
        const users = await Mentors.find().select('-password')
        res.status(201).
            json({ success: true, users })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

//update a user
const updateMentor = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const allowedUpdates = ['personalDetails.FirstName', 'personalDetails.LastName', 'personalDetails.MiddleName', 'profilePic', 'email'];
        const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const user = await Mentors.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });

            if (!user) {
                return res.status(404).json({
                    message: "no user found"
                });
            }

            res.status(201).json(user);
        } catch (error) {
            res.status(400).send(error);
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}

//Delete A Mentor

const DeleteAMentor = async (req, res, next) => {

    try {
        const result = await Mentors.deleteOne({ _id: req.params.id });

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

//otp verification
const OTPverification = async (req, res, next) => {

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

        const user = await Mentors.findOne({ email: response[0].email })

        const token = await generateAuthToken(user);

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(200).json({
            success: true,

            message: "login success", token,
        })

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });
    }
}

//update password

const updatePassword = async (req, res) => {

    try {

        const id = req.user._id;

        let user = await Mentors.findById(id);
        if (!user) {
            user = await User.findById(id);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }
      
        const enteredPWD = req.body.currentpassword;

        const enteredNewpwd = req.body.newpassword;

        if (!enteredPWD || !enteredNewpwd) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required',
            });
        }

        if (!await bcrypt.compare(enteredPWD, user.password)) {
            return res.status(401).json({
                success: false,
                message: 'given Password did not match with current password ',
            });
        }
        let hashedpassword = await bcrypt.hash(enteredNewpwd, 10);

        //const newUser = await Mentors.findByIdAndUpdate(id, { password: hashedpassword }, { new: true, runValidators: true });
        user.password=hashedpassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "password updated successfully"
        })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {

        const otp = req.body.otp;

        const response = await OTP.find({ otp: otp }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {

            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });

        }
        let user = await Mentors.findOne({ email: response[0].email })

        if (!user) {

            user = await User.findOne({ email: response[0].email })
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }

        const token = await generateAuthToken(user);

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(200).json({
            success: true,

            message: "reset success", token,
        })


    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }

}
const endresetPassword = async (req, res) => {
   
    try {

        const id = req.user._id;

        let user = await Mentors.findById(id);

        if (!user) {
            user = await User.findById(id);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No User found ',
            });
        }
        console.log(user);
        
        const newPassword = req.body.resetpassword;

        const { password} = user;

        console.log(password);

        let hashedpassword = await bcrypt.hash(newPassword, 10);

       // const newUser = await Mentors.findByIdAndUpdate(id, { password: hashedpassword }, { new: true, runValidators: true });
      //  await newUser.save()

      user.password=hashedpassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "password reset successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message });
    }
}



module.exports = {
    MentorLogin, MentorRegister, getAllMentor, getaMentor, updateMentor, OTPverification, mentorLogout, DeleteAMentor, updatePassword, resetPassword, endresetPassword
}