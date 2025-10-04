"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownToLine, ArrowUpToLine, Clock, CreditCard, IndianRupee } from "lucide-react"

interface Transaction {
  id: string
  type: "earned" | "redeemed"
  amount: number
  description: string
  date: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "earned",
    amount: 50,
    description: "Plastic bottle collection",
    date: "2025-08-01",
  },
  {
    id: "2",
    type: "earned",
    amount: 120,
    description: "Plastic bag collection",
    date: "2025-07-28",
  },
  {
    id: "3",
    type: "redeemed",
    amount: 100,
    description: "Amazon voucher",
    date: "2025-07-25",
  },
  {
    id: "4",
    type: "earned",
    amount: 75,
    description: "Plastic container collection",
    date: "2025-07-20",
  },
  {
    id: "5",
    type: "redeemed",
    amount: 200,
    description: "Cash withdrawal",
    date: "2025-07-15",
  },
]

export function WalletCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Wallet</CardTitle>
        <CardDescription>Manage your rewards and transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardDescription>Available Balance</CardDescription>
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 mr-1 text-green-600" />
                <CardTitle className="text-2xl">₹145.00</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-muted-foreground">1,450 points (₹1 = 10 points)</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button size="sm" variant="outline">
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Redeem
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Earned</p>
                  <div className="flex items-center">
                    <ArrowUpToLine className="h-3 w-3 mr-1 text-green-600" />
                    <p className="font-medium">245 pts</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Redeemed</p>
                  <div className="flex items-center">
                    <ArrowDownToLine className="h-3 w-3 mr-1 text-orange-500" />
                    <p className="font-medium">100 pts</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full" style={{ width: "70%" }}></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">70% increase from last month</p>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
              <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-4">
            <TransactionList transactions={transactions} />
          </TabsContent>
          <TabsContent value="earned" className="mt-4">
            <TransactionList transactions={transactions.filter((t) => t.type === "earned")} />
          </TabsContent>
          <TabsContent value="redeemed" className="mt-4">
            <TransactionList transactions={transactions.filter((t) => t.type === "redeemed")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Clock className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${transaction.type === "earned" ? "bg-green-100" : "bg-orange-100"}`}>
              {transaction.type === "earned" ? (
                <ArrowUpToLine
                  className={`h-4 w-4 ${transaction.type === "earned" ? "text-green-600" : "text-orange-500"}`}
                />
              ) : (
                <ArrowDownToLine
                  className={`h-4 w-4 ${transaction.type === "earned" ? "text-green-600" : "text-orange-500"}`}
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div
            className={`text-sm font-medium ${transaction.type === "earned" ? "text-green-600" : "text-orange-500"}`}
          >
            {transaction.type === "earned" ? "+" : "-"}
            {transaction.amount} pts
          </div>
        </div>
      ))}
    </div>
  )
}
