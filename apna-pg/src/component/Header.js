"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {globalContext } from "@/contextApi/globalContext";
import { useContext, useEffect, useState } from "react";
import { getLocalStorage,removeLocalStorage } from "@/utilityFunctions/localStorage";
import { isValidToken,isOnboardingRequest } from "@/server/serverActions";
import { User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function Header() {
  let  {activeProfile} = useContext(globalContext);

  let [showProfile,setShowProfile] = useState(false);
  let [userProfile,setUserProfile] = useState();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  useEffect(()=>{
    debugger
    let token = getLocalStorage('token');
    if(token) {
      isValidToken(token).then((res) => {
        if(res.message == 'success') {
          setUserProfile(res.result.data.firstName + " " + res.result.data.lastName);
          setShowProfile(true);

          if(res.result.userRole == 'LandLord') {
            isOnboardingRequest(res.result.id).then((res) => {
            if(res.message == 'success') {
              router.push('/landlord/start-onboarding');
            } else {
              router.push('/landlord/onboarding-in-progress');
            }
          }).catch((error) => {
            console.log(error);
          })
          } else if(res.result.userRole == 'Owner') {
            router.push('/admin/dashboard');
          }
        }
      }).catch((error) => {
        console.log('error',error);
      })
    } 
  },[activeProfile]);


  const logout = () => {
    removeLocalStorage('token');
    setShowProfile(false);
  }

  return (
 <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
  <div className="container flex h-16 items-center justify-between pl-8">
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold text-orange-600">Apna PG</span>
      </Link>
    </div>

    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-600">Home</Link>
      <Link href="/listings" className="text-sm font-medium transition-colors hover:text-orange-600">Listings</Link>
      <Link href="/about" className="text-sm font-medium transition-colors hover:text-orange-600">About Us</Link>
      <Link href="/contact" className="text-sm font-medium transition-colors hover:text-orange-600">Contact</Link>
    </nav>

    <div className="flex items-center gap-4 pr-8">
      {
        showProfile ? 
         <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-orange-700  rounded-sm transition-colors focus:outline-none"
      >
        <Avatar className="w-9 h-9">
          <AvatarImage src="/user-avatar.png" alt="@profile" />
          <AvatarFallback>{userProfile.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="hidden md:block font-medium truncate max-w-[140px]">{userProfile}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-sm shadow-lg ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="py-2">
            <Link
              href=""
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition"
            >
              <User className="w-4 h-4 text-orange-500" />
              View Profile
            </Link>
            <Link
              href=""
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>:
        <div className="flex space-x-4">
        <Link href="/login"><Button className="bg-orange-600 hover:bg-orange-700">Login</Button></Link>
        <Link href="/signup"><Button className="bg-white text-orange-600 border border-orange-600 hover:bg-orange-50">Sign Up</Button></Link>
      </div>
      }
      

   
      
    </div>
  </div>
</header>
  )
}
