
const jwt = require("jsonwebtoken");

const generateAuthToken =async (user)=>{
    try {
        
        const secretKey = process.env.JWT_SECRET || 'soumyaranjansahu';

        const token = await jwt.sign(
            {
                _id: user._id,
                email: user.email,
               
            },
            secretKey,
            { expiresIn: '7d' }
        );
            
        return token;
    } catch (error) {
       
        console.error("Error generating JWT:", error);
        throw new Error("Error generating JWT");
    }
}
module.exports = generateAuthToken;