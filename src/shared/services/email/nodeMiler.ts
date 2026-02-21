import nodemailer from 'nodemailer';
import { sendEmail } from "./bravo.email";

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'communicationsyawa@gmail.com', // Replace with your Gmail email address
    pass: 'rtluplkizldbqwdr', // Replace with your Gmail password
  },
});


// Function to create the email template with inline CSS and simple animations
function createEmailTemplate(subject: string, body: string): string {
  const logoUrl =
    'https://res.cloudinary.com/df2jfb5zp/image/upload/v1746915251/my_app_images/dixs3vro5e0coummadr5.jpg'; // Replace with your actual logo URL
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        animation: fadeIn 2s ease-in;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header img {
        width: 100%;
        border-radius: 8px 8px 0 0;
        height: 200px;
        object-fit: contain;
      }
      .content {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.9em;
        color: #888888;
      }
      .highlight {
        color: #000080;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #03BDE9;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="${logoUrl}" alt="Confluenxe Logo">
      </div>
      <div class="content">
        ${body}
      </div>
      <div class="footer">
        Best regards,<br>
        <span class="highlight">Confluenxe Team</span>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Email content templates
const emailTemplates = {
  verification: (code: number) =>
    createEmailTemplate(
      'Your OTP Code for Confluex Registration',
      `<p>Hello,</p>
    <p>To complete your registration on the Confluenxe App, please use the One-Time Password (OTP) below:</p>
    <h2 class="highlight">${code}</h2>
    <p>This code is valid for the next 15 minutes. Please do not share it with anyone for your security.</p>
    <p>If you didn’t request this code, please ignore this email or contact our support team immediately at support@confluex.com.ng or 07013580030.</p>
    <p>Thank you for choosing Confluenxe to stay safe!</p>
    `,
    ),
  forgotPassword: (otp: number) =>
    createEmailTemplate(
      'ForgotPassword Code for Confluenxe APP',
      `<p>Hello there,</p>
    <p>We've sent you a forgotPassword code to complete your reset your password. Please enter the code below to proceed:</p>
    <h2 class="highlight">OTP: ${otp}</h2>
    <p>This code is valid for 15 minutes. If you didn't request this code, please ignore this email.</p>`,
    ),
  welcome: () =>
    createEmailTemplate(
      'Welcome to Confluenxe: Your Safety, Our Priority!',
      `<p>Hello</p>
      <p>Welcome to Confluenxe, your trusted partner for early warning, situational awareness, and emergency reporting. We’re thrilled to have you join our growing community dedicated to making Nigeria safer for everyone</p>
      <p>With Confluenxe, you can:</p>
      <ul>
      <li>Report emergencies and get real-time assistance.</li>
      <li>Stay updated on critical safety alerts in your area.</li>
      <li>Connect with your safety circle for instant support.</li>
      </ul>
      <b>Get started now by exploring the app and setting up your safety circle.</b>
      <p>Together, we can create safer communities! If you have any questions or need assistance, feel free to contact us at <a href="mailto:upport@yawaapp.com.ng">support@yawaapp.com.ng</a> or 07013580030.</p>
      <p>
      Staysafe,<br>
      The Confluenxe Team
      </p>
      `,
    ),

    
};

// Functions to send emails with the new templates
async function sendVerificationEmail(
  email: string,
  emailVerificationCode: number,
): Promise<void> {
  try {
    const html = emailTemplates.verification(emailVerificationCode);
    // await transporter.sendMail({
    //   from: '"Confluex TEAM" <info@Confluex.com>',
    //   to: email,
    //   subject: 'Your OTP Code for Confluex Registration',
    //   html,
    // });
    sendEmail(email, "Your OTP Code for Confluenxe Registration", html)
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

export async function sendForgotPasswordEmail(
  email: string,
  resetPasswordToken: number,
): Promise<void> {
  try {
    // Send mail with defined transport object
    const html = emailTemplates.forgotPassword(resetPasswordToken);
    // await transporter.sendMail({
    //   from: '"Confluex TEAM" <info@Confluex.com>', // Replace with your app name and your Gmail email address
    //   to: email,
    //   subject: 'Forgot Password Verification Code',
    //   html,
    // });

    sendEmail(email, "Forgot Password Verification Code", html)
    
    console.log('Forgot password email sent successfully');
  } catch (error) {
    console.error('Error sending forgot password email:', error);
  }
}

async function sendWelcomeEmail(email: string): Promise<void> {
  try {
    const html = emailTemplates.welcome();
    await transporter.sendMail({
      from: '"Confluenxe TEAM" <info@Confluex.com>',
      to: email,
      subject: 'Welcome to Confluenxe: Your Safety, Our Priority!',
      html,
    });
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}





export {
  sendVerificationEmail,
  sendWelcomeEmail,

};
