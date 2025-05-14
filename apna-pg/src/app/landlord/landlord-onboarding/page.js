"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowRight, ArrowLeft, Home, User, MapPin, FileText } from "lucide-react"
import { getLocalStorage } from "@/utilityFunctions/localStorage"
import { useRouter } from "next/navigation"
import { isValidToken } from "@/server/serverActions"
import { Form, useForm } from "react-hook-form"
import { toast,ToastContainer } from "react-toastify"
import { makeOnboardingRequest } from "@/server/landlordUserServerActions"

export default function LandlordOnboardingPage() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [profilePhoto, setProfilePhoto] = useState();
  const [idProof,setIDProof] = useState();
  const [propertyProof,setPropertyProof] = useState();
  const [userID,setUserID] = useState();
  const [uploadedFilePath , setUploadedFilePath] = useState([]);
  const [isSubmitting,setisSubmitting] = useState(false);
  const router = useRouter();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    setUploadedFilePath([]);
    let token = getLocalStorage('token');

    if (token) {
      debugger
      isValidToken(token).then((res) => {
        if (res.message == 'success') {
          debugger
          if (res.result.userRole == 'LandLord') {
            setUserID(res.result.id);
            reset({
              fName: res.result.data.firstName,
              lName: res.result.data.lastName,
              email: res.result.data.email
            })

          } else {
            router.push('/login');
          }

        } else {
          router.push('/login');
        }

      }).catch((error) => {
        console.log(error);
      })

    } else {
      router.push('/login');
    }

  }, [])

 

  const nextStep = () => {
    const newStep = step + 1
    setStep(newStep)
    setProgress(newStep * 33.33)
  }

  const prevStep = () => {
    const newStep = step - 1
    setStep(newStep)
    setProgress(newStep * 33.33)
  }


