import mongoose from "mongoose";
import { Blog } from "../types/blog";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

export const BlogSchema = new Schema<Blog>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posts: {
        type: [BlogPostSchema],
        required: true
    }
});

module.exports = model<Blog>('Blog', BlogSchema);