const OTP = require("../models/otp");
const bcrypt = require("bcryptjs");
const generateAuthToken = require("../utils/JWTtoken");
const Mentors = require("../models/Mentors");
const User = require("../models/user");

const resetPasswordmiddle = async (req, res) => {
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
        req.userdata=user;
        next();

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports={resetPasswordmiddle}

