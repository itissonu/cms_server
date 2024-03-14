const jwt = require("jsonwebtoken");
const user = require("../models/user");


exports.isAuthenticateotp = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {

            return res.status(401).json({
                success: false,
                message: 'authentication failed  ',
            })
        }
        const data = jwt.verify(token
            , "soumyaranjansahu");

        req.user = await user.findById(data._id);
        next()
    } catch (error) {

    }

};