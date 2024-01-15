import { EmailTemplate } from "./emailTemplate";
import { Recipient } from "./recipient";

export interface MailingList {
    name: string;
    recipients: Recipient[];
    emailTemplate: EmailTemplate[];
}