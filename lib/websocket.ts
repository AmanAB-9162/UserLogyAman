// Enhanced WebSocket for real-time updates
export function setupWebSocket(onUpdate: (data: any) => void) {
  console.log("Setting up WebSocket connection for real-time data...")

  // Simulate initial connection
  setTimeout(() => {
    onUpdate({
      symbol: "BTC",
      price: 51234.56,
      priceChange: 2.3,
      timestamp: new Date().toISOString(),
    })
  }, 1000)

  // Simulate WebSocket connection with more frequent updates for crypto
  const cryptoInterval = setInterval(() => {
    // Randomly generate price updates
    const coins = ["BTC", "ETH", "SOL"]
    const randomCoin = coins[Math.floor(Math.random() * coins.length)]
    const priceChange = Math.random() * 10 - 5 // -5% to +5%

    // Send update to callback
    onUpdate({
      symbol: randomCoin,
      price:
        randomCoin === "BTC"
          ? 50000 + Math.random() * 2000
          : randomCoin === "ETH"
            ? 3000 + Math.random() * 200
            : 100 + Math.random() * 20,
      priceChange,
      timestamp: new Date().toISOString(),
    })
  }, 5000) // Every 5 seconds for more frequent updates

  // Simulate weather updates
  const weatherInterval = setInterval(() => {
    const cities = [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Jaipur",
      "Pune",
      "Ahmedabad",
      "Lucknow",
    ]
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    const tempChange = Math.floor(Math.random() * 3) - 1 // -1 to +1°C
    const conditions = ["Sunny", "Cloudy", "Rainy", "Clear", "Partly Cloudy", "Stormy"]
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]

    // Send weather update
    onUpdate({
      type: "weather",
      city: randomCity,
      tempChange,
      conditions: randomCondition,
      timestamp: new Date().toISOString(),
    })
  }, 8000) // Every 8 seconds

  // Return cleanup function
  return () => {
    clearInterval(cryptoInterval)
    clearInterval(weatherInterval)
  }
}

