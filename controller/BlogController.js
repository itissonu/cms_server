const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, Summary, content, CoverPhoto, category, tags, isPublished } = req.body;
        const newBlog = new Blog({ title, Summary, content, CoverPhoto, author: userId, category, tags, isPublished });
        const savedBlog = await newBlog.save();
        res.status(201).json({
            savedBlog, success: true,
            message: "Blog Created"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateBlog = async (req, res) => {
    try {
       
        const userId = req.user._id;
        const { id } = req.params;
        const { title, Summary, content, CoverPhoto, category, tags, isPublished } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, Summary, content, author: userId, CoverPhoto, category, tags, isPublished }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({updatedBlog,message:"Updated Successfully",success:true});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('author').select('-password');;
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author').select('-password');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getBlogsByAuthorId = async (req, res) => {
    try {
        const { authorId } = req.params;
        const blogs = await Blog.find({ author: authorId }).populate('author').select('-password');

        if (!blogs) {
            return res.status(404).json({ message: 'Blog not found', blogs: [] });
        }
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { createBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog, getBlogsByAuthorId }
