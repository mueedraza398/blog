const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String, default: "" },
}, { _id: false });

const BlogSchema = new mongoose.Schema(
  {
    category: { type: String },
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    date: { type: Date },
    author: { type: AuthorSchema },
    slug: { type: String, unique: true },
    favorite: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    tags: { type: [String], default: [] }, // ✅ updated to array of strings
    readTime: { type: String, default: "3 min read" },
    isFeatured: { type: Boolean, default: false },
    markdownContent: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
