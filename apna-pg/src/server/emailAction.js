"use server"
import nodemailer from 'nodemailer';

export const sendEmail = async(toEMail,subject,htmlTemplate) => {
    try {
      
        const transporter = nodemailer.createTransport({
            host: process.env.SMTPHOST,
            port: process.env.SMTPPORT,
            secure: true, 
            auth: {
              user: process.env.USEREMAIL,
              pass: process.env.SMTPUSERPASSWORD,
            },
          });
          
          const mailOptions = {
            from: process.env.USEREMAIL,
            to: toEMail,
            subject: subject,
            html: htmlTemplate, 
          }

          const info = await transporter.sendMail(mailOptions);

          return info ? 'success' : 'error';
    } catch(e) {
        console.log("error message",e.message)
    }
}