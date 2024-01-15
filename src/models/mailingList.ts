import mongoose from "mongoose";
import { MailingList } from "../types/mailingList";
import { Recipient } from "../types/recipient";
const Schema = mongoose.Schema;
const model = mongoose.model;

const MailingListSchema = new Schema<MailingList>({
    name: {
        type: String,
        required: true,
    },
    recipients: [{type: Schema.Types.ObjectId, ref: 'Recipient'}],
    emailTemplate: [{type: Schema.Types.ObjectId, ref: 'EmailTemplate'}]
})

module.exports = model<MailingList>('MailingList', MailingListSchema);