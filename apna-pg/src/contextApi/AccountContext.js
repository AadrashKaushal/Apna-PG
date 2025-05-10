import { createContext,useState } from "react";

export const AccountContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [otpVerificationStatus,setOtpVerificationStatus] = useState(false);
    

    const [otp,setOtp] = useState();
    return (
        <AccountContext.Provider value={{otpVerificationStatus,setOtpVerificationStatus,otp,setOtp}}>
            {children}
        </AccountContext.Provider>
    );
}