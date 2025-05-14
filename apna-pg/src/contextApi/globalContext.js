"use client"
import { createContext,useState,useContext } from "react";

export const globalContext = createContext();

export const useGlobal = () => {
    return useContext(globalContext);
}

export const GlobalProvider = ({children})=>{
    const [activeProfile,setProfile] = useState(false);
    return (
        <globalContext.Provider value={{activeProfile , setProfile}}>
            {children}
        </globalContext.Provider>
    );
}