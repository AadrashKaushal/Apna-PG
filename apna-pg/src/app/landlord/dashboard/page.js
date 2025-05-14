"use client"

import { useState ,useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Home,
    Users,
    LogOut,
    CreditCard,
    Bell,
    MoreVertical,
    Eye,
    Edit,
    Trash,
    Plus,
    Star,
    MessageSquare,
    Calendar,
    ArrowUpRight,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { isValidToken } from "@/server/serverActions"
import { getLocalStorage,removeLocalStorage } from "@/utilityFunctions/localStorage"
// Sample data for landlord properties
const properties = [
    {
        id: 1,
        name: "Sunshine PG Homes",
        location: "Koramangala, Bangalore",
        type: "Male",
        rooms: {
            total: 8,
            occupied: 6,
            available: 2,
        },
        rent: "₹12,000 - ₹15,000",
        rating: 4.5,
        reviews: 32,
        image: "/placeholder.svg?height=300&width=400&text=Sunshine+PG",
        status: "active",
        bookingRequests: 3,
        lastUpdated: "2 days ago",
    },
    {
        id: 2,
        name: "Urban Nest PG",
        location: "Indiranagar, Bangalore",
        type: "Co-ed",
        rooms: {
            total: 12,
            occupied: 9,
            available: 3,
        },
        rent: "₹14,000 - ₹18,000",
        rating: 4.8,
        reviews: 45,
        image: "/placeholder.svg?height=300&width=400&text=Urban+Nest",
        status: "active",
        bookingRequests: 5,
        lastUpdated: "1 day ago",
    },
    {
        id: 3,
        name: "Royal Residency",
        location: "Whitefield, Bangalore",
        type: "Female",
        rooms: {
            total: 10,
            occupied: 7,
            available: 3,
        },
        rent: "₹13,000 - ₹16,000",
        rating: 4.6,
        reviews: 28,
        image: "/placeholder.svg?height=300&width=400&text=Royal+Residency",
        status: "pending",
        bookingRequests: 0,
        lastUpdated: "Just added",
    },
]

// Sample data for recent bookings
const recentBookings = [
    {
        id: 1,
        tenant: "Amit Kumar",
        property: "Sunshine PG Homes",
        roomType: "Single",
        moveInDate: "June 15, 2023",
        status: "confirmed",
    },
    {
        id: 2,
        tenant: "Priya Patel",
        property: "Sunshine PG Homes",
        roomType: "Double",
        moveInDate: "June 20, 2023",
        status: "pending",
    },
    {
        id: 3,
        tenant: "Rahul Sharma",
        property: "Urban Nest PG",
        roomType: "Single",
        moveInDate: "June 18, 2023",
        status: "confirmed",
    },
    {
        id: 4,
        tenant: "Neha Singh",
        property: "Urban Nest PG",
        roomType: "Single",
        moveInDate: "June 25, 2023",
        status: "pending",
    },
]

export default function LandlordDashboardPage() {
    const [activeTab, setActiveTab] = useState("properties")
    const [userProfile,setUserProfile] = useState();
    const router = useRouter();

      useEffect(()=>{
        debugger
        let token = getLocalStorage('token');
        if(token) {
          isValidToken(token).then((res) => {
            if(res.message == 'success') {
                    setUserProfile(res.result.data.lastName ? res.result.data.firstName + " " + res.result.data.lastName : res.result.data.firstName)
            
              if(res.result.userRole == 'LandLord') {
               
              } else{
                router.push('/');
              }
            } else {
                router.push('/login');
            }
          }).catch((error) => {
            console.log('error',error);
          })
        } else{
            router.push('/login');
        }
      },[]);
    

    // Calculate statistics
    const totalProperties = properties.length
    const activeProperties = properties.filter((p) => p.status === "active").length
    const totalRooms = properties.reduce((sum, property) => sum + property.rooms.total, 0)
    const occupiedRooms = properties.reduce((sum, property) => sum + property.rooms.occupied, 0)
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0
    const pendingBookings = recentBookings.filter((b) => b.status === "pending").length

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
                            <p className="text-gray-500">Manage your properties and bookings</p>
                            
                        </div>
                          <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Property
                            </Button>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <button
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                            >
                                <Avatar className="w-9 h-9">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                                <span className="hidden md:block font-medium truncate max-w-[140px]">
                                    {userProfile}
                                </span>
                            </button>

                            <Button
                                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-md text-sm flex items-center gap-2"
                                size="sm"
                                onClick={() => {
                                    removeLocalStorage('token');
                                    router.push('/');
                                }}
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Log out</span>
                            </Button>

                        </div>
                      
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Properties</p>
                                        <h3 className="text-3xl font-bold">{totalProperties}</h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {activeProperties} active, {totalProperties - activeProperties} pending
                                        </p>
                                    </div>
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        <Home className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                                        <h3 className="text-3xl font-bold">{occupancyRate}%</h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {occupiedRooms} of {totalRooms} rooms occupied
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Users className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Booking Requests</p>
                                        <h3 className="text-3xl font-bold">{pendingBookings}</h3>
                                        <p className="text-xs text-green-600 mt-1">
                                            <ArrowUpRight className="inline h-3 w-3 mr-1" />2 new today
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Calendar className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Tabs */}
                    <Tabs defaultValue="properties" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 md:w-auto">
                            <TabsTrigger value="properties">My Properties</TabsTrigger>
                            <TabsTrigger value="bookings">Bookings</TabsTrigger>
                            <TabsTrigger value="messages">Messages</TabsTrigger>
                        </TabsList>

                        {/* Properties Tab */}
                        <TabsContent value="properties" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map((property) => (
                                    <Card key={property.id} className="overflow-hidden">
                                        <div className="relative h-48">
                                            <Image
                                                src={property.image || "/placeholder.svg"}
                                                alt={property.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <Badge
                                                className={`absolute top-2 right-2 ${property.status === "active" ? "bg-green-600" : "bg-orange-600"
                                                    }`}
                                            >
                                                {property.status === "active" ? "Active" : "Pending Approval"}
                                            </Badge>
                                        </div>
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{property.name}</CardTitle>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit Property
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash className="h-4 w-4 mr-2" />
                                                            Remove Property
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <CardDescription>{property.location}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pb-2">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Type</p>
                                                    <p className="font-medium">{property.type}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Rent Range</p>
                                                    <p className="font-medium">{property.rent}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Occupancy</span>
                                                    <span>
                                                        {property.rooms.occupied}/{property.rooms.total} rooms
                                                    </span>
                                                </div>
                                                <Progress value={(property.rooms.occupied / property.rooms.total) * 100} className="h-2" />
                                            </div>

                                            <div className="flex items-center mt-4">
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="ml-1 text-sm font-medium">{property.rating}</span>
                                                </div>
                                                <span className="mx-2 text-gray-300">•</span>
                                                <span className="text-sm text-gray-500">{property.reviews} reviews</span>
                                                {property.bookingRequests > 0 && (
                                                    <>
                                                        <span className="mx-2 text-gray-300">•</span>
                                                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                                                            {property.bookingRequests} new requests
                                                        </Badge>
                                                    </>
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-0">
                                            <Button variant="outline" className="w-full">
                                                Manage Property
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}

                                {/* Add New Property Card */}
                                <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
                                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                                        <Plus className="h-8 w-8 text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">Add New Property</h3>
                                    <p className="text-gray-500 text-center mb-4">List a new PG property to reach more tenants</p>
                                    <Button className="bg-orange-600 hover:bg-orange-700">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Property
                                    </Button>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Bookings Tab */}
                        <TabsContent value="bookings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Booking Requests</CardTitle>
                                    <CardDescription>Manage your property booking requests</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {recentBookings.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                                            >
                                                <div>
                                                    <h4 className="font-medium">{booking.tenant}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {booking.property} • {booking.roomType} Room
                                                    </p>
                                                    <p className="text-sm">Move-in: {booking.moveInDate}</p>
                                                </div>
                                                <div className="flex items-center mt-4 md:mt-0">
                                                    <Badge className={booking.status === "confirmed" ? "bg-green-600" : "bg-orange-600"}>
                                                        {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                                                    </Badge>
                                                    <Button variant="ghost" size="sm" className="ml-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <MessageSquare className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">
                                        View All Bookings
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Messages Tab */}
                        <TabsContent value="messages">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Messages</CardTitle>
                                    <CardDescription>Communicate with tenants and Apna PG support</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-12">
                                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                                        When you receive messages from tenants or Apna PG support, they will appear here.
                                    </p>
                                    <Button className="bg-orange-600 hover:bg-orange-700">Contact Support</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
