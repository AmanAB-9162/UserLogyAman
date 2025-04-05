"use client"

import { useToast } from "@/components/ui/use-toast"

// Types
export interface TemperatureAlert {
  id: string
  city: string
  type: "rise" | "drop"
  difference: number
  timestamp: Date
  message: string
}

// In-memory storage for alerts
let alerts: TemperatureAlert[] = []
const subscribers: ((alerts: TemperatureAlert[]) => void)[] = []

// Subscribe to alerts
export function subscribeToAlerts(callback: (alerts: TemperatureAlert[]) => void) {
  subscribers.push(callback)
  return () => {
    const index = subscribers.indexOf(callback)
    if (index !== -1) {
      subscribers.splice(index, 1)
    }
  }
}

// Notify all subscribers
function notifySubscribers() {
  subscribers.forEach((callback) => callback([...alerts]))
}

// Check for temperature changes and create alerts
export function checkTemperatureChange(city: string, currentTemp: number, previousTemp: number, threshold = 2) {
  const difference = currentTemp - previousTemp

  if (Math.abs(difference) >= threshold) {
    const type = difference > 0 ? "rise" : "drop"
    const alert: TemperatureAlert = {
      id: `${city}-${Date.now()}`,
      city,
      type,
      difference: Math.abs(difference),
      timestamp: new Date(),
      message: `${city} temperature has ${type === "rise" ? "risen" : "dropped"} by ${Math.abs(difference).toFixed(1)}°C!`,
    }

    // Add to alerts
    alerts = [alert, ...alerts.slice(0, 19)] // Keep only 20 most recent alerts

    // Notify subscribers
    notifySubscribers()

    return alert
  }

  return null
}

// Get all alerts
export function getAlerts() {
  return [...alerts]
}

// Clear alerts
export function clearAlerts() {
  alerts = []
  notifySubscribers()
}

// Hook to use weather alerts in components
export function useWeatherAlerts() {
  const { toast } = useToast()

  const showAlert = (alert: TemperatureAlert) => {
    toast({
      title: `Temperature ${alert.type === "rise" ? "Rise" : "Drop"} Alert`,
      description: alert.message,
      variant: alert.type === "rise" ? "destructive" : "default",
    })
  }

  return {
    checkTemperature: (city: string, currentTemp: number, previousTemp: number, threshold?: number) => {
      const alert = checkTemperatureChange(city, currentTemp, previousTemp, threshold)
      if (alert) {
        showAlert(alert)
      }
      return alert
    },
    getAlerts,
    clearAlerts,
    subscribeToAlerts,
  }
}

