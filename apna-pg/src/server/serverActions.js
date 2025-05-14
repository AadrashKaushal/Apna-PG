"use server"
import { dbContext } from "../firebase/firebaseConfig";
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { sendEmail } from './emailAction';
import { collection, addDoc, query, where, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { generateToken, verifyToken } from "./Authentication";

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
        return { message: error.message };
    }
}

// send OTP Email to user
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

            return { message: response };
        } else {
            return { message: "Email already exists !!" };
        }
    }
    catch (error) {
        return { message: error.message };
    }

}

// login user account 
export const loginUserAccount = async (loginData) => {
    try {

        let userMaster = collection(dbContext, 'UserMaster');

        let login = query(userMaster,
            where('email', '==', loginData.email)
            , where('password', '==', loginData.password));

        let loginRecord = await getDocs(login);
        if (!loginRecord.empty) {
            let userRecord = loginRecord.docs[0];
            let userInfo = {
                id: userRecord.id,
                email: userRecord.data().email
            }

            let token = generateToken(userInfo);

            return { message: 'success', token: token }
        } else {
            return { message: "Invalid email or password !!" };
        }

    } catch (error) {
        return { message: error.message };
    }
}


// check token is valid

export const isValidToken = async (token) => {
    try {

        let response = verifyToken(token);

        if (response.message == 'success') {

            let userMaster = collection(dbContext, 'UserMaster');

            let isUserExists = query(userMaster, where('email', '==', response.result.email));

            let isRecordExists = await getDocs(isUserExists);

            if (!isRecordExists.empty) {
                let docs = isRecordExists.docs[0];

                let userrole = doc(dbContext, `UserRoles/${docs.data().userRole}`)

                let getUserRole = await getDoc(userrole);

                if (getUserRole.exists()) {

                    let userInfo = {
                        id: docs.id,
                        data: docs.data(),
                        userRole: getUserRole.data().UserRole
                    }
                    return { message: "success", result: userInfo };

                } else {

                    return { message: "Userrole does not exists" };

                }

            } else {

                return { message: "user does not exists" };

            }

        } else {
            return { message: 'invalid token' };
        }

    } catch (error) {
        return { message: error.message }
    }
}



export const isOnboardingRequest = async(userID) => {
    try {

        let userMasterRef = doc(dbContext,'UserMaster',userID);

        let data = await getDoc(userMasterRef);

        if(data.exists()) {
            let status = data.data().status;
            if(status) {
                return {message : "Already requested"}
            } else {
                return {message : "success"}
            }
        } else {
            return {message : "record does not exists"}
        }
        
    } catch(error) {
        return {message : error.message};
    }
}
