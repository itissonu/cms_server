const express = require('express');
const { sendOTP } = require('../controller/otpgenerator');

const router = express.Router();

router.post('/send-otp', sendOTP);

module.exports = router;