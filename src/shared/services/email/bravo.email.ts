// const SibApiV3Sdk = require('sib-api-v3-sdk')
// import dotenv from 'dotenv';

// dotenv.config();

// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.BREVO_API_KEY as string;

// export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
//   const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//   const sendSmtpEmail = {
//     to: [{ email: to }],
//     // sender: { email: 'communicationsyawa@gmail.com', name: 'Yawa' },
//     sender: { email: 'confluenxe@gmail.com', name: 'confluenxe' },
//     // sender: { email: 'akinyemisaheedwale@gmail.com', name: 'wale' },
//     subject: subject,
//     htmlContent: htmlContent,
//   };

//   try {
//     const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
//     return response;
//   } catch (error) {
//     console.error('Brevo Email Error:', error);
//     throw error;
//   }
// };


import nodemailer from "nodemailer";
export const sendEmail = async (to: string, subject: string, html: string) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
            user: process.env.BREVO_LOGIN, 
            pass: process.env.BREVO_SMTP_KEY,
            },
        });

        await transporter.sendMail({
            from: `"Voterax" <voterax1@gmail.com>`,
            to,
            subject,
            html,
        });
        
    } catch (error) {
        console.error("Bravo Email Error:", error);
        throw new Error("Failed to send email");
    }
  
};