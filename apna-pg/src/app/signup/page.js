"use client"
// import TenantSignupForm from "@/component/TenantSignupForm";
import SignUpForm from "@/component/SignUpForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthContextProvider } from "@/contextApi/AccountContext";

export default function SignupPage() {

  const [role,setRole] = useState('Tenant');
  const [style,setStyle] = useState({
    Tenantstyle : "bg-orange-600 hover:bg-orange-700",
    LandLordstyle : "bg-white hover:bg-white text-orange-600"
  });

  // onClick function for Tenant
  const changeStyle = (role) => {
   if(role == 'Tenant') {
    setRole(role);
    setStyle((item) => {
      return {
        ...item,
        Tenantstyle : "bg-orange-600 hover:bg-orange-700",
        LandLordstyle : "bg-white hover:bg-white text-orange-600"
      }
   });
   } else {
    setRole(role);
    setStyle((item) => {
      return {
        ...item,
        Tenantstyle : "bg-white hover:bg-white text-orange-600",
        LandLordstyle : "bg-orange-600 hover:bg-orange-700"
      }
   });
   }
  }


  return (
    <AuthContextProvider>
    <div className="flex min-h-screen flex-col">
    <main className="flex-1 py-12 px-4 max-w-4xl mx-auto">
      <div className="flex justify-center mb-6 space-x-4">
        <Button
         className={`${style.Tenantstyle} font-medium `}
          onClick={()=>{changeStyle('Tenant')}}
        >
          Sign up as Tenant
        </Button>
        <Button
           className={`${style.LandLordstyle} font-medium`}
           onClick={()=>{changeStyle('LandLord')}}
        >
          Sign up as Landlord
        </Button>
      </div>
      <SignUpForm userRole={role}/>
      {/* { role == 'LandLord' ?  <LandLordSignUpForm/> : <TenantSignupForm/>} */}
      
    </main>
  </div>
  </AuthContextProvider>
  )
}