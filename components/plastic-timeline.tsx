"use client"

import { CheckCircle2, Clock, Truck } from "lucide-react"

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

interface TimelineEvent {
  status: "collected" | "sorted" | "recycled"
  date: string
  description: string
  completed: boolean
}

interface PlasticTimelineProps {
  item: PlasticItem
}

export function PlasticTimeline({ item }: PlasticTimelineProps) {
  // Generate timeline events based on the item's status
  const events: TimelineEvent[] = [
    {
      status: "collected",
      date: item.collectedAt,
      description: `Collected at ${item.location.address}`,
      completed: true,
    },
    {
      status: "sorted",
      date: item.status === "sorted" || item.status === "recycled" ? item.updatedAt : "",
      description: "Sorted at recycling facility",
      completed: item.status === "sorted" || item.status === "recycled",
    },
    {
      status: "recycled",
      date: item.status === "recycled" ? item.updatedAt : "",
      description: "Recycled into new materials",
      completed: item.status === "recycled",
    },
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200"></div>

      {/* Timeline events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={event.status} className="relative flex items-start gap-4">
            <div
              className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                event.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
              }`}
            >
              {event.status === "collected" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : event.status === "sorted" ? (
                <Truck className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</h4>
              <p className="text-xs text-muted-foreground">{event.description}</p>
              {event.date && (
                <p className="text-xs text-muted-foreground mt-1">{new Date(event.date).toLocaleString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
