"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Shield, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function StartOnboardingPage() {
  const router = useRouter();
 

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">Landlord Onboarding</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">List Your PG on Apna PG</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 mb-8">
              Join thousands of landlords who trust Apna PG to find quality tenants for their PG accommodations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href='/landlord/landlord-onboarding'>
                <Button  className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6 h-auto" >
                  Start Onboarding <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why List Your PG With Us?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Apna PG helps you find quality tenants, manage your properties, and maximize your rental income.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle>Wider Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connect with thousands of potential tenants looking for PG accommodations in your area.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle>Verified Tenants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We verify all tenant profiles to ensure you get reliable and trustworthy occupants.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle>Secure Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive rent payments securely through our platform with detailed payment tracking.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Getting started with Apna PG is simple. Follow these steps to list your property.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Create Account",
                  description: "Sign up and complete your profile with your personal details.",
                },
                {
                  step: 2,
                  title: "Add Property",
                  description: "Enter your property details, amenities, and upload photos.",
                },
                {
                  step: 3,
                  title: "Verification",
                  description: "Our team verifies your property to ensure quality standards.",
                },
                {
                  step: 4,
                  title: "Go Live",
                  description: "Your property goes live and starts receiving booking requests.",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-white rounded-lg p-6 shadow-sm relative z-10 h-full">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  {item.step < 4 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-orange-200 -translate-y-1/2 -z-10 transform -translate-x-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Landlords Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from landlords who have successfully listed their properties on Apna PG.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Gupta",
                  location: "Bangalore",
                  quote:
                    "Since listing my property on Apna PG, I've maintained 100% occupancy. The verification process gives me peace of mind about the tenants.",
                  image: "/placeholder.svg?height=100&width=100&text=RG",
                },
                {
                  name: "Sunita Reddy",
                  location: "Mumbai",
                  quote:
                    "The onboarding process was smooth and the support team was very helpful. I got my first booking within a week of listing!",
                  image: "/placeholder.svg?height=100&width=100&text=SR",
                },
                {
                  name: "Vikram Mehta",
                  location: "Delhi",
                  quote:
                    "Apna PG has simplified property management for me. The dashboard gives me all the information I need at a glance.",
                  image: "/placeholder.svg?height=100&width=100&text=VM",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="relative">
                  <CardContent className="pt-8">
                    <div className="absolute -top-6 left-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">Landlord, {testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to List Your Property?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join our community of landlords and start receiving booking requests today.
            </p>
            <Link href="/landlord-onboarding">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                Start Onboarding Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
