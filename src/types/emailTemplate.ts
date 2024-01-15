import { Image } from "./image";

export interface EmailTemplate {
    subject: string;
    content: string;
    expires: Date;
    images: Image[];
}