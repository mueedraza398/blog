const Blogs = require("../models/Blogs");
const Newsletter = require("../models/Newsletter");
const User = require("../models/User");


const SingleUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user.id);
    if (!existingUser) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

  

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        profileImage: existingUser.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};


const GetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select('email');

    if (allUsers.length === 0) {
      return res.status(404).json({ msg: 'No users found', success: false });
    }

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: allUsers
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

const GetUsers = async (req, res) => {
  try {
    //except password
    const allUsers = await User.find().select('-password');

    if (allUsers.length === 0) {
      return res.status(404).json({ msg: 'No users found', success: false });
    }

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: allUsers
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

const newsletter = async (req, res) => {
  const { email } = req.body;

  console.log("email.......", email);

  if (!email) {
    return res.status(400).json({ message: 'Please enter all fields', success: false });
  }

  try {
    const existingUser = await Newsletter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already subscribed', success: false });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    return res.status(201).json({ message: "Subscribed successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server Error", success: false });
  }
};

const getNewsletter = async (req, res) => {
  try {
    const newsletterList = await Newsletter.find();
    return res.status(200).json({ newsletterList, success: true, message: "Newsletter fetched successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



// Create a new blog post
const createBlog = async (req, res) => {
  try {
    // Fix potential double-quoted tags
    const formattedTags = req.body.tags?.map(tag =>
      typeof tag === 'string' ? tag.replace(/^"|"$/g, '') : tag
    );


    const blogData = {
      ...req.body,
      tags: formattedTags,
    };

    const blog = new Blogs(blogData);
    const savedBlog = await blog.save();

    console.log("savedBlog", savedBlog);
    res.status(201).json({
      success: true,
      data: savedBlog,
      message: "Blog created successfully",
    });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs, message: "Blogs fetched successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog, message: "Blog fetched successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: updatedBlog, message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllBlogData = async (req, res) => {
  let findAllBlog = await Blogs.find();
  if (!findAllBlog || findAllBlog.length === 0) {
    return res.status(404).json({ success: false, message: 'No blog data found' });
  }
  return res.status(200).json({ data: findAllBlog, success: true, message: "All blog data fetched successfully" });
}


module.exports = { SingleUser, GetAllUsers, getAllBlogData, GetUsers, newsletter, getNewsletter, createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };