import mongoose, { Document } from "mongoose";
import { FeedbackResponse } from "../types/feedbackResponse"; 
import { validateEmail } from "../utils/validator";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const FeedbackResponseSchema = new Schema<FeedbackResponse & Document>({
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
    feedbackId: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = model<FeedbackResponse & Document>('FeedbackResponse', FeedbackResponseSchema);
