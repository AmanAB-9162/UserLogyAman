// Mock crypto data API
export async function fetchCryptoData(coin: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate random crypto data based on coin
  const coinData: Record<string, any> = {
    bitcoin: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 50000 + Math.floor(Math.random() * 5000), // $50,000-$55,000
      marketCap: 950000000000 + Math.floor(Math.random() * 50000000000), // $950B-$1T
      volume: 25000000000 + Math.floor(Math.random() * 5000000000), // $25B-$30B
      change24h: Math.random() * 10 - 5, // -5% to +5%
    },
    ethereum: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3000 + Math.floor(Math.random() * 500), // $3,000-$3,500
      marketCap: 350000000000 + Math.floor(Math.random() * 30000000000), // $350B-$380B
      volume: 15000000000 + Math.floor(Math.random() * 3000000000), // $15B-$18B
      change24h: Math.random() * 12 - 6, // -6% to +6%
    },
    solana: {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: 100 + Math.floor(Math.random() * 30), // $100-$130
      marketCap: 40000000000 + Math.floor(Math.random() * 5000000000), // $40B-$45B
      volume: 2000000000 + Math.floor(Math.random() * 1000000000), // $2B-$3B
      change24h: Math.random() * 15 - 7.5, // -7.5% to +7.5%
    },
  }

  // Generate price history (7 days)
  const priceHistory = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 6 + i)

    // Base price with some variation
    const basePrice = coinData[coin].price * 0.9 // Start at 90% of current price
    const dayFactor = 1 + i * 0.02 // Gradually increase by day
    const randomFactor = 0.98 + Math.random() * 0.04 // Random variation ±2%

    return {
      date: date.toISOString(),
      price: Math.round(basePrice * dayFactor * randomFactor),
    }
  })

  return {
    ...coinData[coin],
    priceHistory,
  }
}

