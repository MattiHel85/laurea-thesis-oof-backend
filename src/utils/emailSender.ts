import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs/promises';
import { EmailTemplate } from '../types/emailTemplate';
import path from 'path';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        // 'oldoakfarmbury@gmail.com',
        pass: process.env.EMAIL_PASS
        // 'cvqehypmvhglvvgx',

    }
});

export const sendEmail = async (to: string, template: EmailTemplate) => {
    try {
            const emailTemplatePath: string = path.join(__dirname, '../views/emailTemplate.ejs');
            const compiledTemplate = ejs.compile(await fs.readFile(emailTemplatePath, 'utf-8'));
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject: template.subject,
                html: compiledTemplate({template}),
            };

            const result = await transporter.sendMail(mailOptions);
            console.log('Email sent', result);
    } catch (error) {
        console.error('Error sending email', error);
    }
}