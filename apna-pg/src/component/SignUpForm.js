"use client"

import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignupForm() {

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Register as a Landlord</CardTitle>
        <CardDescription className="text-center">Create an account to list your PG accommodation</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={"password"} placeholder="••••••••" required />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      
                    >
                      {/* {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} */}
                      
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Next: Property Details
              </Button>
            </>
          /* ) : (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Property Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="propertyName">Property Name</Label>
                  <Input id="propertyName" placeholder="Sunshine PG" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123, ABC Colony, Sector 123, City, State, PIN"
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Mumbai" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" placeholder="400001" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomsAvailable">Number of Rooms Available</Label>
                    <Input id="roomsAvailable" type="number" min="1" placeholder="4" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pgType">PG Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="coed">Co-ed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Amenities Offered</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="wifi" />
                      <Label htmlFor="wifi" className="text-sm">
                        WiFi
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ac" />
                      <Label htmlFor="ac" className="text-sm">
                        Air Conditioning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="food" />
                      <Label htmlFor="food" className="text-sm">
                        Food Included
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="laundry" />
                      <Label htmlFor="laundry" className="text-sm">
                        Laundry
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="parking" />
                      <Label htmlFor="parking" className="text-sm">
                        Parking
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tv" />
                      <Label htmlFor="tv" className="text-sm">
                        TV
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property, rules, and other important details..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:text-orange-800">
                      terms and conditions
                    </Link>
                  </Label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" variant="outline" className="sm:flex-1" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button type="submit" className="sm:flex-1 bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </>
          )} */}
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
    </Card>
  )
}
