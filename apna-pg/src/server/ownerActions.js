"use server"
import { dbContext } from "@/firebase/firebaseConfig"
import { collection, addDoc, query, where, limit, getDocs, doc, getDoc, orderBy, updateDoc } from "firebase/firestore";

export const getAllLandlordRequest = async () => {
    try {

        let userMaster = collection(dbContext, 'UserMaster');

        let getQuery = query(userMaster, where('status', '!=', null));

        let getAllLandlordRecords = await getDocs(getQuery);

        if (!getAllLandlordRecords.empty) {

            let records = await Promise.all(
                getAllLandlordRecords.docs.map(async (item) => {
                    const statusRef = doc(dbContext, 'MasterStatus', item.data().status);
                    const getStatus = await getDoc(statusRef);

                    if (getStatus.exists()) {
                        return {
                            id: item.id,
                            data: item.data(),
                            status: getStatus.data().Status,
                        };
                    } else {
                        console.warn(`Invalid status for document ID: ${item.id}`);
                    }
                })
            );
            return { message: 'success', result: records };

        } else {
            return { message: "no record found !!" };
        }

    } catch (error) {
        return { message: error.message };
    }
}


export const statusChangelandLordRequest = async(userID,status) => {
    try {
        
        let userRecord = doc(dbContext,'UserMaster',userID);
        let getRecord = await getDoc(userRecord);

        if(getRecord.exists()) {
            let masterStatus = collection(dbContext,'MasterStatus');
            let getStatus = query(masterStatus,where('Status','==',status));
            let getStatusRecord = await getDocs(getStatus);

            if(!getStatusRecord.empty) {
                let docs = getStatusRecord.docs[0];

                await updateDoc(userRecord,{
                    status : docs.id
                })

                return { message : "success" };
            } else {
                return {message : "status exists"};
            }
        } else {
            return {message : "user does not exists"};
        }

    } catch(error) {
        return {message : error.message};
    }
}