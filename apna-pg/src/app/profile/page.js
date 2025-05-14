"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, MapPin, Edit } from "lucide-react"
import Image from "next/image"

// Sample user data - in a real app, this would come from an API or database
const userData = {
  firstName: "Rahul",
  lastName: "Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91 98765 43210",
  role: "Landlord",
  joinedDate: "January 15, 2023",
  location: "Koramangala, Bangalore",
  profileImage: "/placeholder.svg?height=200&width=200&text=RS",
  verified: true,
  properties: 2,
  bookings: 5,
}

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="flex flex-col items-center pb-2">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={userData.profileImage || "/placeholder.svg"}
                      alt={`${userData.firstName} ${userData.lastName}`}
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-md"
                    />
                    {userData.verified && <Badge className="absolute bottom-0 right-0 bg-green-600">Verified</Badge>}
                  </div>
                  <h1 className="text-2xl font-bold">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <Badge className="mt-2 bg-orange-600">{userData.role}</Badge>
                </CardHeader>
              </Card>

              {/* Contact Information */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-bold">Contact Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold">Profile Overview</h2>
                </CardHeader>
                <CardContent>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">First Name</p>
                              <p className="font-medium">{userData.firstName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Name</p>
                              <p className="font-medium">{userData.lastName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{userData.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{userData.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Role</p>
                              <p className="font-medium">{userData.role}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{userData.location}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Account Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Account Status</p>
                              <p className="font-medium flex items-center">
                                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                Active
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Joined Date</p>
                              <p className="font-medium">{userData.joinedDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Verification</p>
                              <p className="font-medium">{userData.verified ? "Verified Account" : "Not Verified"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                </CardContent>
              </Card>
      
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
