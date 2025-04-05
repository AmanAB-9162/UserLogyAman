"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchCrypto } from "@/lib/redux/slices/cryptoSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { addFavorite, removeFavorite } from "@/lib/redux/slices/favoritesSlice"

export default function AllCryptoPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)
  const favorites = useSelector((state: RootState) => state.favorites.coins)

  useEffect(() => {
    dispatch(fetchCrypto())

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCrypto())
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch])

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      dispatch(removeFavorite({ type: "coin", id }))
    } else {
      dispatch(addFavorite({ type: "coin", id }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">All Cryptocurrencies</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : error ? (
        <Card className="border border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">
              Failed to load cryptocurrency data. Please try again later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={`/placeholder.svg?height=32&width=32&text=${item.symbol}`}
                      alt={item.name}
                      className="w-8 h-8 mr-2"
                    />
                    <CardTitle>{item.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(item.id)}
                    className={favorites.includes(item.id) ? "text-yellow-500" : ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={favorites.includes(item.id) ? "currentColor" : "none"}
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
                <CardDescription>{item.symbol}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">${item.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      Market Cap: ${(item.marketCap / 1000000000).toFixed(2)}B
                    </p>
                  </div>
                  <div className={`flex items-center ${item.change24h >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {item.change24h >= 0 ? (
                      <TrendingUp className="h-5 w-5 mr-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-1" />
                    )}
                    <span className="font-medium">
                      {item.change24h >= 0 ? "+" : ""}
                      {item.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/crypto/${item.id}`}>
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

