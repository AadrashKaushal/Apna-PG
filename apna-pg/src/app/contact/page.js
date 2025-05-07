"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-orange-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
              Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <Card className="p-8 bg-green-50 border-green-200">
                    <h3 className="text-xl font-bold text-green-700 mb-2">Thank You!</h3>
                    <p className="text-green-600">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" className="min-h-[150px]" required />
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Our Office</h3>
                      <p className="text-gray-600">
                        123 Tech Park, Sector 15
                        <br />
                        Gurugram, Haryana 122001
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-gray-600">
                        Customer Support: +91 98765 43210
                        <br />
                        Landlord Support: +91 98765 43211
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">
                        General Inquiries: info@apnapg.com
                        <br />
                        Support: support@apnapg.com
                        <br />
                        Partnerships: partners@apnapg.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Map Placeholder</p>
                <p className="text-sm text-gray-500">An interactive map would be embedded here</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How do I list my property on Apna PG?",
                  answer:
                    "To list your property, create a landlord account, complete your profile, and follow the step-by-step process to add your property details, photos, and pricing.",
                },
                {
                  question: "Is there a fee to list my property?",
                  answer:
                    "Basic listings are free. We offer premium listing options with enhanced visibility and features for a small fee.",
                },
                {
                  question: "How do I schedule a visit to a PG?",
                  answer:
                    "Once you find a PG you're interested in, you can request a visit through our platform. The landlord will be notified and can confirm a convenient time.",
                },
                {
                  question: "Are the listings verified?",
                  answer:
                    "Yes, we verify all listings to ensure they meet our quality and safety standards. Properties with a 'Verified' badge have been physically inspected by our team.",
                },
                {
                  question: "How can I report an issue with a listing?",
                  answer:
                    "If you encounter any issues with a listing, please use the 'Report' button on the listing page or contact our support team directly.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
