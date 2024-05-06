const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    CoverPhoto: {
        type: String,

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    tags: [String],

    isPublished: {
        type: Boolean,
        default: false
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
