"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeather } from "@/lib/redux/slices/weatherSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { addFavorite, removeFavorite } from "@/lib/redux/slices/favoritesSlice"

interface WeatherCardProps {
  city: string
  temperature: number
  humidity: number
  conditions: string
  isFavorite: boolean
  onToggleFavorite: () => void
}

function WeatherCard({ city, temperature, humidity, conditions, isFavorite, onToggleFavorite }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes("rain")) return <CloudRain className="h-8 w-8 text-blue-500" />
    if (conditionLower.includes("snow")) return <CloudSnow className="h-8 w-8 text-cyan-500" />
    if (conditionLower.includes("cloud")) return <Cloud className="h-8 w-8 text-gray-500" />
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  return (
    <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="capitalize">{city}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className={isFavorite ? "text-yellow-500" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="sr-only">Toggle favorite</span>
          </Button>
        </div>
        <CardDescription>Current weather conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{temperature}°C</p>
            <p className="text-sm text-muted-foreground">Humidity: {humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(conditions)}
            <span className="text-sm mt-1">{conditions}</span>
          </div>
        </div>
        <div className="mt-4">
          <Link href={`/weather/${city.toLowerCase()}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function WeatherSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.weather)
  const favorites = useSelector((state: RootState) => state.favorites.cities)

  useEffect(() => {
    dispatch(fetchWeather())

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchWeather())
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch])

  const toggleFavorite = (city: string) => {
    if (favorites.includes(city)) {
      dispatch(removeFavorite({ type: "city", id: city }))
    } else {
      dispatch(addFavorite({ type: "city", id: city }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Weather</h2>
        <Link href="/weather/all">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Skeleton className="h-9 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">Failed to load weather data. Please try again later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.slice(0, 3).map((item) => (
            <WeatherCard
              key={item.city}
              city={item.city}
              temperature={item.temperature}
              humidity={item.humidity}
              conditions={item.conditions}
              isFavorite={favorites.includes(item.city)}
              onToggleFavorite={() => toggleFavorite(item.city)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

