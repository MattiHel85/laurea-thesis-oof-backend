import { Recipient } from "./recipient";

export interface MailingList {
    name: string;
    recipients?: Recipient[];
}