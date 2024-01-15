import mongoose from "mongoose";
import { EmailTemplate } from "../types/emailTemplate";

const Schema = mongoose.Schema;
const model = mongoose.model;

const EmailTemplateSchema = new Schema<EmailTemplate>({
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        default: Date.now() + 24 * 60 * 60 * 1000,
        index: {expires: '1d'},
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                required: true,
            }
        }
    ]
});


module.exports = model<EmailTemplate>('EmailTemplate', EmailTemplateSchema);