"use server"
import { dbContext } from "@/firebase/firebaseConfig";
import { addDoc,doc,getDocs,collection, query, where,updateDoc, getDoc } from "firebase/firestore";

export const makeOnboardingRequest = async(data) => {
    try {

        let masterStatus = collection(dbContext,'MasterStatus');

        let statusQuery = query(masterStatus,where('Status','==','Pending'));

        let getStatusID = await getDocs(statusQuery);

        if(!getStatusID.empty) {
            let docs = getStatusID.docs[0];
            let statusID = docs.id;

            let userMasterUserRef = doc(dbContext,`UserMaster/${data.userID}`)

            let response = await updateDoc(userMasterUserRef,{
                firstName : data.fName,
                lastName : data.lName,
                email : data.email,
                profilePhoto : data.profilePhoto,
                idProof : data.idProof,
                propertyProof : data.propertyProof,
                status : statusID,
                city : data.city,
                state : data.state,
                mobile : data.mobile,
                address : data.address,
                pincode : data.pincode,
                landmark : data.landmark ? data.landmark : "",
                alternateMobile : data.alternateMobile ? data.alternateMobile : ""
            })

            return {message : "success"} ;
        } else {
            return {message : "Status does not exists"};
        }

    } catch(err) {
        return {message : err.message};
    } 
}


export const checkStatus = async(userID) => {
    try {

        let docRef = doc(dbContext,'UserMaster',userID);
        let userRecord = await getDoc(docRef);

        if(userRecord.exists()) {
            let statusRef = doc(dbContext,'MasterStatus',userRecord.data().status);
            let status = await getDoc(statusRef);
            
            if(status.exists()) {
                return {message : "success" , result : status.data().Status};
            } else {    
                return {message : "Status does not exists"};
            }
        } else {
            return {message : "no record found"};
        }

    } catch(error) {
        return {message : error.message};
    }
}