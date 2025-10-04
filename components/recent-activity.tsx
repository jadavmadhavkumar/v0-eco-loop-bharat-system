"use client"

import { CheckCircle2, Clock, QrCode, Recycle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string
  type: "scan" | "status_update" | "reward"
  title: string
  description: string
  timestamp: string
  status?: "collected" | "sorted" | "recycled"
}

const activities: Activity[] = [
  {
    id: "1",
    type: "scan",
    title: "Plastic Bottle Scanned",
    description: "PLASTIC-QR-2025-0042",
    timestamp: "2025-08-05T10:30:00",
  },
  {
    id: "2",
    type: "status_update",
    title: "Status Updated",
    description: "PLASTIC-QR-2025-0041",
    timestamp: "2025-08-04T15:45:00",
    status: "sorted",
  },
  {
    id: "3",
    type: "reward",
    title: "Points Earned",
    description: "50 points for plastic collection",
    timestamp: "2025-08-03T09:15:00",
  },
  {
    id: "4",
    type: "status_update",
    title: "Status Updated",
    description: "PLASTIC-QR-2025-0040",
    timestamp: "2025-08-02T14:20:00",
    status: "recycled",
  },
  {
    id: "5",
    type: "scan",
    title: "Plastic Bag Scanned",
    description: "PLASTIC-QR-2025-0039",
    timestamp: "2025-08-01T11:10:00",
  },
  {
    id: "6",
    type: "reward",
    title: "Points Earned",
    description: "30 points for plastic collection",
    timestamp: "2025-07-31T16:05:00",
  },
]

interface RecentActivityProps {
  extended?: boolean
}

export function RecentActivity({ extended = false }: RecentActivityProps) {
  const displayActivities = extended ? activities : activities.slice(0, 4)

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
          <div
            className={`p-2 rounded-full ${
              activity.type === "scan"
                ? "bg-blue-100"
                : activity.type === "status_update"
                  ? "bg-amber-100"
                  : "bg-green-100"
            }`}
          >
            {activity.type === "scan" ? (
              <QrCode className="h-4 w-4 text-blue-600" />
            ) : activity.type === "status_update" ? (
              <Recycle className="h-4 w-4 text-amber-600" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
            {activity.status && (
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={
                    activity.status === "collected"
                      ? "border-blue-200 text-blue-700 bg-blue-50"
                      : activity.status === "sorted"
                        ? "border-amber-200 text-amber-700 bg-amber-50"
                        : "border-green-200 text-green-700 bg-green-50"
                  }
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </Badge>
              </div>
            )}
          </div>
        </div>
      ))}

      {!extended && activities.length > 4 && (
        <div className="flex justify-center pt-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <Clock className="h-3 w-3 mr-1" />
            View all activity
          </Badge>
        </div>
      )}
    </div>
  )
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
  } else {
    return date.toLocaleDateString()
  }
}
