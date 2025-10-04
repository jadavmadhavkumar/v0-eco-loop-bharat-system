"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Sample data
const monthlyData = [
  { name: "Jan", plastic: 0.5, points: 50 },
  { name: "Feb", plastic: 0.8, points: 80 },
  { name: "Mar", plastic: 1.2, points: 120 },
  { name: "Apr", plastic: 1.0, points: 100 },
  { name: "May", plastic: 1.5, points: 150 },
  { name: "Jun", plastic: 2.0, points: 200 },
  { name: "Jul", plastic: 2.5, points: 250 },
  { name: "Aug", plastic: 5.2, points: 520 },
]

const weeklyData = [
  { name: "Mon", plastic: 0.3, points: 30 },
  { name: "Tue", plastic: 0.5, points: 50 },
  { name: "Wed", plastic: 0.2, points: 20 },
  { name: "Thu", plastic: 0.7, points: 70 },
  { name: "Fri", plastic: 0.4, points: 40 },
  { name: "Sat", plastic: 1.0, points: 100 },
  { name: "Sun", plastic: 0.6, points: 60 },
]

export function ImpactChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <Tabs defaultValue="monthly">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="monthly" className="space-y-4">
        <ChartContainer
          config={{
            plastic: {
              label: "Plastic Collected",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}kg`}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="plastic"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.2}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
      <TabsContent value="weekly" className="space-y-4">
        <ChartContainer
          config={{
            plastic: {
              label: "Plastic Collected",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}kg`}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="plastic"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.2}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">{label}</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
            <p className="text-sm">{payload[0].value} kg plastic collected</p>
          </div>
          <p className="text-xs text-muted-foreground">{payload[0].payload.points} points earned</p>
        </div>
      </ChartTooltipContent>
    )
  }

  return null
}
