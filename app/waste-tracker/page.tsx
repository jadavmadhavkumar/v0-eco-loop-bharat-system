"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QrCode, Search } from "lucide-react"
import { PlasticTimeline } from "@/components/plastic-timeline"
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
]

export default function WasteTrackerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<PlasticItem | null>(null)

  const filteredItems = plasticItems.filter(
    (item) =>
      item.qrCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waste Tracker</h1>
          <p className="text-muted-foreground">Track the lifecycle of plastic waste</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by QR code or type..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all ${
                    selectedItem?.id === item.id ? "border-green-500 shadow-md" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.qrCode}</CardTitle>
                        <CardDescription>
                          {item.type} - {item.weight} kg
                        </CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "collected"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "sorted"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <p>Location: {item.location.address}</p>
                      <p>Collected: {new Date(item.collectedAt).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Search className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No items found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Plastic Collection Map</CardTitle>
              <CardDescription>View the locations where plastic was collected</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <PlasticMap items={plasticItems} onSelectItem={setSelectedItem} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <Card>
          <CardHeader>
            <CardTitle>Plastic Item Details</CardTitle>
            <CardDescription>{selectedItem.qrCode}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Item Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedItem.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>{selectedItem.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          selectedItem.status === "collected"
                            ? "bg-blue-100 text-blue-700"
                            : selectedItem.status === "sorted"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Collection Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collected At:</span>
                      <span>{new Date(selectedItem.collectedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{selectedItem.location.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{new Date(selectedItem.updatedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-4">Lifecycle Timeline</h3>
                <PlasticTimeline item={selectedItem} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
