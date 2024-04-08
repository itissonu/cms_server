const otpGenerator = require('otp-generator');
const OTP = require("../models/otp");
const User = require('../models/user');
const Mentors = require('../models/Mentors');

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await Mentors.findOne({email:email}) || User.findOne({ email:email });
    
    console.log(checkUserPresent)

    // if (checkUserPresent) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'User is already registered',
    //   });
    // }
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }

};

exports.sendOTPLogin = async (req,res)=>{
  try{
    console.log(req.userdata.email)

  const { email } = req.userdata;
  
  const checkUserPresent = await Mentors.findOne({email:email}) || User.findOne({ email:email });
  
  console.log(checkUserPresent)
 
  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let result = await OTP.findOne({ otp: otp });

  while (result) {
    otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
    });
    result = await OTP.findOne({ otp: otp });
  }

  const otpPayload = { email, otp };

  const otpBody = await OTP.create(otpPayload);

  res.status(200).json({
    success: true,
    message: 'OTP sent successfully',
    otp,
  });
} catch (error) {
 
  console.log(error.message);
  return res.status(500).json({ success: false, error: error.message });

}

}