const sendOnboardingRequest = async (onboardData) => {
  if (profilePhoto && step !== 3) {
    nextStep();
    return;
  }

  if (profilePhoto && idProof && propertyProof && step === 3) {
    setisSubmitting(true);

    const fileArray = [
      { type: "profilePhoto", value: profilePhoto },
      { type: "idProof", value: idProof },
      { type: "propertyProof", value: propertyProof },
    ];

    try {
      const uploadResults = await Promise.all(
        fileArray.map(async (fileItem) => {
          const formData = new FormData();
          formData.append("userID", userID);
          formData.append("file", fileItem.value);
          formData.append("type", fileItem.type);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          if (!data.success) {
            throw new Error("Failed to upload " + fileItem.type);
          }

          return {
            type: data.type,
            url: data.url,
          };
        })
      );

      setUploadedFilePath(uploadResults);

      const onboard = {
        ...onboardData,
        userID,
        profilePhoto: uploadResults.find((item) => item.type === "profilePhoto")?.url,
        idProof: uploadResults.find((item) => item.type === "idProof")?.url,
        propertyProof: uploadResults.find((item) => item.type === "propertyProof")?.url,
      };

      const response = await makeOnboardingRequest(onboard);

      setisSubmitting(false);

      if (response.message === "success") {
        toast.success("Your onboarding request has been sent successfully");
        setUploadedFilePath([]);
        router.push('/landlord/onboarding-in-progress');
      } else {
        toast.error(response.message);
        setUploadedFilePath([]);
      }
    } catch (err) {
      setisSubmitting(false);
      console.error(err);
      toast.error("Something went wrong during upload.");
    }
  }
};

  const uploadProfilePhoto = (value) => {
    if(value) {
      setProfilePhoto(value);
    } else {
      setProfilePhoto(null);
    }
  }

  const uploadIDProof = (value) => {
    if(value) {
      setIDProof(value);
    } else {
      setIDProof(null);
    }
  }

  const UploadPropertyProof = (value) => {
    if(value) {
      setPropertyProof(value);
    } else {
      setPropertyProof(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Landlord Onboarding</CardTitle>
                <CardDescription className="text-orange-100">
                  Complete the form below to register as a landlord on Apna PG
                </CardDescription>
              </CardHeader>

              {/* Progress Bar */}
              <div className="px-6 pt-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-orange-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <div className={`${step >= 1 ? "text-orange-600 font-medium" : ""}`}>Personal</div>
                  <div className={`${step >= 2 ? "text-orange-600 font-medium" : ""}`}>Location</div>
                  <div className={`${step >= 3 ? "text-orange-600 font-medium" : ""}`}>Documents</div>
                </div>
              </div>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit(sendOnboardingRequest)}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-lg font-medium text-orange-600 mb-4">
                        <User className="h-5 w-5" />
                        <h2>Personal Information</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            type="text"
                            {...register('fName',
                              { required: { value: true, message: "This field is required" } }
                            )}
                          />
                          {errors.fName && <span className="text-red-500">{errors.fName.message}</span>}
                        </div>
                        <div className="space-y-2">
                          <Label >Last Name</Label>
                          <Input
                            type="text"
                            {...register('lName'
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          {
                          ...register('email',
                            { required: { value: true, message: "This field is required" } }
                          )
                          }

                          disabled={true}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label >Mobile Number</Label>
                          <Input
                            type="number"
                            {...register('mobile',
                              {
                                required: { value: true, message: "This field is required" },
                                maxLength: { value: 10, message: "Max length should be 10" },
                                minLength: { value: 10, message: "Min length should be 10" }
                              }
                            )}
                          />
                          {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                          <Input
                            type="number"
                            {...register('alternateMobile')}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 2MB)</p>
                            </div>
                            <input type="file"
                               onChange={(e) => { uploadProfilePhoto(e.target.files[0]) }}
                               className="hidden" accept="image/*"/>
                          </label>
                        </div>
                        {profilePhoto && (
                          <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-300 rounded-lg shadow-sm">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm text-green-700 truncate">
                                <strong>Uploaded:</strong> {profilePhoto.name}
                              </p>
                            </div>
                          </div>
                        )}
                        {errors.profilePhoto && <span className="text-red-500">{errors.profilePhoto.message}</span>}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-lg font-medium text-orange-600 mb-4">
                        <MapPin className="h-5 w-5" />
                        <h2>Location Information</h2>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Complete Address</Label>
                        <Textarea
                          {...register('address',
                          {required : {value : true , message : "This field is required"}}
                          )}
                          className="min-h-[100px]"
                        />
                         {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input type="text"  {...register('city',
                          { required: {value : true , message : "This field is required"} }
                          )}/>
                           {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                             <Input type="text" {...register('state',
                          { required: {value : true , message : "This field is required"} }
                          )}/>
                           {errors.state && <span className="text-red-500">{errors.state.message}</span>}
                          {/* <Select>
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="karnataka">Karnataka</SelectItem>
                              <SelectItem value="maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                              <SelectItem value="telangana">Telangana</SelectItem>
                              <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                               Add more states as needed 
                            </SelectContent>
                          </Select> */}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input
                            type="number"
                            {...register('pincode',
                          { required: {value : true , message : "This field is required"} }
                          )}
                          />
                           {errors.pincode && <span className="text-red-500">{errors.pincode.message}</span>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landmark">Landmark</Label>
                          <Input type="text" {...register('landmark')}/>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Document Uploads */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-lg font-medium text-orange-600 mb-4">
                        <FileText className="h-5 w-5" />
                        <h2>Document Uploads</h2>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idProof">ID Proof (Aadhaar/PAN/Voter ID) *</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="idProof"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF, PNG, JPG or JPEG (MAX. 5MB)</p>
                            </div>
                            <input
                              id="idProof"
                              name="idProof"
                              type="file"
                              className="hidden"
                              accept=".pdf,image/*"
                              onChange={(e) => {uploadIDProof(e.target.files[0])}}
                            />
                          </label>
                        </div>
                        {idProof && (
                          <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-300 rounded-lg shadow-sm">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm text-green-700 truncate">
                                <strong>Uploaded:</strong> {idProof.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertyProof">Property Ownership Proof *</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="propertyProof"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF, PNG, JPG or JPEG (MAX. 5MB)</p>
                            </div>
                            <input
                              id="propertyProof"
                              name="propertyProof"
                              type="file"
                              className="hidden"
                              accept=".pdf,image/*"
                              onChange={(e) => {UploadPropertyProof(e.target.files[0])}}
                            />
                          </label>
                        </div>
                        {propertyProof && (
                          <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-300 rounded-lg shadow-sm">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm text-green-700 truncate">
                                <strong>Uploaded:</strong> {propertyProof.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                

              <CardFooter className="flex justify-between p-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                {step < 3 ? (
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </CardFooter>
              </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ToastContainer/>
    </div>
  )
}
