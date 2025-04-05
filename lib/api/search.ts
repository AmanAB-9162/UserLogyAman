// Mock search API
export async function searchData(query: string, type: "all" | "weather" | "crypto" | "news") {
  // Simulate API call delay - reduced for better responsiveness
  await new Promise((resolve) => setTimeout(resolve, 300))

  const weatherResults = [
    {
      id: "new-york",
      type: "weather",
      title: "New York",
      subtitle: "Current temperature: 22°C, Partly Cloudy",
      url: "/weather/new-york",
    },
    {
      id: "london",
      type: "weather",
      title: "London",
      subtitle: "Current temperature: 15°C, Rainy",
      url: "/weather/london",
    },
    {
      id: "tokyo",
      type: "weather",
      title: "Tokyo",
      subtitle: "Current temperature: 28°C, Sunny",
      url: "/weather/tokyo",
    },
    {
      id: "delhi",
      type: "weather",
      title: "Delhi",
      subtitle: "Current temperature: 32°C, Clear",
      url: "/weather/delhi",
    },
    {
      id: "mumbai",
      type: "weather",
      title: "Mumbai",
      subtitle: "Current temperature: 30°C, Humid",
      url: "/weather/mumbai",
    },
    {
      id: "bangalore",
      type: "weather",
      title: "Bangalore",
      subtitle: "Current temperature: 24°C, Pleasant",
      url: "/weather/bangalore",
    },
    {
      id: "hyderabad",
      type: "weather",
      title: "Hyderabad",
      subtitle: "Current temperature: 27°C, Sunny",
      url: "/weather/hyderabad",
    },
    {
      id: "patna",
      type: "weather",
      title: "Patna",
      subtitle: "Current temperature: 29°C, Sunny",
      url: "/weather/patna",
    },
    {
      id: "chennai",
      type: "weather",
      title: "Chennai",
      subtitle: "Current temperature: 31°C, Hot",
      url: "/weather/chennai",
    },
    {
      id: "kolkata",
      type: "weather",
      title: "Kolkata",
      subtitle: "Current temperature: 30°C, Humid",
      url: "/weather/kolkata",
    },
  ]

  const cryptoResults = [
    {
      id: "bitcoin",
      type: "crypto",
      title: "Bitcoin (BTC)",
      subtitle: "Current price: $52,345.67, +2.3% (24h)",
      url: "/crypto/bitcoin",
    },
    {
      id: "ethereum",
      type: "crypto",
      title: "Ethereum (ETH)",
      subtitle: "Current price: $3,245.89, +1.7% (24h)",
      url: "/crypto/ethereum",
    },
    {
      id: "solana",
      type: "crypto",
      title: "Solana (SOL)",
      subtitle: "Current price: $112.34, +4.5% (24h)",
      url: "/crypto/solana",
    },
  ]

  const newsResults = [
    {
      id: "news-1",
      type: "news",
      title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
      subtitle: "CryptoNews - 2 hours ago",
      url: "#",
    },
    {
      id: "news-2",
      type: "news",
      title: "Ethereum 2.0 Upgrade: What You Need to Know",
      subtitle: "BlockchainInsider - 5 hours ago",
      url: "#",
    },
    {
      id: "news-3",
      type: "news",
      title: "Major Bank Announces Crypto Custody Services for Institutional Clients",
      subtitle: "FinancialTimes - 10 hours ago",
      url: "#",
    },
    {
      id: "news-4",
      type: "news",
      title: "Solana Network Experiences Brief Outage, Quickly Recovers",
      subtitle: "CoinDesk - 8 hours ago",
      url: "#",
    },
    {
      id: "news-5",
      type: "news",
      title: "New Regulatory Framework for Cryptocurrencies Proposed",
      subtitle: "CryptoRegulation - 12 hours ago",
      url: "#",
    },
    {
      id: "news-6",
      type: "news",
      title: "NFT Market Shows Signs of Recovery After Months of Decline",
      subtitle: "NFTWorld - 1 day ago",
      url: "#",
    },
    {
      id: "news-7",
      type: "news",
      title: "DeFi Protocol Launches New Yield Farming Opportunities",
      subtitle: "DeFiPulse - 1 day ago",
      url: "#",
    },
    {
      id: "news-8",
      type: "news",
      title: "Crypto Mining Companies Shift Towards Renewable Energy",
      subtitle: "GreenCrypto - 2 days ago",
      url: "#",
    },
    {
      id: "news-9",
      type: "news",
      title: "Central Bank Digital Currencies: The Future of Money?",
      subtitle: "EconomicReview - 2 days ago",
      url: "#",
    },
    {
      id: "news-10",
      type: "news",
      title: "Major Retailer Begins Accepting Cryptocurrency Payments",
      subtitle: "RetailNews - 3 days ago",
      url: "#",
    },
  ]

  // Filter results based on query
  const filterByQuery = (results: any[]) => {
    if (!query.trim()) return results
    const lowerQuery = query.toLowerCase()
    return results.filter(
      (item) => item.title.toLowerCase().includes(lowerQuery) || item.subtitle.toLowerCase().includes(lowerQuery),
    )
  }

  // Filter by type and query
  let results = []
  if (type === "all" || type === "weather") {
    results = [...results, ...filterByQuery(weatherResults)]
  }
  if (type === "all" || type === "crypto") {
    results = [...results, ...filterByQuery(cryptoResults)]
  }
  if (type === "all" || type === "news") {
    results = [...results, ...filterByQuery(newsResults)]
  }

  return results
}

