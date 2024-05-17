const express=require('express');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getBlogsByAuthorId } = require('../controller/BlogController');
const { isAuthenticate } = require('../middleware/tokenAuthentication');
const router=express.Router()

router.post('/blogs',isAuthenticate, createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id',isAuthenticate, updateBlog);
router.delete('/blogs/:id', isAuthenticate,deleteBlog);
router.get('/blogs/author/:authorId', getBlogsByAuthorId);

module.exports=router;