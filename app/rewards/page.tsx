"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IndianRupee, Search, ShoppingBag, Tag } from "lucide-react"
import { WalletCard } from "@/components/wallet-card"

interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  category: "voucher" | "cash" | "product"
  image: string
  partner?: string
}

const rewards: Reward[] = [
  {
    id: "1",
    title: "₹100 Amazon Voucher",
    description: "Get a ₹100 voucher for Amazon India",
    pointsCost: 1000,
    category: "voucher",
    image: "/placeholder.svg?height=200&width=200",
    partner: "Amazon",
  },
  {
    id: "2",
    title: "₹50 Cash Reward",
    description: "Withdraw ₹50 to your bank account",
    pointsCost: 500,
    category: "cash",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    title: "₹200 Flipkart Voucher",
    description: "Get a ₹200 voucher for Flipkart",
    pointsCost: 2000,
    category: "voucher",
    image: "/placeholder.svg?height=200&width=200",
    partner: "Flipkart",
  },
  {
    id: "4",
    title: "Eco-friendly Water Bottle",
    description: "Reusable water bottle made from recycled materials",
    pointsCost: 1500,
    category: "product",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    title: "₹100 Cash Reward",
    description: "Withdraw ₹100 to your bank account",
    pointsCost: 1000,
    category: "cash",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    title: "Jute Shopping Bag",
    description: "Eco-friendly shopping bag made from jute",
    pointsCost: 800,
    category: "product",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function RewardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [category, setCategory] = useState<string>("all")

  const filteredRewards = rewards.filter(
    (reward) =>
      (category === "all" || reward.category === category) &&
      (reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
          <p className="text-muted-foreground">Redeem your points for rewards</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rewards..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="rewards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>
        <TabsContent value="rewards" className="space-y-4">
          <div className="flex overflow-x-auto pb-2 gap-2">
            <Button variant={category === "all" ? "default" : "outline"} size="sm" onClick={() => setCategory("all")}>
              All
            </Button>
            <Button
              variant={category === "voucher" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("voucher")}
            >
              <Tag className="mr-2 h-4 w-4" />
              Vouchers
            </Button>
            <Button variant={category === "cash" ? "default" : "outline"} size="sm" onClick={() => setCategory("cash")}>
              <IndianRupee className="mr-2 h-4 w-4" />
              Cash
            </Button>
            <Button
              variant={category === "product" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("product")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Products
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRewards.length > 0 ? (
              filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {reward.pointsCost} points
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => setSelectedReward(reward)}
                        >
                          Redeem
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Redeem Reward</DialogTitle>
                          <DialogDescription>Are you sure you want to redeem this reward?</DialogDescription>
                        </DialogHeader>
                        {selectedReward && (
                          <div className="flex items-center gap-4 py-4">
                            <img
                              src={selectedReward.image || "/placeholder.svg"}
                              alt={selectedReward.title}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <h4 className="font-medium">{selectedReward.title}</h4>
                              <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                              <p className="text-sm font-medium text-green-600 mt-1">
                                {selectedReward.pointsCost} points
                              </p>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-green-600 hover:bg-green-700">Confirm Redemption</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Search className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No rewards found</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="wallet">
          <WalletCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
