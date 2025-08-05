const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: "" },
}, { _id: false });

const BlogSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, required: true },
    author: { type: AuthorSchema, required: true },
    link: { type: String, default: "#" },
    favorite: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    tags: { type: [String], default: [] }, // ✅ updated to array of strings
    readTime: { type: String, default: "3 min read" },
    isFeatured: { type: Boolean, default: false },
    markdownContent: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
