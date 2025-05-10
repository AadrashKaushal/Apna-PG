"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { AccountContext } from '@/contextApi/AccountContext';
import { useContext } from 'react';
import { ToastContainer,toast } from 'react-toastify';

export default function OtpVerification() {
    const {setOtpVerificationStatus,otp} = useContext(AccountContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting },
  } = useForm();

  const  verifyOTP = (OTPData) => {
    if(OTPData.otp == otp) {
        setOtpVerificationStatus(true);
    } else {
        reset();
        toast.error('Invalid OTP !!');
    }
  }
 
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          Please enter the 6-digit code sent to your email address.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(verifyOTP)}>
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              placeholder="Enter OTP"
              {...register('otp', {
                required: 'OTP is required',
                maxLength : {value:6,message:"OTP must be 6 digits"},
              })}
            />
            {errors.otp && <span className="text-red-500 text-sm">{errors.otp.message}</span>}
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
          Verify
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-2 text-sm">
        <div>
          Didn’t receive the code?{' '}
          <button className="text-orange-600 hover:text-orange-800 font-medium" type="button">
            Resend
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

