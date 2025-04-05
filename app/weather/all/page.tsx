"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Cloud, CloudRain, CloudSnow, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeather } from "@/lib/redux/slices/weatherSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { addFavorite, removeFavorite } from "@/lib/redux/slices/favoritesSlice"

export default function AllWeatherPage() {
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

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes("rain")) return <CloudRain className="h-8 w-8 text-blue-500" />
    if (conditionLower.includes("snow")) return <CloudSnow className="h-8 w-8 text-cyan-500" />
    if (conditionLower.includes("cloud")) return <Cloud className="h-8 w-8 text-gray-500" />
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">All Weather Locations</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : error ? (
        <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">Failed to load weather data. Please try again later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card
              key={item.city}
              className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="capitalize">{item.city}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(item.city)}
                    className={favorites.includes(item.city) ? "text-yellow-500" : ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={favorites.includes(item.city) ? "currentColor" : "none"}
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
                    <p className="text-3xl font-bold">{item.temperature}°C</p>
                    <p className="text-sm text-muted-foreground">Humidity: {item.humidity}%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {getWeatherIcon(item.conditions)}
                    <span className="text-sm mt-1">{item.conditions}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/weather/${item.city.toLowerCase()}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

