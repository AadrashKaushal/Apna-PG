"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import {useState,useContext} from 'react';
import { loginUserAccount } from "@/server/serverActions";
import { toast,ToastContainer } from "react-toastify"
import { setLocalStorage } from "@/utilityFunctions/localStorage"
import { globalContext } from "@/contextApi/globalContext"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState : {errors,isSubmitting}
  } = useForm();

  let {activeProfile,setProfile} = useContext(globalContext);
  let router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const loginAccount = async(data) =>{
    let response = await loginUserAccount(data);
    if(response.message == 'success') {
      reset()
      setLocalStorage('token',response.token);
      setProfile(!activeProfile );
      setTimeout(()=>{
        router.push('/');  
      })
    } else {
      toast.error(response.message);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login to Apna PG</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form  className="space-y-4" onSubmit={handleSubmit(loginAccount)}>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="name@example.com" {...register('email',
            {required:{ value : true , message : "This field is required"} }
            )} />
             {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'}  placeholder="Enter Password" {...register('password',
              { required : { value : true , message :"This Field is Required" } }
              ) } />
              <Button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-14 text-sm rounded-sm"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
            </div>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-800">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}> 
            {isSubmitting ? 'Logging in' : 'Login'} 
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-orange-600 hover:text-orange-800 font-medium">
            Sign up
          </Link>
        </div>
      </CardFooter>
      <ToastContainer/>
    </Card>
  )
}
