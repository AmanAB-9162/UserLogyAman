"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Bitcoin, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"

export function CryptoPurchaseWidget() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin")
  const [usdAmount, setUsdAmount] = useState("100")
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [recalculating, setRecalculating] = useState(false)
  const [countdown, setCountdown] = useState(30)

  const { data: cryptoData } = useSelector((state: RootState) => state.crypto)
  const selectedCoinData = cryptoData.find((coin) => coin.id === selectedCoin) || {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 50000,
  }

  useEffect(() => {
    // Calculate crypto amount when USD amount changes
    if (usdAmount && !isNaN(Number.parseFloat(usdAmount)) && selectedCoinData.price) {
      const amount = Number.parseFloat(usdAmount) / selectedCoinData.price
      setCryptoAmount(amount.toFixed(8))
    } else {
      setCryptoAmount("")
    }

    // Start recalculation countdown
    setRecalculating(true)
    setCountdown(30)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setRecalculating(false)
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [usdAmount, selectedCoinData.price, selectedCoin])

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setUsdAmount(value)
    }
  }

  return (
    <Card className="overflow-hidden border bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-lg relative sticky top-4">
      <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]"></div>

      <CardHeader>
        <CardTitle>Buy Crypto</CardTitle>
        <CardDescription>Purchase cryptocurrency instantly with USD</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coin-select">Select Coin</Label>
            <Select value={selectedCoin} onValueChange={setSelectedCoin}>
              <SelectTrigger>
                <SelectValue placeholder="Select a coin" />
              </SelectTrigger>
              <SelectContent>
                {cryptoData.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usd-amount">You Pay</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="usd-amount"
                type="text"
                value={usdAmount}
                onChange={handleUsdChange}
                className="pl-10 pr-20 h-12"
                placeholder="Enter USD amount"
              />
              <div className="absolute right-3 top-3 text-muted-foreground">USD</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-background/80 rounded-full p-2">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crypto-amount">You Get</Label>
            <div className="relative">
              <Bitcoin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="crypto-amount"
                type="text"
                value={cryptoAmount}
                readOnly
                className="pl-10 pr-20 h-12"
                placeholder="0"
              />
              <div className="absolute right-3 top-3 text-muted-foreground">{selectedCoinData.symbol}</div>
            </div>
          </div>

          {recalculating && (
            <div className="text-center text-sm text-muted-foreground">Price updates in {countdown} seconds</div>
          )}

          <Button className="w-full h-12 bg-gradient-to-r from-red-500 to-coral-500 hover:from-red-600 hover:to-coral-600">
            Buy crypto instantly
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            1 {selectedCoinData.symbol} = ${selectedCoinData.price.toLocaleString()} USD
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

