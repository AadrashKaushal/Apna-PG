"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Swal from 'sweetalert2'
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
    Building,
    CreditCard,
    Bell,
    MoreVertical,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    ArrowUpRight,
    Search,
    Filter,
} from "lucide-react"
import { isValidToken } from "@/server/serverActions"
import { getLocalStorage, removeLocalStorage } from "@/utilityFunctions/localStorage"
import { useRouter } from "next/navigation"
import { getAllLandlordRequest, statusChangelandLordRequest } from "@/server/ownerActions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Sample data for pending landlord requests


// Sample data for recent activities
const recentActivities = [
    {
        id: 1,
        action: "New landlord registration",
        user: "Rahul Sharma",
        time: "2 hours ago",
    },
    {
        id: 2,
        action: "Property approved",
        user: "Admin",
        property: "Green Valley PG",
        time: "3 hours ago",
    },
    {
        id: 3,
        action: "New booking request",
        user: "Amit Kumar",
        property: "Sunshine PG Homes",
        time: "5 hours ago",
    },
    {
        id: 4,
        action: "Payment received",
        user: "Neha Singh",
        amount: "₹12,000",
        time: "6 hours ago",
    },
    {
        id: 5,
        action: "Property listing updated",
        user: "Vikram Mehta",
        property: "Royal Residency",
        time: "8 hours ago",
    },
]

export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [userName, setUserName] = useState('');
    const [landlordRecord, setLandLordRecords] = useState([]);
    const [listCall, setListCall] = useState(false);
    const [landlordCount, setLandlordCount] = useState(0);
    const router = useRouter();


    useEffect(() => {
        let token = getLocalStorage('token');

        if (token) {
            debugger
            isValidToken(token).then(async (res) => {
                if (res.message == 'success') {
                    debugger
                    if (res.result.userRole == 'Owner') {
                        setUserName(res.result.data.lastName ? res.result.data.firstName + " " + res.result.data.lastName : res.result.data.firstName)
                        let response = await getAllLandlordRequest();
                        if (response.message == 'success') {
                            let totalLandlordCount = response.result.filter((item) => item.status == 'Accepted').length;
                            setLandlordCount(totalLandlordCount);
                            setLandLordRecords(response.result);
                            console.log(response.result);
                        }

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

    }, [listCall])

    const onAcceptClick = (userID, status) => {
        let title = status == "Accepted" ? "Accept" : "Reject";
        Swal.fire({
            title: `Do you want to ${title} the landLord Request ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {

                let response = await statusChangelandLordRequest(userID, status);

                if (response.message == "success") {
                    setListCall(!listCall);
                    Swal.fire(`Landlord request ${status} !`, "", "success");
                } else {
                    console.log(response.message);
                }
            }
        });
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-gray-500">Manage properties, landlords, and bookings</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <button
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                            >
                                <Avatar className="w-9 h-9">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
                                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="hidden md:block font-medium truncate max-w-[140px]">
                                    {userName}
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
                                        <h3 className="text-3xl font-bold">128</h3>
                                    </div>
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        <Building className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Landlords</p>
                                        <h3 className="text-3xl font-bold">{landlordCount}</h3>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                                        <h3 className="text-3xl font-bold">342</h3>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Home className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Pending Landlord Requests */}
                        <div className="lg:col-span-2">
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Pending Landlord Requests</CardTitle>
                                            <CardDescription>Review and approve new landlord registrations</CardDescription>
                                        </div>
                                        <Badge className="bg-orange-600">4 Pending</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                        <div className="relative w-full md:w-64">
                                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Search landlords..."
                                                className="pl-8"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="status-filter" className="text-sm">
                                                Status:
                                            </Label>
                                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                <SelectTrigger id="status-filter" className="w-[140px]">
                                                    <SelectValue placeholder="Filter by status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="rounded-md border overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Landlord</TableHead>
                                                    <TableHead className="hidden md:table-cell">Location</TableHead>
                                                    <TableHead className="hidden md:table-cell">Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {landlordRecord.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                                            No pending requests found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    landlordRecord.map((landlord) => (
                                                        <TableRow key={landlord.id}>
                                                            <TableCell>
                                                                <div>
                                                                    <p className="font-medium">{landlord.data.lastName != undefined ? landlord.data.firstName + " " + landlord.data.lastName : landlord.data.firstName}</p>
                                                                    <p className="text-sm text-gray-500">{landlord.data.email}</p>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">{landlord.data.city} , {landlord.data.state}</TableCell>
                                                            <TableCell className="hidden md:table-cell"><Badge className={`${landlord.status == "Pending" ? "bg-orange-600" : landlord.status == "Accepted" ? "bg-green-600" : "bg-red-600"}`}>{landlord.status}</Badge></TableCell>
                                                            <TableCell className="text-right">
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
                                                                        <DropdownMenuSeparator />
                                                                        {
                                                                            landlord.status == "Pending" &&
                                                                            <>
                                                                                <DropdownMenuItem onClick={() => onAcceptClick(landlord.id, "Accepted")}>
                                                                                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                                                                    Approve
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem onClick={() => onAcceptClick(landlord.id, "Rejected")}>
                                                                                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                                                                    Reject
                                                                                </DropdownMenuItem>
                                                                            </>
                                                                        }

                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <Button variant="outline" size="sm">
                                            View All Requests
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activities */}
                        <div>
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle>Recent Activities</CardTitle>
                                    <CardDescription>Latest actions on the platform</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {recentActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start">
                                                <div className="bg-gray-100 p-2 rounded-full mr-3">
                                                    <Clock className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{activity.action}</p>
                                                    <div className="text-sm text-gray-500">
                                                        <span>{activity.user}</span>
                                                        {activity.property && <span> • {activity.property}</span>}
                                                        {activity.amount && <span> • {activity.amount}</span>}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <Button variant="outline" size="sm" className="w-full">
                                            View All Activities
                                        </Button>
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
