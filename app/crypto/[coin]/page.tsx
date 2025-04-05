"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowUpDown, DollarSign, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CryptoChart } from "@/components/crypto/crypto-chart"
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, removeFavorite } from "@/lib/redux/slices/favoritesSlice"
import type { RootState } from "@/lib/redux/store"
import Link from "next/link"
import { fetchCryptoData } from "@/lib/api/crypto"
import { CryptoPurchaseCard } from "@/components/crypto/crypto-purchase-card"

interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  marketCap: number
  volume: number
  change24h: number
  priceHistory: Array<{
    date: string
    price: number
  }>
}

export default function CoinDetailPage() {
  const { coin } = useParams() as { coin: string }
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.coins)
  const isFavorite = favorites.includes(coin)

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        setLoading(true)
        const data = await fetchCryptoData(coin)
        setCryptoData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load cryptocurrency data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getCryptoData()

    // Refresh data every 60 seconds
    const interval = setInterval(getCryptoData, 60000)
    return () => clearInterval(interval)
  }, [coin])

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ type: "coin", id: coin }))
    } else {
      dispatch(addFavorite({ type: "coin", id: coin }))
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
          <h1 className="text-2xl font-bold ml-2">Cryptocurrency Details</h1>
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
          <h1 className="text-2xl font-bold ml-2">Cryptocurrency Details</h1>
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
      ) : cryptoData ? (
        <>
          <Card className="mb-6 overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                <img
                  src={`/placeholder.svg?height=40&width=40&text=${cryptoData.symbol}`}
                  alt={cryptoData.name}
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <CardTitle className="text-3xl">
                    {cryptoData.name} ({cryptoData.symbol})
                  </CardTitle>
                  <CardDescription>Price History (Last 7 Days)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <CryptoChart data={cryptoData.priceHistory} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-emerald-500" />
                  Current Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${cryptoData.price.toLocaleString()}</p>
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
                  24h Change
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold ${cryptoData.change24h >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {cryptoData.change24h >= 0 ? "+" : ""}
                  {cryptoData.change24h.toFixed(2)}%
                </p>
                <p className="text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-purple-500" />
                  Market Cap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${(cryptoData.marketCap / 1000000000).toFixed(2)}B</p>
                <p className="text-muted-foreground">Total market value</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="overflow-hidden border bg-background/60 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Trading Volume</CardTitle>
                <CardDescription>24h Trading Volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ArrowUpDown className="h-10 w-10 mr-4 text-indigo-500" />
                  <div>
                    <p className="text-xl font-medium">${(cryptoData.volume / 1000000).toFixed(2)}M</p>
                    <p className="text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CryptoPurchaseCard coin={cryptoData} />
          </div>
        </>
      ) : null}
    </div>
  )
}

