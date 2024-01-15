import mongoose from "mongoose";
import { Recipient } from "../types/recipient";
const Schema = mongoose.Schema;
const model = mongoose.model;

const recipientSchema = new Schema<Recipient>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    }
})

module.exports = model<Recipient>('Recipient', recipientSchema);