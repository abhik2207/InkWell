import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    author: { type: String }
}, { timestamps: true });

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default BlogModel;
