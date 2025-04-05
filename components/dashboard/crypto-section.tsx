"use client"

import { useEffect } from "react"
import Link from "next/link"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { fetchCrypto } from "@/lib/redux/slices/cryptoSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { addFavorite, removeFavorite } from "@/lib/redux/slices/favoritesSlice"
import { useToast } from "@/components/ui/use-toast"
import { setupWebSocket } from "@/lib/websocket"

interface CryptoCardProps {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  isFavorite: boolean
  onToggleFavorite: () => void
}

function CryptoCard({ id, name, symbol, price, change24h, marketCap, isFavorite, onToggleFavorite }: CryptoCardProps) {
  return (
    <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={`/placeholder.svg?height=32&width=32&text=${symbol}`} alt={name} className="w-8 h-8 mr-2" />
            <CardTitle>{name}</CardTitle>
          </div>
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
        <CardDescription>{symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">${price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Market Cap: ${(marketCap / 1000000000).toFixed(2)}B</p>
          </div>
          <div className={`flex items-center ${change24h >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            {change24h >= 0 ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
            <span className="font-medium">
              {change24h >= 0 ? "+" : ""}
              {change24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Link href={`/crypto/${id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function CryptoSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.crypto)
  const favorites = useSelector((state: RootState) => state.favorites.coins)
  const { toast } = useToast()

  useEffect(() => {
    dispatch(fetchCrypto())

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCrypto())
    }, 60000)

    // Setup WebSocket for real-time price updates
    const cleanup = setupWebSocket((data) => {
      // Show toast notification for significant price changes (±3%)
      if (Math.abs(data.priceChange) >= 3) {
        toast({
          title: `${data.symbol} Price Alert`,
          description: `${data.symbol} price has ${data.priceChange > 0 ? "increased" : "decreased"} by ${Math.abs(data.priceChange).toFixed(2)}%`,
          variant: data.priceChange > 0 ? "default" : "destructive",
        })
      }
    })

    return () => {
      clearInterval(interval)
      cleanup()
    }
  }, [dispatch, toast])

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      dispatch(removeFavorite({ type: "coin", id }))
    } else {
      dispatch(addFavorite({ type: "coin", id }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Cryptocurrency</h2>
        <Link href="/crypto/all">
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
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-4 w-12" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-9 w-full mt-4" />
              </CardContent>
            </Card>
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
        <div className="space-y-4">
          {data.slice(0, 3).map((item) => (
            <CryptoCard
              key={item.id}
              id={item.id}
              name={item.name}
              symbol={item.symbol}
              price={item.price}
              change24h={item.change24h}
              marketCap={item.marketCap}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

