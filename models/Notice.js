const mongoose = require('mongoose');

const NoticeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
 
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;
