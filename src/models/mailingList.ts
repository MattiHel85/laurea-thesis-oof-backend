import mongoose from "mongoose";
import { RecipientSchema } from "./recipient";
import { MailingList } from "../types/mailingList";
const Schema = mongoose.Schema;
const model = mongoose.model;

const MailingListSchema = new Schema<MailingList>({
    name: {
        type: String,
        required: true,
    },
    recipients: {
        type: [RecipientSchema],
        default: []
    }
})

module.exports = model<MailingList>('MailingList', MailingListSchema);