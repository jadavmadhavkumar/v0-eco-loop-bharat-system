"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, Filter, MapPin, Search, Users } from "lucide-react"
import { AdminChart } from "@/components/admin-chart"
import { PlasticMap } from "@/components/plastic-map"

interface PlasticItem {
  id: string
  qrCode: string
  type: string
  weight: number
  status: "collected" | "sorted" | "recycled"
  collectedAt: string
  location: {
    lat: number
    lng: number
    address: string
  }
  updatedAt: string
}

const plasticItems: PlasticItem[] = [
  {
    id: "1",
    qrCode: "PLASTIC-QR-2025-0042",
    type: "Bottle",
    weight: 0.15,
    status: "collected",
    collectedAt: "2025-08-05T10:30:00",
    location: {
      lat: 28.6139,
      lng: 77.209,
      address: "Connaught Place, New Delhi",
    },
    updatedAt: "2025-08-05T10:30:00",
  },
  {
    id: "2",
    qrCode: "PLASTIC-QR-2025-0041",
    type: "Container",
    weight: 0.25,
    status: "sorted",
    collectedAt: "2025-08-04T15:45:00",
    location: {
      lat: 28.6129,
      lng: 77.2295,
      address: "Lajpat Nagar, New Delhi",
    },
    updatedAt: "2025-08-04T18:20:00",
  },
  {
    id: "3",
    qrCode: "PLASTIC-QR-2025-0040",
    type: "Bag",
    weight: 0.05,
    status: "recycled",
    collectedAt: "2025-08-02T14:20:00",
    location: {
      lat: 28.5355,
      lng: 77.241,
      address: "Saket, New Delhi",
    },
    updatedAt: "2025-08-03T09:15:00",
  },
  {
    id: "4",
    qrCode: "PLASTIC-QR-2025-0039",
    type: "Bottle",
    weight: 0.15,
    status: "collected",
    collectedAt: "2025-08-01T11:10:00",
    location: {
      lat: 28.7041,
      lng: 77.1025,
      address: "Rohini, New Delhi",
    },
    updatedAt: "2025-08-01T11:10:00",
  },
  {
    id: "5",
    qrCode: "PLASTIC-QR-2025-0038",
    type: "Container",
    weight: 0.2,
    status: "sorted",
    collectedAt: "2025-07-31T16:05:00",
    location: {
      lat: 28.6304,
      lng: 77.2177,
      address: "Karol Bagh, New Delhi",
    },
    updatedAt: "2025-07-31T18:30:00",
  },
]

export default function AdminPage() {
  return (
    <div className="container p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">Manage and monitor the EcoLoop system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plastic Collected</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-green-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152.8 kg</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Points</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="items">Plastic Items</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plastic Collection Overview</CardTitle>
              <CardDescription>Monthly plastic collection by type</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AdminChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="items">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Plastic Items</CardTitle>
                <CardDescription>All plastic items in the system</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search items..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>QR Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Collected At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plasticItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.qrCode}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.weight} kg</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "collected"
                              ? "border-blue-200 text-blue-700 bg-blue-50"
                              : item.status === "sorted"
                                ? "border-amber-200 text-amber-700 bg-amber-50"
                                : "border-green-200 text-green-700 bg-green-50"
                          }
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location.address}</TableCell>
                      <TableCell>{new Date(item.collectedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Collection Map</CardTitle>
              <CardDescription>Geographic distribution of plastic collection</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <PlasticMap items={plasticItems} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
