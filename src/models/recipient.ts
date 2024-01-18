import mongoose from "mongoose";
import { Recipient } from "../types/recipient";
import { validateEmail } from "../utils/validator";

const Schema = mongoose.Schema;
const model = mongoose.model;

const recipientSchema = new Schema<Recipient>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Invalid email format'
        }
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
})

module.exports = model<Recipient>('Recipient', recipientSchema);