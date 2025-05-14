"use client"
import { useState, useContext, useEffect } from "react";
import { AccountContext } from "@/contextApi/AccountContext";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from 'react-hook-form';
import OtpVerification from "./OtpVerification";
import { ToastContainer, toast } from "react-toastify";
import { createUserAccount,sendEmailToUser } from "@/server/serverActions";
import { useRouter } from "next/navigation";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

export default function SignUpForm({userRole}) {

  let { otpVerificationStatus, setOtp } = useContext(AccountContext);
  let router = useRouter();

  useEffect(() => {
    debugger
    if (otpVerificationStatus == true) {
      debugger

      createUserAccount(formData).then((res) => {
        if (res.message == 'Success') {
          toast.success('Account created successfully !!');
          setTimeout(()=>{
            router.push('/login');
          },2000);
        } else{
          toast.error(res.message);
        }
      }).catch((error) => {

        console.log('error', error);
      })
    } 
  }, [otpVerificationStatus])
  // getting created globally context


  let [activeOTPVerfication, setActiveOTPVerification] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting }
  } = useForm();


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState();

  const submitLandlordSignUpForm = async (formData) => {
    debugger
    let formResponse = formData;

    if (formResponse.password == formResponse.cPassword) {
      const generatedOTP = generateOTP();
      setOtp(generatedOTP);

      let response = await sendEmailToUser(formResponse.email,generatedOTP);


      if(response.message == 'success') {
        setActiveOTPVerification(true);
        toast.success('OTP Send Successfully');
      } else {
        reset();
        toast.error(response.message);
      }
      
      setFormData({
        firstName: formResponse.fName,
        lastName: formResponse.lName ? formResponse.lName : "",
        email: formResponse.email,
        password: formResponse.password,
        userRole:userRole
      });
    } else {
      reset();
      toast.error('Password does not match !!');
    }


  }

  return (
    <div>
      {
        activeOTPVerfication == false ?
          <Card className="w-full max-w-2xl mx-auto">
            {
              userRole == 'Tenant' ?
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Register as a Tenant</CardTitle>
                  <CardDescription className="text-center">
                    Create an account to find the best PG accommodations
                  </CardDescription>
                </CardHeader> :
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Register as a Landlord</CardTitle>
                  <CardDescription className="text-center">Create an account to list your PG accommodation</CardDescription>
                </CardHeader>
            }

            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(submitLandlordSignUpForm)}>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        {...register('fName', {
                          required: { value: true, message: 'This field is required' },
                        })}
                        placeholder="John"
                      />
                      {errors.fName && <span className="text-red-500">{errors.fName.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" {...register('lName')} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...register('email', {
                        required: { value: true, message: 'This field is required' },
                      })}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        {...register('password', {
                          required: { value: true, message: 'This field is required' },
                        })}
                      />

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

                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        {...register('cPassword', {
                          required: { value: true, message: 'This field is required' },
                        })}
                      />
                      <Button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-14 text-sm rounded-sm"
                      >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                    {errors.cPassword && <span className="text-red-500">{errors.cPassword.message}</span>}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled = {isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-600 hover:text-orange-800 font-medium">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card> :
          <OtpVerification />
      }
      <ToastContainer />
    </div>
  )
}
