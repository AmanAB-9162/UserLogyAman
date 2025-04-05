"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ThermometerIcon as ThermometerUp, ThermometerIcon as ThermometerDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function WeatherMapPage() {
  const [selectedMap, setSelectedMap] = useState("temperature")
  const [selectedRegion, setSelectedRegion] = useState("india")
  const [alerts, setAlerts] = useState<
    Array<{ id: string; city: string; type: string; message: string; time: string }>
  >([])
  const [cityTemperatures, setCityTemperatures] = useState<Record<string, { current: number; previous: number }>>({})
  const { toast } = useToast()

  // Use a ref to store previous temperatures to avoid dependency issues
  const prevTemperaturesRef = useRef<Record<string, { current: number; previous: number }>>({})

  // Map sources with OpenWeatherMap API
  const getMapUrl = (type: string, region: string) => {
    // In a real implementation, you would use your API key and proper parameters
    // This is a placeholder that would be replaced with actual API calls

    // For now, we'll use placeholder images
    return `/placeholder.svg?height=600&width=800&text=Live+${type.charAt(0).toUpperCase() + type.slice(1)}+Map+for+${region.charAt(0).toUpperCase() + region.slice(1)}`
  }

  // Simulate fetching real-time weather data
  useEffect(() => {
    const cities = [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Jaipur",
      "Pune",
      "Ahmedabad",
      "Lucknow",
    ]

    const fetchWeatherData = () => {
      const newTemperatures: Record<string, { current: number; previous: number }> = {}

      cities.forEach((city) => {
        // Get previous temperature from ref or initialize
        const prevTemp = prevTemperaturesRef.current[city]?.current || Math.floor(Math.random() * 10) + 25

        // Generate new temperature with some variation
        const variation = Math.random() > 0.7 ? Math.random() * 6 - 3 : Math.random() * 2 - 1
        const newTemp = Math.round((prevTemp + variation) * 10) / 10

        newTemperatures[city] = {
          current: newTemp,
          previous: prevTemp,
        }

        // Check for significant temperature changes
        if (Math.abs(newTemp - prevTemp) >= 2) {
          const isRise = newTemp > prevTemp
          const alertId = `${city}-${Date.now()}`
          const newAlert = {
            id: alertId,
            city,
            type: isRise ? "rise" : "drop",
            message: `${city} temperature has ${isRise ? "risen" : "dropped"} by ${Math.abs(Math.round((newTemp - prevTemp) * 10) / 10)}°C!`,
            time: "Just now",
          }

          setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])

          // Show toast for temperature alerts
          toast({
            title: `Temperature ${isRise ? "Rise" : "Drop"} Alert`,
            description: newAlert.message,
            variant: isRise ? "destructive" : "default",
          })
        }
      })

      // Update the ref first
      prevTemperaturesRef.current = newTemperatures

      // Then update the state
      setCityTemperatures(newTemperatures)
    }

    // Initial fetch
    fetchWeatherData()

    // Set up interval for real-time updates
    const interval = setInterval(fetchWeatherData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [toast]) // Only depend on toast

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Weather Map</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Map Controls</CardTitle>
              <CardDescription>Select map type and region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Map Type</label>
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select map type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="precipitation">Precipitation</SelectItem>
                    <SelectItem value="humidity">Humidity</SelectItem>
                    <SelectItem value="wind">Wind</SelectItem>
                    <SelectItem value="clouds">Clouds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                    <span className="text-sm">Cold (Below 20°C)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    <span className="text-sm">Mild (20-25°C)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Warm (25-30°C)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    <span className="text-sm">Hot (Above 30°C)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>City Temperatures</CardTitle>
              <CardDescription>Real-time temperature data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="major">
                <TabsList className="w-full">
                  <TabsTrigger value="major" className="flex-1">
                    Major Cities
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex-1">
                    All Cities
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="major" className="space-y-2 mt-2">
                  {Object.entries(cityTemperatures)
                    .slice(0, 5)
                    .map(([city, data]) => {
                      const diff = data.current - data.previous
                      const isSignificant = Math.abs(diff) >= 1

                      return (
                        <div key={city} className="flex items-center justify-between">
                          <span className="text-sm">{city}:</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{data.current.toFixed(1)}°C</span>
                            {isSignificant && (
                              <span className={`ml-1 text-xs ${diff > 0 ? "text-red-500" : "text-blue-500"}`}>
                                {diff > 0 ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}°
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </TabsContent>
                <TabsContent value="all" className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                  {Object.entries(cityTemperatures).map(([city, data]) => {
                    const diff = data.current - data.previous
                    const isSignificant = Math.abs(diff) >= 1

                    return (
                      <div key={city} className="flex items-center justify-between">
                        <span className="text-sm">{city}:</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{data.current.toFixed(1)}°C</span>
                          {isSignificant && (
                            <span className={`ml-1 text-xs ${diff > 0 ? "text-red-500" : "text-blue-500"}`}>
                              {diff > 0 ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}°
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temperature Alerts</CardTitle>
              <CardDescription>Recent significant changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <Alert key={alert.id} variant={alert.type === "rise" ? "destructive" : "default"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="flex items-center gap-2">
                        {alert.type === "rise" ? (
                          <>
                            <ThermometerUp className="h-4 w-4" />
                            Temperature Rise
                          </>
                        ) : (
                          <>
                            <ThermometerDown className="h-4 w-4" />
                            Temperature Drop
                          </>
                        )}
                        <Badge variant="outline" className="ml-auto text-xs">
                          {alert.time}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent temperature alerts</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>
              Live {selectedMap.charAt(0).toUpperCase() + selectedMap.slice(1)} Map -{" "}
              {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
            </CardTitle>
            <CardDescription>Real-time weather visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[600px] border rounded-md overflow-hidden bg-muted">
              <img
                src={getMapUrl(selectedMap, selectedRegion) || "/placeholder.svg"}
                alt={`${selectedMap} map for ${selectedRegion}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs">
                Last updated: {new Date().toLocaleTimeString()}
              </div>

              {/* City markers */}
              {selectedRegion === "india" && (
                <>
                  {Object.entries(cityTemperatures).map(([city, data], index) => {
                    // Position markers in a grid pattern instead of random positions
                    const row = Math.floor(index / 3)
                    const col = index % 3
                    const top = 20 + row * 20
                    const left = 20 + col * 30

                    const temp = data.current
                    let bgColor = "bg-blue-500"

                    if (temp >= 30) bgColor = "bg-red-500"
                    else if (temp >= 25) bgColor = "bg-yellow-500"
                    else if (temp >= 20) bgColor = "bg-green-500"

                    return (
                      <div
                        key={city}
                        className={`absolute ${bgColor} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}
                        style={{ top: `${top}%`, left: `${left}%` }}
                      >
                        {city} {temp.toFixed(1)}°C
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

