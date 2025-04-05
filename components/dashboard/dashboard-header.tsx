"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export function DashboardHeader() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Initial notifications
    const initialNotifications: Notification[] = [
      {
        id: "1",
        title: "Weather Alert",
        message: "Storm alert in Mumbai!",
        time: "5 minutes ago",
        read: false,
      },
      {
        id: "2",
        title: "Price Alert",
        message: "Bitcoin price increased by 5%!",
        time: "10 minutes ago",
        read: false,
      },
    ]

    setNotifications(initialNotifications)

    // Simulate WebSocket notifications
    const interval = setInterval(() => {
      const notificationTypes = [
        { title: "Weather Alert", message: "Heavy rain expected in London!" },
        { title: "Price Alert", message: "Ethereum price dropped by 3.5%!" },
        { title: "News Alert", message: "Breaking: New crypto regulations announced!" },
      ]

      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: randomNotification.title,
        message: randomNotification.message,
        time: "Just now",
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])

      // Show toast notification for important alerts
      if (randomNotification.title === "Price Alert" || randomNotification.title === "Weather Alert") {
        toast({
          title: randomNotification.title,
          description: randomNotification.message,
          variant: "default",
        })
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [toast])

  return (
    <div className="w-full mb-6">
      <h1 className="text-3xl font-bold">Welcome to CryptoWeather Nexus</h1>
      <p className="text-muted-foreground mt-1">Your real-time dashboard for weather, crypto, and news</p>
    </div>
  )
}

