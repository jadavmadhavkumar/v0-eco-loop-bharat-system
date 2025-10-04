"use client"

import { useEffect, useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

// Sample data
const data = [
  { name: "Jan", bottles: 20.5, containers: 15.2, bags: 10.8 },
  { name: "Feb", bottles: 22.1, containers: 16.5, bags: 12.3 },
  { name: "Mar", bottles: 25.8, containers: 18.2, bags: 14.5 },
  { name: "Apr", bottles: 27.2, containers: 19.8, bags: 15.1 },
  { name: "May", bottles: 30.5, containers: 22.3, bags: 16.8 },
  { name: "Jun", bottles: 32.8, containers: 24.5, bags: 18.2 },
  { name: "Jul", bottles: 35.2, containers: 26.8, bags: 19.5 },
  { name: "Aug", bottles: 38.5, containers: 28.2, bags: 21.3 },
]

export function AdminChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[400px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ChartContainer
      config={{
        bottles: {
          label: "Bottles",
          color: "hsl(var(--chart-1))",
        },
        containers: {
          label: "Containers",
          color: "hsl(var(--chart-2))",
        },
        bags: {
          label: "Bags",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
          <ChartTooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="bottles" name="Bottles" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="containers" name="Containers" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="bags" name="Bags" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0)

    return (
      <ChartTooltipContent>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-sm">
                {entry.name}: {entry.value.toFixed(1)} kg
              </p>
            </div>
          ))}
          <div className="border-t pt-1 mt-1">
            <p className="text-sm font-medium">Total: {total.toFixed(1)} kg</p>
          </div>
        </div>
      </ChartTooltipContent>
    )
  }

  return null
}
