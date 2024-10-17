import mongoose from "mongoose";
import { BlogPost } from "../types/blog";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const BlogPostSchema = new Schema<BlogPost>({
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

export const BlogModel = model<BlogPost>('BlogPost', BlogPostSchema);