import mongoose from "mongoose";
import { EmailTemplate } from "../types/emailTemplate";
import { validateImageUrl } from "../utils/validator";

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
    images: [
        {
            url: {
                type: String,
                required: true,
                validate: {
                    validator: validateImageUrl,
                    message: 'invalid file type'
                }
            },
            alt: {
                type: String,
                required: true,
            }
        }
    ]
});


module.exports = model<EmailTemplate>('EmailTemplate', EmailTemplateSchema);