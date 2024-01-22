import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '../types/emailTemplate';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'oldoakfarmbury@gmail.com',
        pass: 'cvqehypmvhglvvgx',
    }
});

export const sendEmail = async (to: string, template: EmailTemplate) => {
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: template.subject,
            html: `<p>${template.content}</p>`
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent', result);
    } catch (error) {
        console.error('Error sending email', error);
    }
}