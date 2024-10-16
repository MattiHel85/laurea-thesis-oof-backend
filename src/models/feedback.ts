import mongoose, { Document } from "mongoose";
import { Feedback } from "../types/feedback"; 
import { validateEmail } from "../utils/validator";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const FeedbackSchema = new Schema<Feedback & Document>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            message: 'Invalid email format'
        }
    },
    message: {
        type: String,
        required: true
    },
    wantsReply: {
        type: Boolean,
        required: true
    }
});

module.exports = model<Feedback & Document>('Feedback', FeedbackSchema);
