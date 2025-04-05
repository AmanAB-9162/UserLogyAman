"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ThermometerIcon as ThermometerUp, ThermometerIcon as ThermometerDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface TemperatureAlertProps {
  city: string
  currentTemp: number
  previousTemp: number
  threshold?: number
}

export function TemperatureAlert({ city, currentTemp, previousTemp, threshold = 2 }: TemperatureAlertProps) {
  const [visible, setVisible] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const tempDiff = currentTemp - previousTemp

    if (Math.abs(tempDiff) >= threshold) {
      setVisible(true)

      // Show toast notification
      toast({
        title: `Temperature ${tempDiff > 0 ? "Rise" : "Drop"} Alert`,
        description: `${city} temperature has ${tempDiff > 0 ? "risen" : "dropped"} by ${Math.abs(tempDiff).toFixed(1)}°C!`,
        variant: tempDiff > 0 ? "destructive" : "default",
      })

      // Hide alert after 10 seconds
      const timer = setTimeout(() => {
        setVisible(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [city, currentTemp, previousTemp, threshold, toast])

  if (!visible) return null

  const tempDiff = currentTemp - previousTemp
  const isRise = tempDiff > 0

  return (
    <Alert variant={isRise ? "destructive" : "default"} className="mb-4">
      {isRise ? <ThermometerUp className="h-4 w-4" /> : <ThermometerDown className="h-4 w-4" />}
      <AlertTitle className="flex items-center">
        Temperature {isRise ? "Rise" : "Drop"} Alert
        <Badge variant="outline" className="ml-auto">
          Just now
        </Badge>
      </AlertTitle>
      <AlertDescription>
        {city} temperature has {isRise ? "risen" : "dropped"} by {Math.abs(tempDiff).toFixed(1)}°C!
      </AlertDescription>
    </Alert>
  )
}

