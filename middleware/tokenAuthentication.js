const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Mentors = require("../models/Mentors");

//const user = require("../models/user");


exports.isAuthenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token)
        if (!token) {

            return res.status(401).json({
                success: false,
                message: 'authentication failed  ',
            })
        }
        const data = jwt.verify(token
            , "soumyaranjansahu");

        let userdata = await User.findById(data._id);

        if (!userdata) {
            userdata = await Mentors.findById(data._id);
        }

        if (userdata) {
            req.user = userdata;
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        next()
    } catch (error) {

    }

};

exports.isAuthorise = () => {
    return (req, res, next) => {

        if (!(req.user.isTeacher || req.user.isAdmin)) {
            return next(new createError(` is not allowed to access this resouce`, 403))
        }
        next();
    };
};