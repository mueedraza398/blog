const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { SingleUser, GetAllUsers, GetUsers, newsletter, getNewsletter, createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getAllBlogData } = require('../controllers/getUser');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/register',upload.single('profileImage'), register);
router.post('/login', login);
router.get('/get-user', verifyToken, SingleUser);
router.get('/get-all-users', GetAllUsers);
router.get('/get-users-for-admin',verifyToken, GetUsers);
router.post('/newsletter-email',verifyToken, newsletter);
router.get('/get-newsletter-email',verifyToken, getNewsletter);


//blogs routes

router.post('/create/blogs', createBlog);
router.get('/user/blogs', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('update-blog/:id', updateBlog);
router.delete('delete-blog/:id', deleteBlog);
router.get('/mydata', getAllBlogData);


module.exports = router;
