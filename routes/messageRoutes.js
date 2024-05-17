const express = require('express');

const Message = require('../models/Message');
const { isAuthenticate } = require('../middleware/tokenAuthentication');

const router = express.Router()


router.get('/messages/:userId', isAuthenticate, async (req, res) => {
    const { userId } = req.params;
    const userData = req.user
    console.log(userData + "kkkk")
    console.log(userId + "jjjjjj")

    const ourUserId = userData._id;
    const messages = await Message.find({
        sender: { $in: [userId, ourUserId] },
        recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });
    res.json(messages);
})
module.exports = router;