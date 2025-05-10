"use server"
import { dbContext } from "../firebase/firebaseConfig";
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { sendEmail } from './emailAction';
import { collection, addDoc, query, where, limit, getDocs } from "firebase/firestore";

// creating userAccount
export const createUserAccount = async (formData) => {
    try {
        let createCollection = collection(dbContext, 'UserMaster');

        let userRoleCollection = collection(dbContext, 'UserRoles');

        // getting roleID 
        let getReference = query(userRoleCollection, where('UserRole', '==', formData.userRole), limit(1));

        let getUserRole = await getDocs(getReference);


        if (!getUserRole.empty) {

            const docRef = getUserRole.docs[0];

            let response = await addDoc(createCollection, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                userRole: docRef.id
            })

            return response ? { message: 'Success' } : { message: 'something went wrong !!' };
        }

        else {
            return { message: 'UserRole does not exists' }
        }

    }
    catch (error) {
        return error.message;
    }
}


export const sendEmailToUser = async (toEmail, otpCode) => {
    try {

        const UserMaster = collection(dbContext, 'UserMaster');

        let isEmailExistsQuery = query(UserMaster, where('email', '==', toEmail));

        let isEmailExists = await getDocs(isEmailExistsQuery);

        if (isEmailExists.empty) {
            const templatePath = path.join(process.cwd(), './src/server/EmailTemplates', 'otpTemplate.hbs');
            const source = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = handlebars.compile(source);

            const html = compiledTemplate({ otpCode });

            const subject = 'OTP Verification';

            let response = await sendEmail(toEmail, subject, html);

            return response;
        } else {
            return {message : "Email already exists !!"};
        }
    }
    catch (error) {
        return error.message;
    }

}
