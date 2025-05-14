"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ArrowRight, Home, MessageSquare, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { isValidToken,isOnboardingRequest } from "@/server/serverActions";
import { checkStatus } from "@/server/landlordUserServerActions";
import { getLocalStorage } from "@/utilityFunctions/localStorage";

export default function OnboardingInProgressPage() {
  const router = useRouter();
  const [status, setStatus] = useState();

  useEffect(() => {
    debugger
    let token = getLocalStorage('token');
    if (token) {
      isValidToken(token).then((res) => {
        if (res.message == 'success') {
          let userID = res.result.id;
          if (res.result.userRole == 'LandLord') {
            isOnboardingRequest(res.result.id).then(async (res) => {
              if (res.message == 'success') {
                router.push('/landlord/start-onboarding');
              } else {
                debugger
                let response = await checkStatus(userID);
                if (response.message == 'success') {
                  console.log(response);
                  setStatus(response.result)
                }
              }
            }).catch((error) => {
              console.log(error);
            })
          }
        }
      }).catch((error) => {
        console.log('error', error);
      })
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Clock className="h-10 w-10 text-orange-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{status == "Pending" ? "Your Onboarding Request is in Progress" :
              status == "Accepted" ? "Your Onboarding Request has Accepted by the Admin ." : "Your Onboarding Request has been Rejected by the Admin."}</h1>
            <p className="text-lg text-gray-600 mb-8">
              {
                status == "Pending" ? "Thank you for submitting your documents. Our team is reviewing your information." :
                  status == "Accepted" ? "go to dashboard to proceed further" : "Thank you for doing business with us"
              }

            </p>

          </div>



          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Have questions about your application? Our support team is here to help.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => { router.push('/contact') }}>
                    Contact Us
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-orange-600" />
                    FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Find answers to commonly asked questions about the onboarding process.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View FAQs
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {
            status == "Accepted" &&
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <Link href="/landlord/dashboard">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          }

        </div>
      </main>
    </div>
  )
}
