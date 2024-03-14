//const Mentors = require("../models/Mentors");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const generateAuthToken = require("../utils/JWTtoken");
const Mentors = require("../models/Mentors");

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

module.exports = {
    MentorLogin, MentorRegister, getAllMentor, getaMentor, updateMentor, OTPverification, mentorLogout, DeleteAMentor
}