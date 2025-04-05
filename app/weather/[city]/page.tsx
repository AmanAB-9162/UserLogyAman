"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Cloud, Droplets, Thermometer, Wind } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { WeatherChart } from "@/components/weather/weather-chart"
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, removeFavorite } from "@/lib/redux/slices/favoritesSlice"
import type { RootState } from "@/lib/redux/store"
import Link from "next/link"
import { fetchWeatherData } from "@/lib/api/weather"

interface WeatherData {
  city: string
  temperature: number
  humidity: number
  conditions: string
  windSpeed: number
  forecast: Array<{
    date: string
    temperature: number
    conditions: string
  }>
}

export default function CityWeatherPage() {
  const { city } = useParams() as { city: string }
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.cities)
  const isFavorite = favorites.includes(city)

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true)
        const data = await fetchWeatherData(city)
        setWeatherData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load weather data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getWeatherData()

    // Refresh data every 60 seconds
    const interval = setInterval(getWeatherData, 60000)
    return () => clearInterval(interval)
  }, [city])

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ type: "city", id: city }))
    } else {
      dispatch(addFavorite({ type: "city", id: city }))
    }
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2">Weather Details</h1>
        </div>
        <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">{error}. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2">Weather Details</h1>
        </div>
        <Button variant={isFavorite ? "default" : "outline"} onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      ) : weatherData ? (
        <>
          <Card className="mb-6 overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl capitalize">{city}</CardTitle>
              <CardDescription>7-Day Weather Forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <WeatherChart data={weatherData.forecast} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-cyan-500" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                <p className="text-muted-foreground">Current reading</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Droplets className="mr-2 h-5 w-5 text-blue-500" />
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{weatherData.humidity}%</p>
                <p className="text-muted-foreground">Current reading</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Wind className="mr-2 h-5 w-5 text-indigo-500" />
                  Wind Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{weatherData.windSpeed} km/h</p>
                <p className="text-muted-foreground">Current reading</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Current Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Cloud className="h-10 w-10 mr-4 text-blue-500" />
                  <div>
                    <p className="text-xl font-medium">{weatherData.conditions}</p>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  )
}

